interface ProjectItemProps {
  name: string;
  description: string;
}

const ProjectItem = ({ name, description }: ProjectItemProps) => (
  <div className="glass-card rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-1 transition-all duration-300 hover:border-primary/40 hover:scale-[1.01] glow-hover cursor-default">
    <span className="text-heading text-sm font-medium">{name}</span>
    <span className="text-muted-foreground text-sm"><span className="hidden sm:inline mr-2">—</span>{description}</span>
  </div>
);

export default ProjectItem;
