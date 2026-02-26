import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const SiteHeader = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isTocHovered, setIsTocHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const viewportTop = window.scrollY + 120;
      let current: string | null = null;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= viewportTop) {
          current = id;
        }
      }
      setActiveSection(current ?? SECTIONS[0].id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-4 sm:mx-6 mt-4 rounded-xl px-4 sm:px-6 py-3 flex items-center justify-between bg-transparent">
        {/* NP logo - left */}
        <Link
          to="/"
          className="px-2.5 py-1.5 -ml-2.5 rounded-lg font-mono text-sm font-medium tracking-[0.15em] text-heading hover:text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
        >
          NP
        </Link>

        {/* TOC - right, interactive on hover */}
        <nav
          className={`flex flex-wrap items-center justify-end gap-1 sm:gap-2 transition-all duration-300 ${
            isTocHovered ? "scale-[1.02]" : ""
          }`}
          onMouseEnter={() => setIsTocHovered(true)}
          onMouseLeave={() => setIsTocHovered(false)}
        >
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ease-out
                ${activeSection === id ? "text-primary" : "text-muted-foreground"}
                hover:text-primary hover:scale-110 hover:-translate-y-0.5
              `}
            >
              <span className="relative z-10">{label}</span>
              <span
                className={`absolute inset-0 rounded-lg border transition-all duration-300 -z-0 ${
                  activeSection === id
                    ? "bg-primary/15 border-primary/30"
                    : "bg-transparent border-transparent hover:bg-primary/10 hover:border-primary/20"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
