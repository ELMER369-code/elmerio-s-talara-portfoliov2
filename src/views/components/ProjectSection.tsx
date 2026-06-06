import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import { useTheme } from '../../context/ThemeContext';

const ProjectSection: React.FC = () => {
  const { vibe } = useTheme();
  return (
    <section id="projects" className="py-24 px-6 md:px-24 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-slate-lightest flex items-center gap-2">
          <span className={`font-mono text-theme-accent text-xl`}>02.</span> Some Things I've Built
        </h2>
        <div className="h-[1px] bg-navy-lighter flex-grow max-w-xs"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;