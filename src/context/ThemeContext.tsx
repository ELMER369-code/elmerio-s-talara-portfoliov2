import React, { createContext, useContext, useState, useEffect } from 'react';

type VibeType = 'cyan' | 'green';

interface ThemeContextType {
    vibe: VibeType;
    setVibe: (vibe: VibeType) => void;
    sidebarColor: string;
    setSidebarColor: (color: string) => void;
    accentColor: string;
    setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Persistent state
    const [vibe, setVibe] = useState<VibeType>(() => {
        return (localStorage.getItem('portfolio-vibe') as VibeType) || 'cyan';
    });

    // Admin specific UI persistent state
    const [sidebarColor, setSidebarColor] = useState(() => {
        return localStorage.getItem('admin-sidebar-color') || 'bg-slate-900';
    });

    const [accentColor, setAccentColor] = useState(() => {
        return localStorage.getItem('admin-accent-color') || 'bg-blue-600';
    });

    useEffect(() => {
        localStorage.setItem('portfolio-vibe', vibe);
        // Apply vibe class to body for global CSS targeting if needed
        document.body.classList.remove('vibe-cyan', 'vibe-green');
        document.body.classList.add(`vibe-${vibe}`);
    }, [vibe]);

    useEffect(() => {
        localStorage.setItem('admin-sidebar-color', sidebarColor);
    }, [sidebarColor]);

    useEffect(() => {
        localStorage.setItem('admin-accent-color', accentColor);
    }, [accentColor]);

    return (
        <ThemeContext.Provider value={{ vibe, setVibe, sidebarColor, setSidebarColor, accentColor, setAccentColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
