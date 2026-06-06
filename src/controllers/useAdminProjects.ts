import { useState, useEffect } from 'react';
import { ProjectModel, Project } from '../models/ProjectModel';

export const useAdminProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await ProjectModel.getAllProjects();
        if (data) setProjects(data);
        if (error) setError(error.message);
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const addProject = async (project: Omit<Project, 'id'>) => {
        const { data, error } = await ProjectModel.createProject(project);
        if (data) {
            setProjects([data, ...projects]);
            return true;
        }
        if (error) setError(error.message);
        return false;
    };

    const updateProject = async (id: number, updates: Partial<Project>) => {
        const { data, error } = await ProjectModel.updateProject(id, updates);
        if (data) {
            setProjects(projects.map(p => p.id === id ? data : p));
            return true;
        }
        if (error) setError(error.message);
        return false;
    };

    const deleteProject = async (id: number) => {
        const { error } = await ProjectModel.deleteProject(id);
        if (!error) {
            setProjects(projects.filter(p => p.id !== id));
            return true;
        }
        setError(error.message);
        return false;
    };

    return {
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        uploadImage: ProjectModel.uploadImage,
        refresh: fetchProjects
    };
};
