import { useState, useCallback } from "react";
import { siteData } from "@/data/siteData";
import SectionLabel from "@/components/SectionLabel";
import ExperienceCard from "@/components/ExperienceCard";
import PicksLinkCard from "@/components/PicksLinkCard";
import ProjectItem from "@/components/ProjectItem";
import TechLinesBackground from "@/components/TechLinesBackground";
import TypingIntro from "@/components/TypingIntro";
import SiteHeader from "@/components/SiteHeader";

const Index = () => {
  const d = siteData;
  const [introDone, setIntroDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setContentVisible(true));
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <TypingIntro isVisible={!introDone} onComplete={handleIntroComplete} />
      {introDone && <SiteHeader />}
      <TechLinesBackground />
      <div
        className={`relative max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-24 pt-24 transition-opacity duration-700 ${
          contentVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero */}
        <div id="hero" className="flex flex-col items-center text-center mb-20 animate-fade-in scroll-mt-28">
          <div className="relative mb-8 group">
            <div className="absolute -inset-1 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-32 h-32 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background overflow-hidden">
              <img
                src={d.profileImage}
                alt={d.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-heading text-2xl sm:text-3xl font-semibold tracking-tight">
            {d.name}
          </h1>
          <p className="text-primary font-mono text-sm mt-2 max-w-md">
            {d.tagline}
          </p>
        </div>

        {/* About */}
        <section id="about" className="mb-20 animate-fade-in-up scroll-mt-28" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <SectionLabel>About</SectionLabel>
          <div className="glass-card rounded-xl p-6 sm:p-8">
            <p className="text-foreground text-sm sm:text-base leading-relaxed text-[15px]">
              {d.about}
            </p>
          </div>
        </section>

        {/* Picks */}
        <section id="picks" className="mb-20 animate-fade-in-up scroll-mt-28" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <SectionLabel>{d.picks.title}</SectionLabel>
          <div className="glass-card rounded-xl p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {[...d.picks.row1, ...d.picks.row2].map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-md bg-secondary/80 border border-border/60 text-muted-foreground text-xs font-mono"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-20 scroll-mt-28">
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-6">
            {d.experience.map((exp, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.15 + i * 0.05}s`, animationFillMode: "both" }}
              >
                <ExperienceCard {...exp} />
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mb-20 animate-fade-in-up scroll-mt-28" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
          <SectionLabel>Education</SectionLabel>
          <div className="glass-card rounded-xl p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-xl bg-secondary/80 border border-border/60 flex items-center justify-center mb-5 overflow-hidden">
                {d.education.logoType === "image" ? (
                  <img src={d.education.logo} alt={d.education.school} className="w-10 h-10 object-contain" />
                ) : (
                  <span className="text-2xl">{d.education.logo}</span>
                )}
              </div>
              <h3 className="text-heading text-lg font-medium">{d.education.school}</h3>
              <p className="text-section-label text-xs mt-1 font-mono">{d.education.dates}</p>
              <p className="text-muted-foreground text-sm mt-2">{d.education.degree}</p>
              <div className="mt-6 pt-6 border-t border-border/60 w-full text-left">
                <p className="text-subheading text-xs font-medium mb-3">Classes I enjoyed</p>
                <div className="space-y-1">
                  {d.education.classes.map((pair, i) => (
                    <p key={i} className="text-muted-foreground text-xs">
                      {pair.join(" · ")}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/60 w-full text-left">
                <p className="text-subheading text-xs font-medium mb-3">Involvements</p>
                <div className="space-y-2">
                  {d.education.involvements.map((inv, i) => (
                    <div key={i}>
                      <p className="text-muted-foreground text-xs">
                        <span className="text-foreground font-medium">{inv.org}</span>
                        {inv.role && (
                          <span className="text-muted-foreground">: {inv.role}</span>
                        )}
                      </p>
                      {"clients" in inv && inv.clients && inv.clients.length > 0 && (
                        <p className="mt-1 ml-4 text-muted-foreground text-xs">
                          {inv.clients.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Picks 2.0 */}
        <section id="picks2" className="mb-20 scroll-mt-28">
          <SectionLabel>{d.picks.title} 2.0</SectionLabel>
          <div className="space-y-4">
            {d.picks2.map((item, i) => (
              <PicksLinkCard key={i} {...item} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-20 scroll-mt-28">
          <SectionLabel>Projects</SectionLabel>
          <div className="space-y-3">
            {d.projects.map((proj, i) => (
              <ProjectItem key={i} {...proj} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-16 scroll-mt-28">
          <SectionLabel>Contact</SectionLabel>
          <div className="flex justify-center gap-8">
            <a
              href={`mailto:${d.contact.email}`}
              className="text-subheading text-sm font-medium px-3 py-2 rounded-lg hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              email
            </a>
            <a
              href={d.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subheading text-sm font-medium px-3 py-2 rounded-lg hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              linkedin
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
