import { siteData } from "@/data/siteData";
import SectionLabel from "@/components/SectionLabel";
import ExperienceCard from "@/components/ExperienceCard";
import PicksLinkCard from "@/components/PicksLinkCard";
import ProjectItem from "@/components/ProjectItem";
import TechLinesBackground from "@/components/TechLinesBackground";

const Index = () => {
  const d = siteData;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <TechLinesBackground />
      <div className="relative max-w-lg mx-auto px-6 py-20">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-28 h-28 rounded-full bg-secondary overflow-hidden mb-5">
            <img
              src={d.profileImage}
              alt={d.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-heading text-lg font-medium">{d.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">{d.tagline}</p>
        </div>

        {/* About */}
        <div className="text-center mb-14">
          <SectionLabel>About</SectionLabel>
          <p className="text-foreground text-sm leading-relaxed italic">
            {d.about}
          </p>
        </div>

        {/* Picks */}
        <div className="text-center mb-14">
          <h3 className="text-heading text-sm font-medium mb-2">{d.picks.title}</h3>
          <p className="text-muted-foreground text-xs">
            {d.picks.row1.join(", ")}
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            {d.picks.row2.join(", ")}
          </p>
        </div>

        {/* Experience */}
        <div className="text-center mb-14">
          <SectionLabel>Experience</SectionLabel>
          {d.experience.map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))}
        </div>

        {/* Education */}
        <div className="text-center mb-14">
          <SectionLabel>Education</SectionLabel>
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-2xl mx-auto mb-4 overflow-hidden">
            {d.education.logoType === "image" ? (
              <img src={d.education.logo} alt={d.education.school} className="w-10 h-10 object-contain" />
            ) : (
              d.education.logo
            )}
          </div>
          <h3 className="text-heading text-base font-medium">{d.education.school}</h3>
          <p className="text-section-label text-xs mt-1">{d.education.dates}</p>
          <p className="text-muted-foreground text-sm mt-2">{d.education.degree}</p>

          <div className="mt-6">
            <p className="text-subheading text-xs font-medium mb-3">Classes I enjoyed</p>
            {d.education.classes.map((pair, i) => (
              <p key={i} className="text-muted-foreground text-xs mb-1">
                {pair.join(", ")}
              </p>
            ))}
          </div>
        </div>

        {/* Picks 2.0 */}
        <div className="text-center mb-14">
          <h3 className="text-heading text-sm font-medium mb-4">{d.picks.title} 2.0</h3>
          <div className="space-y-3">
            {d.picks2.map((item, i) => (
              <PicksLinkCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="text-center mb-14">
          <SectionLabel>Projects</SectionLabel>
          {d.projects.map((proj, i) => (
            <ProjectItem key={i} {...proj} />
          ))}
        </div>

        {/* Contact */}
        <div className="text-center mb-10">
          <SectionLabel>Contact</SectionLabel>
          <div className="flex justify-center gap-6">
            <a
              href={`mailto:${d.contact.email}`}
              className="text-subheading text-sm hover:text-link-hover transition-colors"
            >
              email
            </a>
            <a
              href={d.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subheading text-sm hover:text-link-hover transition-colors"
            >
              linkedin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
