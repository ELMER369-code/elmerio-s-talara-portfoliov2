import React from 'react';
import { useAdminProjects } from '../../controllers/useAdminProjects';
import { useAdminAnalytics } from '../../controllers/useAdminAnalytics';
import { useTheme } from '../../context/ThemeContext';
import {
    LayoutDashboard,
    Folders,
    ExternalLink,
    Users,
    FileText,
    Palette,
    Zap
} from 'lucide-react';

const AdminDashboard = () => {
    const { projects, loading } = useAdminProjects();
    const { uniqueVisitors, totalInteractions, loading: analyticsLoading } = useAdminAnalytics();

    const {
        vibe, setVibe,
        sidebarColor, setSidebarColor,
        accentColor, setAccentColor
    } = useTheme();

    const accentText = accentColor.replace('bg-', 'text-');

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
            {/* SIDEBAR */}
            <aside className={`w-64 flex-shrink-0 flex flex-col transition-colors duration-300 ${sidebarColor} text-slate-100 hidden md:flex z-20`}>
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
                        <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">Admin</h2>
                        <p className="text-xs text-slate-400">Control Panel</p>
                    </div>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main</p>
                    <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white">
                        <LayoutDashboard size={18} />
                        <span className="font-medium text-sm">Dashboard</span>
                    </div>

                    <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2">Content</p>
                    <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300">
                        <Folders size={18} />
                        <span className="font-medium text-sm">Projects</span>
                    </div>

                    <div className="mt-auto px-2 pt-6">
                        <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
                            <ExternalLink size={18} />
                            <span className="font-medium text-sm">View Website</span>
                        </a>
                    </div>

                    <div className="mt-8 px-2 border-t border-white/10 pt-6">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Zap size={14} className="text-yellow-400" /> Website Vibe
                        </p>
                        <div className="flex gap-2 p-1 bg-black/20 rounded-lg">
                            <button
                                onClick={() => setVibe('cyan')}
                                className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all ${vibe === 'cyan' ? 'bg-cyan-electric text-navy-deep shadow-lg scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                CYAN
                            </button>
                            <button
                                onClick={() => setVibe('green')}
                                className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all ${vibe === 'green' ? 'bg-green-hacker text-navy-deep shadow-lg scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                GREEN
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 px-2 border-t border-white/10 pt-6">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Palette size={14} /> Admin Theme
                        </p>
                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase">Sidebar</label>
                                <div className="flex gap-2 mt-1">
                                    <button onClick={() => setSidebarColor('bg-slate-900')} className="w-6 h-6 rounded-full bg-slate-900 border-2 border-white/20 hover:scale-110 transition-transform"></button>
                                    <button onClick={() => setSidebarColor('bg-blue-950')} className="w-6 h-6 rounded-full bg-blue-950 border-2 border-white/20 hover:scale-110 transition-transform"></button>
                                    <button onClick={() => setSidebarColor('bg-indigo-950')} className="w-6 h-6 rounded-full bg-indigo-950 border-2 border-white/20 hover:scale-110 transition-transform"></button>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase">Accent</label>
                                <div className="flex gap-2 mt-1">
                                    <button onClick={() => setAccentColor('bg-blue-600')} className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white/20 hover:scale-110 transition-transform"></button>
                                    <button onClick={() => setAccentColor('bg-red-500')} className="w-6 h-6 rounded-full bg-red-500 border-2 border-white/20 hover:scale-110 transition-transform"></button>
                                    <button onClick={() => setAccentColor('bg-emerald-500')} className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white/20 hover:scale-110 transition-transform"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* TOP BAR */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <LayoutDashboard className={accentText} />
                        Dashboard Overview
                    </h1>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    {/* Database notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                <LayoutDashboard size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-amber-800">Admin Dashboard Requires a Database Backend</h2>
                                <p className="text-amber-700 mt-2 text-sm leading-relaxed">
                                    The admin panel relies on Supabase for authentication, analytics tracking, visitor data,
                                    and project storage. The frontend is currently running in static mode without a database.
                                    To enable admin features, connect a database backend and configure the required environment variables.
                                </p>
                                <p className="text-amber-600 text-xs mt-3 font-mono">
                                    Current data source: localStorage fallback with static project data.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* STAT CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-full ${accentColor}/10 ${accentText} flex items-center justify-center text-2xl`}>
                                <Users size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Unique Visitors</p>
                                <p className="text-3xl font-extrabold text-slate-800">{analyticsLoading ? '...' : uniqueVisitors}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-2xl">
                                <FileText size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Interactions</p>
                                <p className="text-3xl font-extrabold text-slate-800">{analyticsLoading ? '...' : totalInteractions}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-2xl`}>
                                <FileText size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Projects</p>
                                <p className="text-3xl font-extrabold text-slate-800">{loading ? '...' : projects.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* PROJECT LIST */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Folders size={20} className={accentText} />
                                Project Registry
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                        <th className="py-4 px-6 font-semibold">Project Title</th>
                                        <th className="py-4 px-6 font-semibold hidden md:table-cell">Category</th>
                                        <th className="py-4 px-6 font-semibold hidden sm:table-cell">Tag</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {loading ? (
                                        <tr><td colSpan={3} className="py-8 text-center text-slate-400 animate-pulse">Loading projects...</td></tr>
                                    ) : projects.length === 0 ? (
                                        <tr><td colSpan={3} className="py-8 text-center text-slate-400">No projects found.</td></tr>
                                    ) : projects.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${accentColor}/10 ${accentText} flex items-center justify-center font-bold text-xs shrink-0`}>
                                                        {p.title.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-semibold text-slate-700">{p.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 hidden md:table-cell">
                                                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                                                    {p.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 hidden sm:table-cell font-mono text-xs text-slate-500">
                                                {p.tag}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
