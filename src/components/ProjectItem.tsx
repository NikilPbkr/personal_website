import { useState } from "react";

interface ProjectItemProps {
  name: string;
  description: string;
  fullTitle?: string;
  techStack?: string;
  bullets?: string[];
}

const ProjectItem = ({
  name,
  description,
  fullTitle,
  techStack,
  bullets,
}: ProjectItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = fullTitle && bullets && bullets.length > 0;

  return (
    <div
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 glow-hover ${
        hasDetails ? "cursor-pointer" : "cursor-default"
      } ${isExpanded ? "hover:scale-[1.01]" : "hover:scale-[1.01]"}`}
      onClick={() => hasDetails && setIsExpanded((e) => !e)}
    >
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-1">
        <span className="text-heading text-sm font-medium">{name}</span>
        <span className="text-muted-foreground text-sm">
          <span className="hidden sm:inline mr-2">—</span>
          {description}
        </span>
        {hasDetails && (
          <span
            className={`ml-auto shrink-0 text-primary/80 text-xs transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        )}
      </div>

      {isExpanded && hasDetails && (
        <div className="px-5 pb-5 pt-0 border-t border-border/60 mt-0">
          <div className="pt-4 space-y-4">
            {(fullTitle || techStack) && (
              <div>
                {fullTitle && (
                  <h4 className="text-heading text-sm font-medium">{fullTitle}</h4>
                )}
                {techStack && (
                  <p className="text-primary text-xs font-mono mt-1">
                    {techStack}
                  </p>
                )}
              </div>
            )}
            <ul className="space-y-2">
              {bullets!.map((bullet, i) => (
                <li
                  key={i}
                  className="text-muted-foreground text-sm leading-relaxed flex gap-2"
                >
                  <span className="text-primary shrink-0">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
