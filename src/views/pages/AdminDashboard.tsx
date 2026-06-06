import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminProjects } from '../../controllers/useAdminProjects';
import { useAdminAnalytics } from '../../controllers/useAdminAnalytics';
import { useTheme } from '../../context/ThemeContext';
import {
    LayoutDashboard,
    Folders,
    Settings,
    ExternalLink,
    Users,
    ShoppingBag,
    DollarSign,
    FileText,
    LogOut,
    Edit3,
    Trash2,
    Palette,
    Zap,
    Map
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const AdminDashboard = () => {
    const { projects, loading, error, addProject, updateProject, deleteProject, uploadImage } = useAdminProjects();
    const { uniqueVisitors, totalInteractions, locations, allVisitors, loading: analyticsLoading } = useAdminAnalytics();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'visitors'>('dashboard');

    const {
        vibe, setVibe,
        sidebarColor, setSidebarColor,
        accentColor, setAccentColor
    } = useTheme();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const accentText = accentColor.replace('bg-', 'text-');
    const accentBorder = accentColor.replace('bg-', 'border-');


    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        tech_stack: '',
        category: 'Software',
        tag: 'Web Dev'
    });

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', image_url: '', tech_stack: '', category: 'Software', tag: 'Web Dev' });
        setEditingId(null);
        setSelectedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let finalImageUrl = formData.image_url;

        if (selectedFile) {
            const { publicUrl, error: uploadErr } = await uploadImage(selectedFile);
            if (uploadErr) {
                alert(`Upload failed: ${uploadErr.message}`);
                setUploading(false);
                return;
            }
            if (publicUrl) finalImageUrl = publicUrl;
        }

        const formattedData = {
            ...formData,
            image_url: finalImageUrl,
            tech_stack: formData.tech_stack.split(',').map(s => s.trim())
        };

        if (editingId) {
            if (await updateProject(editingId, formattedData)) resetForm();
        } else {
            if (await addProject(formattedData)) resetForm();
        }
        setUploading(false);
    };

    const handleEdit = (project: any) => {
        setEditingId(project.id);
        setFormData({
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            tech_stack: project.tech_stack.join(', '),
            category: project.category,
            tag: project.tag
        });
        setSelectedFile(null);
        // Scroll to form
        document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth' });
    };

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
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? `${accentColor} text-white shadow-md` : 'hover:bg-white/10 text-slate-300 hover:text-white'} transition-all`}>
                        <LayoutDashboard size={18} />
                        <span className="font-medium text-sm">Dashboard</span>
                    </button>

                    <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2">Content</p>
                    <button onClick={() => setActiveTab('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
                        <Folders size={18} />
                        <span className="font-medium text-sm">Projects</span>
                    </button>

                    <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2">System</p>
                    <button onClick={() => setActiveTab('map')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'map' ? `${accentColor} text-white shadow-md` : 'hover:bg-white/10 text-slate-300 hover:text-white'} transition-all`}>
                        <Map size={18} />
                        <span className="font-medium text-sm">Visitors Map</span>
                    </button>
                    <button onClick={() => setActiveTab('visitors')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'visitors' ? `${accentColor} text-white shadow-md` : 'hover:bg-white/10 text-slate-300 hover:text-white'} transition-all`}>
                        <Users size={18} />
                        <span className="font-medium text-sm">Visitors List</span>
                    </button>
                    <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
                        <ExternalLink size={18} />
                        <span className="font-medium text-sm">View Website</span>
                    </a>

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
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50">
                            <div className={`w-8 h-8 rounded-full ${accentColor} text-white flex items-center justify-center font-bold text-sm`}>A</div>
                            <span className="text-sm font-medium text-slate-600 mr-2">admin</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">

                    {activeTab === 'dashboard' && (
                        <>
                            {/* STAT CARDS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-5 slide-up" style={{ animationDelay: '0ms' }}>
                                    <div className={`w-14 h-14 rounded-full ${accentColor}/10 ${accentText} flex items-center justify-center text-2xl`}>
                                        <Users size={28} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Unique Visitors</p>
                                        <p className="text-3xl font-extrabold text-slate-800">{analyticsLoading ? '...' : uniqueVisitors}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-5 slide-up" style={{ animationDelay: '100ms' }}>
                                    <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-2xl">
                                        <ShoppingBag size={28} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Interactions</p>
                                        <p className="text-3xl font-extrabold text-slate-800">{analyticsLoading ? '...' : totalInteractions}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-5 slide-up" style={{ animationDelay: '200ms' }}>
                                    <div className={`w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-2xl`}>
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Projects</p>
                                        <p className="text-3xl font-extrabold text-slate-800">{projects.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* PROJECT LIST MATRIX (TABLE STYLE) */}

                                <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col slide-up" style={{ animationDelay: '400ms' }}>
                                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <Folders size={20} className={accentText} />
                                            Project Registry
                                        </h3>
                                        <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium hover:bg-slate-200 transition-colors">View All</button>
                                    </div>

                                    <div className="flex-1 overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50/80 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                                    <th className="py-4 px-6 font-semibold">Project Title</th>
                                                    <th className="py-4 px-6 font-semibold hidden md:table-cell">Category</th>
                                                    <th className="py-4 px-6 font-semibold hidden sm:table-cell">Tag</th>
                                                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {loading ? (
                                                    <tr><td colSpan={4} className="py-8 text-center text-slate-400 animate-pulse">Loading projects...</td></tr>
                                                ) : projects.length === 0 ? (
                                                    <tr><td colSpan={4} className="py-8 text-center text-slate-400">No projects found.</td></tr>
                                                ) : projects.map((p) => (
                                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
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
                                                        <td className="py-4 px-6 text-right">
                                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button onClick={() => handleEdit(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors" title="Edit">
                                                                    <Edit3 size={16} />
                                                                </button>
                                                                <button onClick={() => deleteProject(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* QUICK ACTIONS / EDIT FORM */}
                                <div id="edit-form" className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden slide-up h-fit" style={{ animationDelay: '500ms' }}>
                                    <div className="p-6 border-b border-slate-100 bg-white">
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <Edit3 size={20} className={accentText} />
                                            {editingId ? 'Edit Project' : 'Quick Actions'}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1">Manage project details and database records.</p>
                                    </div>

                                    <div className="p-6 bg-slate-50/30">
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Project Title</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-${accentColor.split('-')[1]}-500/20 focus:${accentBorder} outline-none transition-all`}
                                                    value={formData.title}
                                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Category</label>
                                                    <select
                                                        className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-${accentColor.split('-')[1]}-500/20 focus:${accentBorder} outline-none transition-all`}
                                                        value={formData.category}
                                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                    >
                                                        <option>Software</option>
                                                        <option>Hardware</option>
                                                        <option>Embedded System</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Tag (Short)</label>
                                                    <input
                                                        type="text"
                                                        className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-${accentColor.split('-')[1]}-500/20 focus:${accentBorder} outline-none transition-all`}
                                                        value={formData.tag}
                                                        onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Description</label>
                                                <textarea
                                                    className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-3 text-sm h-24 resize-none focus:ring-2 focus:ring-${accentColor.split('-')[1]}-500/20 focus:${accentBorder} outline-none transition-all`}
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Project Image</label>
                                                <div className="p-4 border border-dashed border-slate-300 rounded-lg bg-white relative hover:bg-slate-50 transition-colors">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    <div className="flex flex-col items-center justify-center text-center">
                                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                                                            <FileText size={20} />
                                                        </div>
                                                        <p className="text-sm font-medium text-slate-700">Click to upload image</p>
                                                        <p className="text-xs text-slate-500 mt-1">or drag and drop here</p>
                                                        {selectedFile && <p className="text-xs text-emerald-600 font-medium mt-2">Selected: {selectedFile.name}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center my-3">
                                                    <div className="flex-1 border-t border-slate-200"></div>
                                                    <span className="px-3 text-[10px] font-bold text-slate-400 uppercase">OR URL</span>
                                                    <div className="flex-1 border-t border-slate-200"></div>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Paste image URL here"
                                                    className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-${accentColor.split('-')[1]}-500/20 focus:${accentBorder} outline-none transition-all`}
                                                    value={formData.image_url}
                                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Tech Stack (comma separated)</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. React, Typescript, Node.js"
                                                    className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-${accentColor.split('-')[1]}-500/20 focus:${accentBorder} outline-none transition-all`}
                                                    value={formData.tech_stack}
                                                    onChange={e => setFormData({ ...formData, tech_stack: e.target.value })}
                                                />
                                            </div>

                                            <div className="pt-2 flex gap-3">
                                                <button
                                                    type="submit"
                                                    disabled={uploading}
                                                    className={`flex-1 ${accentColor} text-white font-medium py-2.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50`}
                                                >
                                                    {uploading ? 'Processing...' : (editingId ? 'Update Record' : 'Save Project')}
                                                </button>
                                                {editingId && !uploading && (
                                                    <button
                                                        type="button"
                                                        onClick={resetForm}
                                                        className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'map' && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[650px] slide-up">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <Map size={20} className={accentText} />
                                    Global Visitors Map
                                </h3>
                                <div className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                    {uniqueVisitors} Total Unique Pins
                                </div>
                            </div>

                            <div className="flex-1 w-full relative z-0">
                                <MapContainer center={[20, 0]} zoom={2.5} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                    />
                                    {locations.map((loc, i) => (
                                        <Marker key={`${loc.id}-${i}`} position={[loc.latitude, loc.longitude]}>
                                            <Popup>
                                                <b>{loc.city || 'Unknown City'}, {loc.country || 'Unknown Location'}</b><br />
                                                Browser: {loc.browser || 'Unknown'}<br />
                                                {loc.cpu_cores && <>CPU Cores: {loc.cpu_cores}<br /></>}
                                                {loc.ram_gb && <>RAM: {loc.ram_gb}GB<br /></>}
                                                {loc.gpu_renderer && <><span title={loc.gpu_renderer} className="truncate block max-w-[150px]">GPU: {loc.gpu_renderer.split(' ').slice(0, 3).join(' ')}</span></>}
                                                {loc.email && <b className="text-emerald-600 mt-1 block border-t pt-1">{loc.email}</b>}
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        </div>
                    )}

                    {activeTab === 'visitors' && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col slide-up">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <Users size={20} className={accentText} />
                                    Global Visitor Accounts
                                </h3>
                                <div className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                    {allVisitors.length} Total Unique Users
                                </div>
                            </div>

                            <div className="flex-1 overflow-x-auto min-h-[500px]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                            <th className="py-4 px-6 font-semibold">Fingerprint / Email</th>
                                            <th className="py-4 px-6 font-semibold">Location</th>
                                            <th className="py-4 px-6 font-semibold">Hardware & Specs</th>
                                            <th className="py-4 px-6 font-semibold text-right">Visits</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {analyticsLoading ? (
                                            <tr><td colSpan={4} className="py-8 text-center text-slate-400 animate-pulse">Loading visitors...</td></tr>
                                        ) : allVisitors.length === 0 ? (
                                            <tr><td colSpan={4} className="py-8 text-center text-slate-400">No visitors found yet.</td></tr>
                                        ) : allVisitors.map((v, i) => (
                                            <tr key={`${v.fingerprint}-${i}`} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md w-fit mb-1">{v.fingerprint.substring(0, 12)}...</span>
                                                        {v.email ? (
                                                            <span className="text-sm font-semibold text-emerald-600">{v.email}</span>
                                                        ) : (
                                                            <span className="text-xs text-slate-400 italic">Anonymous User</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-slate-700">{v.city || 'Unknown'}, {v.country || 'Unknown'}</span>
                                                        <span className="text-xs text-slate-500">{v.ip_address}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-slate-600 font-medium">{v.os} • {v.browser}</span>
                                                        <div className="flex gap-2">
                                                            {v.cpu_cores && <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">CPU: {v.cpu_cores}</span>}
                                                            {v.ram_gb && <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">RAM: {v.ram_gb}GB</span>}
                                                        </div>
                                                        {v.gpu_renderer && <span className="text-[10px] bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded truncate max-w-[200px]" title={v.gpu_renderer}>{v.gpu_renderer}</span>}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-sm font-bold text-slate-700">{v.visit_count}</span>
                                                        <span className="text-[10px] text-slate-400">Last: {new Date(v.last_visit).toLocaleDateString()}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Simple slide up animation for main content elements */}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .slide-up {
                    opacity: 0;
                    animation: slideUp 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
