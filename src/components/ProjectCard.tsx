import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isRevealed: boolean;
}

const ProjectCard = ({ project, index, isRevealed }: ProjectCardProps) => {
  return (
    <div
      className="relative group h-[400px] rounded-xl overflow-hidden transition-all duration-700"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isRevealed ? 'opacity-100 scale-105' : 'opacity-40 scale-100'
        }`}
        style={{
          backgroundImage: `url(${project.image})`,
          filter: isRevealed ? 'blur(5px)' : 'blur(1px)',
        }}
      />

      {/* Fog overlay */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isRevealed ? 'opacity-20' : 'opacity-80'
        }`}
        style={{
          background: 'linear-gradient(180deg, hsl(var(--background) / 0.3) 0%, hsl(var(--background) / 0.9) 100%)',
        }}
      />

      {/* Content */}
      <div
        className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-primary text-sm font-medium mb-2">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Action buttons with icons */}
        <div className="flex gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink size={20} />
            <span className="text-sm">Live Demo</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={20} />
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </div>

      {/* Glow effect on reveal */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none ${
          isRevealed ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: 'inset 0 0 60px hsl(var(--primary) / 0.2), 0 0 40px hsl(var(--primary) / 0.1)',
        }}
      />
    </div>
  );
};

export default ProjectCard;