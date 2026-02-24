import { Link } from "react-router-dom";

interface PicksLinkCardProps {
  title: string;
  subtitle: string;
  link: string;
}

const PicksLinkCard = ({ title, subtitle, link }: PicksLinkCardProps) => (
  <Link
    to={link}
    className="block bg-secondary rounded-lg px-6 py-5 hover:bg-muted transition-colors group"
  >
    <h3 className="text-heading text-sm font-medium group-hover:text-link-hover transition-colors">
      {title}
    </h3>
    <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>
  </Link>
);

export default PicksLinkCard;
