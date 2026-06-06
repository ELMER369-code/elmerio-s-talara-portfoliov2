import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectGrid from '../components/ProjectGrid';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { useTheme } from '../../context/ThemeContext';
import { useAnalytics } from '../../controllers/useAnalytics';

const Home = () => {
    const [activeSection, setActiveSection] = useState('home');
    const { vibe } = useTheme();
    useAnalytics(); // Initialize visitor tracking

    useEffect(() => {
        // Set dynamic CSS variables for global animations/effects
        const root = document.documentElement;
        if (vibe === 'cyan') {
            root.style.setProperty('--accent-color', '#00f2ff');
            root.style.setProperty('--glow-color', 'rgba(0, 242, 255, 0.6)');
            root.style.setProperty('--glow-color-dim', 'rgba(0, 242, 255, 0.2)');
        } else {
            root.style.setProperty('--accent-color', '#00ff41');
            root.style.setProperty('--glow-color', 'rgba(0, 255, 65, 0.6)');
            root.style.setProperty('--glow-color-dim', 'rgba(0, 255, 65, 0.2)');
        }

        const sections = ['about', 'projects', 'skills', 'contact'];

        const observers = sections.map(id => {
            const el = document.getElementById(id);
            if (!el) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { threshold: 0.15 }
            );
            observer.observe(el);
            return observer;
        });

        return () => observers.forEach(obs => obs?.disconnect());
    }, []);

    const NavLink = ({ href, label, number }: { href: string, label: string, number: string }) => {
        const id = href.replace('#', '');
        const isActive = activeSection === id;

        return (
            <a
                href={href}
                className={`
                    px-6 py-2 rounded-full border transition-all duration-300 font-mono text-xs relative group
                    ${isActive
                        ? `border-theme-accent text-navy-deep font-bold bg-theme-accent shadow-[0_0_20px_${vibe === 'cyan' ? 'rgba(0,242,255,0.4)' : 'rgba(0,255,65,0.4)'}]`
                        : `border-transparent text-slate-300 hover:text-theme-accent hover:border-theme-accent/30`}
                `}
            >
                <span className={`${isActive ? 'text-navy-deep font-extrabold' : `text-theme-accent/60`} group-hover:text-theme-accent mr-2`}>{number}.</span>
                {label}
            </a>
        );

    };

    return (
        <div className="bg-navy-deep min-h-screen">
            {/* Top Navigation Bar (Enhanced) */}
            <nav className={`sticky top-0 bg-navy-deep/90 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 py-5 font-mono text-sm z-[100] border-b border-theme-accent/20 shadow-[0_10px_30px_-10px_rgba(2,6,23,0.9)] transition-all duration-500`}>
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <div className={`w-11 h-11 border-2 border-theme-accent rounded-lg overflow-hidden shadow-[0_0_15px_${vibe === 'cyan' ? 'rgba(0,242,255,0.3)' : 'rgba(0,255,65,0.3)'}] group-hover:scale-110 transition-all duration-300 bg-navy-light`}>
                        <img src={import.meta.env.BASE_URL + 'assets/logo.png'} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-theme-accent font-bold tracking-tighter text-lg group-hover:text-silver transition-colors`}>STe.</span>
                </div>

                <div className="space-x-4 hidden md:flex items-center">
                    <NavLink href="#about" label="About" number="01" />
                    <NavLink href="#projects" label="Projects" number="02" />
                    <NavLink href="#skills" label="Skills" number="03" />

                    <a
                        href="#contact"
                        className={`
                            ml-4 px-6 py-2.5 rounded-full border-2 border-theme-accent text-theme-accent font-bold tracking-widest uppercase text-[10px]
                            transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent hover:bg-theme-accent hover:text-navy-deep shadow-[0_0_15px_${vibe === 'cyan' ? 'rgba(0,242,255,0.1)' : 'rgba(0,255,65,0.1)'}]
                        `}
                        style={{ animation: 'hire-me-glow 2s infinite ease-in-out' }}
                    >
                        04. Contact Me
                    </a>

                </div>
            </nav>

            <main className="flex flex-col">
                <Hero />
                <About />
                <ProjectGrid />
                <Skills />
                <Contact />
            </main>

            <footer className={`py-8 text-center font-mono text-xs text-slate-500 hover:text-theme-accent transition-colors`}>
                <a href="https://github.com/ELMER369-code/elmerio-s-talara-portfolio" target="_blank" rel="noreferrer">
                    Designed & Built by Elmerio S. Talara
                </a>
            </footer>
        </div>
    );
};


export default Home;
