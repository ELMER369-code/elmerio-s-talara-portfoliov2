import { useState, useEffect } from 'react';
import { ProjectModel, Project } from '../models/ProjectModel';

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = ['All', 'Software', 'Hardware', 'Embedded System'];

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await ProjectModel.getAllProjects();

            if (data) setProjects(data);
            if (fetchError) {
                console.error("Error fetching projects:", fetchError);
                setError(fetchError.message || "Failed to load projects");
            }

            setLoading(false);
        };

        fetchProjects();
    }, []);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    return {
        projects: filteredProjects,
        loading,
        error,
        filter,
        setFilter,
        categories
    };
};
