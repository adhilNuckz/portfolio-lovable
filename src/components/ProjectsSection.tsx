import { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '@/data/projects.json';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = ['All Projects', 'Web App', 'Dashboard', 'Mobile', 'AI/ML', 'Web3', 'Developer Tools'];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const isCardRevealed = (cardElement: HTMLDivElement | null) => {
    if (!cardElement || !isHovering) return false;
    const rect = cardElement.getBoundingClientRect();
    const gridRect = gridRef.current?.getBoundingClientRect();
    if (!gridRect) return false;

    const cardCenterX = rect.left - gridRect.left + rect.width / 2;
    const cardCenterY = rect.top - gridRect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(cardCenterX - mousePosition.x, 2) +
      Math.pow(cardCenterY - mousePosition.y, 2)
    );
    return distance < 300; // Reveal radius
  };

  const filteredProjects = selectedCategory === 'All Projects'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-background relative"
      id="projects"
    >
      {/* Section header */}
      <div className={`container mx-auto mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Featured</span> Projects
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Hover over the grid to reveal the projects. Multiple cards will be revealed at once.
        </p>

        {/* Category Filter */}
        <div className="flex justify-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] bg-secondary border-border">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid with unified cover */}
      <div className="container mx-auto relative">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCardWrapper
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
              mousePosition={mousePosition}
              isHovering={isHovering}
              gridRef={gridRef}
            />
          ))}
        </div>

        {/* Unified opacity cover with reveal hole */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: isHovering
              ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, hsl(var(--background) / 0.85) 100%)`
              : 'hsl(var(--background) / 0.85)',
          }}
        />
      </div>
    </section>
  );
};

// Wrapper component to handle individual card reveal state
const ProjectCardWrapper = ({
  project,
  index,
  isVisible,
  mousePosition,
  isHovering,
  gridRef,
}: {
  project: typeof projectsData[0];
  index: number;
  isVisible: boolean;
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  gridRef: React.RefObject<HTMLDivElement>;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!cardRef.current || !isHovering || !gridRef.current) {
      setIsRevealed(false);
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    const cardCenterX = rect.left - gridRect.left + rect.width / 2;
    const cardCenterY = rect.top - gridRect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(cardCenterX - mousePosition.x, 2) +
      Math.pow(cardCenterY - mousePosition.y, 2)
    );
    setIsRevealed(distance < 300);
  }, [mousePosition, isHovering, gridRef]);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <ProjectCard project={project} index={index} isRevealed={isRevealed} />
    </div>
  );
};

export default ProjectsSection;