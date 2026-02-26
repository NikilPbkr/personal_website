import { Link } from "react-router-dom";

interface PicksLinkCardProps {
  title: string;
  subtitle: string;
  link: string;
}

const PicksLinkCard = ({ title, subtitle, link }: PicksLinkCardProps) => (
  <Link
    to={link}
    className="block glass-card rounded-xl px-6 py-5 transition-all duration-300 hover:border-primary/30 glow-hover group"
  >
    <h3 className="text-heading text-sm font-medium group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>
  </Link>
);

export default PicksLinkCard;
