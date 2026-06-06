import React from 'react';
import MatrixBackground from './MatrixBackground';
import { useTheme } from '../../context/ThemeContext';

const Hero = () => {
  const { vibe } = useTheme();

  // Theme-based classes
  const glowShadow = vibe === 'cyan' ? 'rgba(0,242,255,0.4)' : 'rgba(0,255,65,0.4)';

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-start container mx-auto px-6 py-20 relative overflow-hidden">

      {/* CMatrix Hacker Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-50"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 30% 60%, 50% 0)' }}
      >
        <MatrixBackground />
      </div>

      {/* Schematic Lines Background Decoration */}
      <div className={`absolute top-0 right-0 w-1/2 h-full border-r border-theme-accent/10 pointer-events-none opacity-20 transform skew-x-12 z-0`}></div>
      <div className={`absolute bottom-10 left-10 w-20 h-20 border-l border-b border-theme-accent/30 pointer-events-none z-0`}></div>

      {/* Content wrapper with higher z-index so text sits above background */}
      <div className="relative z-10 pointer-events-auto">
        <p className={`font-mono text-theme-accent mb-5 tracking-widest text-sm`}>
          HI, MY NAME IS
        </p>

        <h1 className="font-mono text-5xl md:text-7xl font-bold text-silver mb-4 tracking-tight">
          Elmerio S. Talara.
        </h1>

        <h2 className="font-sans text-4xl md:text-6xl font-bold text-slate-400 mb-8 max-w-4xl bg-clip-text">
          Building the Bridge Between<br />
          <span className={`text-theme-accent drop-shadow-[0_0_10px_${glowShadow}]`}>Hardware & Software.</span>
        </h2>

        <p className={`font-sans text-slate-400 text-lg max-w-xl leading-relaxed mb-12 border-l-2 border-theme-accent pl-6`}>
          I am a <span className={`text-theme-accent font-semibold`}>Hybrid Engineer</span> specializing in Hardware and Software integration.
          Graduated with a BS in Computer Engineering from Bohol Island State University Main Campus.
          I build digital blueprints that come to life.
        </p>

        <a
          href="#projects"
          className={`group font-mono text-theme-accent border border-theme-accent px-8 py-4 rounded-sm hover:bg-theme-accent/10 transition-all duration-300 shadow-[0_0_15px_${vibe === 'cyan' ? 'rgba(0,242,255,0.2)' : 'rgba(0,255,65,0.2)'}] hover:shadow-[0_0_25px_${vibe === 'cyan' ? 'rgba(0,242,255,0.4)' : 'rgba(0,255,65,0.4)'}]`}
        >
          Check out my work
          <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">-&gt;</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;