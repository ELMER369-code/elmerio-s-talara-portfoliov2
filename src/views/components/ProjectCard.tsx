import React from 'react';
import { Project } from '../types';
import ComplexityMeter from './ComplexityMeter';
import { Cpu, Code, Zap, Smartphone, ArrowUpRight, Github } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { vibe } = useTheme();
  const getIcon = () => {
    switch (project.category) {
      case 'Hardware': return <Zap className={`text-theme-accent w-6 h-6`} />;
      case 'Robotics': return <Cpu className={`text-theme-accent w-6 h-6`} />;
      case 'Mobile': return <Smartphone className={`text-theme-accent w-6 h-6`} />;
      default: return <Code className={`text-theme-accent w-6 h-6`} />;
    }
  };

  return (
    <div className={`group relative bg-navy-light rounded hover:-translate-y-2 transition-transform duration-300 ease-in-out h-full flex flex-col border border-transparent hover:border-theme-accent/30`}>

      {/* Schematic corners */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-theme-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-theme-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden w-full h-48 rounded-t">
        <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-multiply"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className={`absolute top-4 left-4 z-20 bg-navy/90 p-2 rounded border border-theme-accent/20 backdrop-blur-sm`}>
          {getIcon()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-mono text-xl text-slate-lightest font-bold group-hover:text-theme-accent transition-colors`}>
            {project.title}
          </h3>
          <div className="flex space-x-2 text-slate-light">
            <a href="#" className={`hover:text-theme-accent transition-colors`} aria-label="View Source">
              <Github size={18} />
            </a>
            <a href="#" className={`hover:text-theme-accent transition-colors`} aria-label="View Details">
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-slate leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Push to bottom */}
        <div className="mt-auto">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs text-slate-light">
            {project.tags.map((tag) => (
              <span key={tag} className={`bg-navy-lighter px-2 py-1 rounded-full border border-slate/10 group-hover:border-theme-accent/20 transition-colors`}>
                {tag}
              </span>
            ))}
          </div>

          <ComplexityMeter level={project.complexity} score={project.complexityScore} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;