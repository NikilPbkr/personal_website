interface ExperienceCardProps {
  logo: string;
  logoType?: "image" | "emoji";
  role: string;
  company: string;
  description: string;
  dates: string;
}

const ExperienceCard = ({ logo, logoType, role, company, description, dates }: ExperienceCardProps) => (
  <div className="glass-card rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 transition-all duration-300 hover:border-primary/30 glow-hover">
    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center overflow-hidden">
      {logoType === "image" ? (
        <img src={logo} alt={company} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
      ) : (
        <span className="text-xl">{logo}</span>
      )}
    </div>
    <div className="flex-1 text-left">
      <h3 className="text-heading text-base font-medium">{role}</h3>
      <p className="text-primary text-sm font-mono">{company}</p>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
      <p className="text-section-label text-xs mt-2 font-mono">{dates}</p>
    </div>
  </div>
);

export default ExperienceCard;
