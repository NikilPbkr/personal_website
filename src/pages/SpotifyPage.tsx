import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { siteData } from "@/data/siteData";
import TechLinesBackground from "@/components/TechLinesBackground";

type TopSong = {
  title: string;
  artist: string;
  artworkUrl?: string;
};

const fetchArtwork = async (title: string, artist: string): Promise<string | undefined> => {
  try {
    const term = encodeURIComponent(`${title} ${artist}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${term}&media=music&limit=1`
    );
    const data = await res.json();
    const url = data.results?.[0]?.artworkUrl100;
    return url ? url.replace("100x100", "300x300") : undefined;
  } catch {
    return undefined;
  }
};

const SpotifyPage = () => {
  const [songs, setSongs] = useState<TopSong[]>(
    siteData.topSongs.map((s) => ({ ...s }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtwork = async () => {
      const results = await Promise.all(
        siteData.topSongs.map(async (song) => ({
          ...song,
          artworkUrl: await fetchArtwork(song.title, song.artist),
        }))
      );
      setSongs(results);
      setLoading(false);
    };
    void loadArtwork();
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

        <div className="text-center mb-10">
          <h1 className="text-heading text-2xl font-semibold tracking-tight">
            My Top Songs Right Now
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            What I've been listening to lately
          </p>
        </div>

        <div className="space-y-3">
          {songs.map((song, i) => (
            <div
              key={`${song.title}-${song.artist}-${i}`}
              className="glass-card flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 hover:border-primary/40 hover:scale-[1.01]"
            >
              <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-secondary/80 border border-border/60 flex items-center justify-center">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-muted" />
                ) : song.artworkUrl ? (
                  <img
                    src={song.artworkUrl}
                    alt={`${song.title} artwork`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">🎵</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-heading text-sm font-medium truncate">
                  {song.title}
                </p>
                <p className="text-muted-foreground text-xs truncate">
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          find me on spotify :) @nikilprabhakar
        </p>
      </div>
    </div>
  );
};

export default SpotifyPage;
