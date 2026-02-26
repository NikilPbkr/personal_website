import { Link } from "react-router-dom";

interface PicksLinkCardProps {
  title: string;
  subtitle: string;
  link: string;
}

const PicksLinkCard = ({ title, subtitle, link }: PicksLinkCardProps) => (
  <Link
    to={link}
    className="block glass-card rounded-xl px-6 py-5 transition-all duration-300 hover:border-primary/40 hover:scale-[1.02] glow-hover group"
  >
    <h3 className="text-heading text-sm font-medium group-hover:text-primary transition-colors duration-200">
      {title}
    </h3>
    <p className="text-muted-foreground text-xs mt-1 group-hover:text-foreground/80 transition-colors duration-200">{subtitle}</p>
  </Link>
);

export default PicksLinkCard;
