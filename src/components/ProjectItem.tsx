interface ProjectItemProps {
  name: string;
  description: string;
}

const ProjectItem = ({ name, description }: ProjectItemProps) => (
  <div className="mb-4">
    <span className="text-heading text-sm font-medium">{name}</span>
    <span className="text-muted-foreground text-sm"> — {description}</span>
  </div>
);

export default ProjectItem;
