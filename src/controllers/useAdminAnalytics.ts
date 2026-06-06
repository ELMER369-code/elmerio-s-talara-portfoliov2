import { useEffect, useState } from 'react';

export interface VisitorLocation {
    id: string;
    latitude: number;
    longitude: number;
    city: string | null;
    country: string | null;
    browser: string | null;
    cpu_cores: number | null;
    ram_gb: number | null;
    gpu_renderer: string | null;
    email: string | null;
}

export interface VisitorRecord extends VisitorLocation {
    fingerprint: string;
    ip_address: string | null;
    region: string | null;
    os: string | null;
    first_visit: string;
    last_visit: string;
    visit_count: number;
}

export const useAdminAnalytics = () => {
    const [uniqueVisitors] = useState<number>(0);
    const [totalInteractions] = useState<number>(0);
    const [locations] = useState<VisitorLocation[]>([]);
    const [allVisitors] = useState<VisitorRecord[]>([]);
    const [loading] = useState(false);

    useEffect(() => {
        console.log('Analytics dashboard: no database backend available');
    }, []);

    return {
        uniqueVisitors,
        totalInteractions,
        locations,
        allVisitors,
        loading,
        refresh: () => console.log('Refresh: no database backend')
    };
};
