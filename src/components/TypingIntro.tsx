import { useState, useEffect } from "react";

const NAME = "Nikil Prabhakar";
const TYPING_MS = 45;
const HOLD_MS = 600;
const COLLAPSE_MS = 700;
const NP_HOLD_MS = 400;
const MOVE_TO_HEADER_MS = 800;
const FADE_OUT_MS = 400;

interface TypingIntroProps {
  onComplete: () => void;
  isVisible: boolean;
}

const TypingIntro = ({ onComplete, isVisible }: TypingIntroProps) => {
  const [displayLength, setDisplayLength] = useState(0);
  const [phase, setPhase] = useState<
    "typing" | "hold" | "collapse" | "npHold" | "moveToHeader" | "fadeout"
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
      const timer = setTimeout(() => setPhase("moveToHeader"), NP_HOLD_MS);
      return () => clearTimeout(timer);
    } else if (phase === "moveToHeader") {
      const timer = setTimeout(() => setPhase("fadeout"), MOVE_TO_HEADER_MS);
      return () => clearTimeout(timer);
    } else if (phase === "fadeout") {
      const timer = setTimeout(onComplete, FADE_OUT_MS);
      return () => clearTimeout(timer);
    }
  }, [isVisible, phase, displayLength, onComplete]);

  const cursorBlink = phase === "typing";
  const isCollapsing = phase === "collapse" || phase === "npHold" || phase === "moveToHeader" || phase === "fadeout";
  const isFadingOut = phase === "fadeout";
  const isMovingToHeader = phase === "moveToHeader";
  const chars = NAME.split("");

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`fixed z-[101] transition-all duration-700 ease-out ${
          isMovingToHeader || isFadingOut
            ? "left-[1.375rem] top-[1.75rem] sm:left-[2.375rem] sm:top-[1.75rem] translate-x-0 translate-y-0 scale-[0.38] origin-top-left"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 origin-center"
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
    </div>
  );
};

export default TypingIntro;
