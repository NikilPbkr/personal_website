import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { siteData } from "@/data/siteData";
import TechLinesBackground from "@/components/TechLinesBackground";

type Track = {
  title: string;
  artist: string;
  time: string;
};

type StoredToken = {
  accessToken: string;
  expiresAt: number;
};

const TOKEN_STORAGE_KEY = "spotify_token";
const CODE_VERIFIER_KEY = "spotify_code_verifier";
const STATE_KEY = "spotify_auth_state";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  return Array.from(values)
    .map((x) => possible[x % possible.length])
    .join("");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
};

const base64UrlEncode = (input: ArrayBuffer) => {
  const bytes = new Uint8Array(input);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const createCodeChallenge = async (verifier: string) => {
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
};

const getStoredToken = (): string | null => {
  const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredToken;
    if (!parsed.accessToken || !parsed.expiresAt) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }

    return parsed.accessToken;
  } catch {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return null;
  }
};

const SpotifyPage = () => {
  const [tracks, setTracks] = useState<Track[]>(siteData.spotifyTracks);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string | undefined;

  const fetchRecentListening = async (accessToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=20",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setIsAuthenticated(false);
        setError("Spotify session expired. Please connect again.");
        return;
      }

      if (!response.ok) {
        setError("Failed to load recent listening from Spotify.");
        return;
      }

      const data = await response.json();
      const items = (data.items ?? []) as Array<{
        played_at: string;
        track?: {
          name?: string;
          artists?: Array<{ name?: string }>;
        };
      }>;

      const mapped: Track[] = items.map((item) => ({
        title: item.track?.name ?? "Unknown track",
        artist:
          item.track?.artists?.map((artist) => artist.name ?? "Unknown").join(", ") ??
          "Unknown artist",
        time: formatDistanceToNow(new Date(item.played_at), { addSuffix: true }),
      }));

      if (mapped.length > 0) {
        setTracks(mapped);
      } else {
        setError("No recent listening history found.");
      }
    } catch {
      setError("Error fetching recent listening from Spotify.");
    } finally {
      setIsLoading(false);
    }
  };

  const exchangeCodeForToken = async (code: string) => {
    if (!clientId) {
      setError("Spotify client ID is not configured.");
      return;
    }

    const redirectUri = `${window.location.origin}/spotify`;
    const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
    const storedState = sessionStorage.getItem(STATE_KEY);
    const url = new URL(window.location.href);
    const state = url.searchParams.get("state");

    if (!codeVerifier || !state || state !== storedState) {
      setError("Something went wrong during Spotify authentication. Please try again.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        setError("Failed to complete Spotify sign-in. Please try again.");
        return;
      }

      const tokenData = (await response.json()) as {
        access_token: string;
        expires_in: number;
      };

      const expiresAt = Date.now() + tokenData.expires_in * 1000;

      const stored: StoredToken = {
        accessToken: tokenData.access_token,
        expiresAt,
      };

      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(stored));
      setIsAuthenticated(true);

      // Clean up auth params from URL and session
      url.searchParams.delete("code");
      url.searchParams.delete("state");
      window.history.replaceState({}, document.title, url.pathname + url.search);
      sessionStorage.removeItem(CODE_VERIFIER_KEY);
      sessionStorage.removeItem(STATE_KEY);

      await fetchRecentListening(tokenData.access_token);
    } catch {
      setError("Error completing Spotify sign-in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectSpotify = async () => {
    if (!clientId) {
      setError(
        "Spotify client ID is not configured. Add VITE_SPOTIFY_CLIENT_ID to your .env.local file.",
      );
      return;
    }

    try {
      setError(null);

      const redirectUri = `${window.location.origin}/spotify`;
      const codeVerifier = generateRandomString(128);
      const codeChallenge = await createCodeChallenge(codeVerifier);
      const state = generateRandomString(16);
      const scope = "user-read-recently-played";

      sessionStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);
      sessionStorage.setItem(STATE_KEY, state);

      const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope,
        redirect_uri: redirectUri,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        state,
      });

      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    } catch {
      setError("Failed to start Spotify sign-in. Please try again.");
    }
  };

  useEffect(() => {
    const existingToken = getStoredToken();

    if (existingToken) {
      setIsAuthenticated(true);
      void fetchRecentListening(existingToken);
      return;
    }

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      void exchangeCodeForToken(code);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <TechLinesBackground />
      <div className="relative max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <Link
          to="/"
          className="text-section-label text-xs font-mono tracking-widest hover:text-primary transition-colors block text-center mb-12"
        >
          ← BACK
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-heading text-2xl font-semibold tracking-tight">Recent Listening</h1>
          <p className="text-muted-foreground text-sm mt-2">
            {isAuthenticated
              ? "Live view of your recent Spotify plays."
              : "Connect Spotify to see your own recent listening history."}
          </p>
        </div>

        <div className="text-center mb-6">
          <button
            type="button"
            onClick={handleConnectSpotify}
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-xs font-medium text-heading hover:border-primary/50 hover:text-primary transition-all duration-200 disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect with Spotify"}
          </button>
        </div>

        {error && (
          <p className="text-center text-xs text-red-500 mb-4">{error}</p>
        )}

        {!isAuthenticated && !isLoading && !error && (
          <p className="text-center text-xs text-muted-foreground mb-4">
            Showing sample tracks until you connect Spotify.
          </p>
        )}

        <div className="space-y-2">
          {isLoading && (
            <p className="text-center text-xs text-muted-foreground">
              Loading your recent listening...
            </p>
          )}

          {!isLoading &&
            tracks.map((track, i) => (
              <div
                key={`${track.title}-${track.artist}-${i}`}
                className="glass-card flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center text-lg shrink-0">
                  🎵
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-heading text-sm font-medium truncate">
                    {track.title}
                  </p>
                  <p className="text-muted-foreground text-xs truncate">
                    {track.artist}
                  </p>
                </div>
                <span className="text-section-label text-xs shrink-0">
                  {track.time}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPage;
