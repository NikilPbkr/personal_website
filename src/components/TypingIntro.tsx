import { useState, useEffect } from "react";

const NAME = "Nikil Prabhakar";
const TYPING_MS = 45;
const HOLD_MS = 600;
const COLLAPSE_MS = 700;
const NP_HOLD_MS = 500;
const FADE_OUT_MS = 600;

interface TypingIntroProps {
  onComplete: () => void;
  isVisible: boolean;
}

const TypingIntro = ({ onComplete, isVisible }: TypingIntroProps) => {
  const [displayLength, setDisplayLength] = useState(0);
  const [phase, setPhase] = useState<
    "typing" | "hold" | "collapse" | "npHold" | "fadeout"
  >("typing");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    if (phase === "typing") {
      if (displayLength < NAME.length) {
        const timer = setTimeout(
          () => setDisplayLength((n) => n + 1),
          TYPING_MS
        );
        return () => clearTimeout(timer);
      } else {
        setShowCursor(false);
        setPhase("hold");
      }
    } else if (phase === "hold") {
      const timer = setTimeout(() => setPhase("collapse"), HOLD_MS);
      return () => clearTimeout(timer);
    } else if (phase === "collapse") {
      const timer = setTimeout(() => setPhase("npHold"), COLLAPSE_MS);
      return () => clearTimeout(timer);
    } else if (phase === "npHold") {
      const timer = setTimeout(() => setPhase("fadeout"), NP_HOLD_MS);
      return () => clearTimeout(timer);
    } else if (phase === "fadeout") {
      const timer = setTimeout(onComplete, FADE_OUT_MS);
      return () => clearTimeout(timer);
    }
  }, [isVisible, phase, displayLength, onComplete]);

  const cursorBlink = phase === "typing";
  const isCollapsing = phase === "collapse" || phase === "npHold" || phase === "fadeout";
  const isFadingOut = phase === "fadeout";
  const chars = NAME.split("");

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1
        className="flex flex-wrap justify-center text-heading text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.05em]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {chars.map((char, i) => {
          const isVisible_char = i < displayLength;
          const isN = i === 0 && char === "N";
          const isP = i === 6 && char === "P";
          const keep = isN || isP;
          const shouldCollapse = isCollapsing && !keep;

          // During typing: untyped letters use invisible to reserve space (no shifting)
          // During collapse: non-NP letters shrink to 0
          const isTypingPhase = phase === "typing" || phase === "hold";
          const untypedReserveSpace = isTypingPhase && !isVisible_char;
          const collapsed = isCollapsing && !keep;

          const isSpace = char === " ";

          return (
            <span
              key={i}
              className={`inline-block overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${
                untypedReserveSpace
                  ? "invisible"
                  : collapsed
                    ? "max-w-0 min-w-0 opacity-0"
                    : keep
                      ? "opacity-100"
                      : "max-w-[1ch] opacity-100"
              } ${isSpace && !collapsed ? "min-w-[0.35em]" : ""}`}
            >
              {char}
            </span>
          );
        })}
        {cursorBlink && (
          <span
            className="typing-cursor ml-0.5 inline-block w-0.5 sm:w-1 h-[0.9em] bg-primary align-middle animate-pulse flex-shrink-0"
            style={{ animationDuration: "0.8s" }}
          />
        )}
      </h1>
    </div>
  );
};

export default TypingIntro;
