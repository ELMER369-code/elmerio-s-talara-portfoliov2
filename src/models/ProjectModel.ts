import { projects as staticProjects } from '../../data/projects';

export interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
    tech_stack: string[];
    category: string;
    tag: string;
}

const STORAGE_KEY = 'portfolio-projects';

function getInitialProjects(): Project[] {
    return staticProjects.map((p, i) => ({
        id: i + 1,
        title: p.title,
        description: p.description,
        image_url: p.image,
        tech_stack: p.techStack,
        category: p.category,
        tag: p.tag,
    }));
}

function loadProjects(): Project[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch { /* ignore */ }
    const initial = getInitialProjects();
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch { /* ignore */ }
    return initial;
}

function saveProjects(projects: Project[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch { /* ignore */ }
}

export const ProjectModel = {
    async getAllProjects(): Promise<{ data: Project[] | null; error: any }> {
        const data = loadProjects();
        return { data, error: null };
    },

    async createProject(project: Omit<Project, 'id'>): Promise<{ data: Project | null; error: any }> {
        const projects = loadProjects();
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const newProject: Project = { ...project, id: newId };
        projects.unshift(newProject);
        saveProjects(projects);
        return { data: newProject, error: null };
    },

    async updateProject(id: number, updates: Partial<Project>): Promise<{ data: Project | null; error: any }> {
        const projects = loadProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) return { data: null, error: new Error('Project not found') };
        projects[index] = { ...projects[index], ...updates };
        saveProjects(projects);
        return { data: projects[index], error: null };
    },

    async deleteProject(id: number): Promise<{ error: any }> {
        const projects = loadProjects();
        const filtered = projects.filter(p => p.id !== id);
        if (filtered.length === projects.length) return { error: new Error('Project not found') };
        saveProjects(filtered);
        return { error: null };
    },

    async uploadImage(_file: File): Promise<{ publicUrl: string | null; error: any }> {
        console.warn('Image upload requires a storage backend');
        return { publicUrl: null, error: new Error('No storage backend available') };
    }
};
