interface ExperienceCardProps {
  logo: string;
  logoType?: "image" | "emoji";
  role: string;
  company: string;
  description: string;
  dates: string;
}

const ExperienceCard = ({ logo, logoType, role, company, description, dates }: ExperienceCardProps) => (
  <div className="flex flex-col items-center text-center mb-10">
    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-2xl mb-4 overflow-hidden">
      {logoType === "image" ? (
        <img src={logo} alt={company} className="w-10 h-10 object-contain" />
      ) : (
        logo
      )}
    </div>
    <h3 className="text-heading text-base font-medium">{role}</h3>
    <p className="text-muted-foreground text-sm">{company}</p>
    <p className="text-muted-foreground text-sm mt-1">{description}</p>
    <p className="text-section-label text-xs mt-1">{dates}</p>
  </div>
);

export default ExperienceCard;
