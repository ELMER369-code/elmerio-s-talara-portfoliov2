import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

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
    const [uniqueVisitors, setUniqueVisitors] = useState<number>(0);
    const [totalInteractions, setTotalInteractions] = useState<number>(0);
    const [locations, setLocations] = useState<VisitorLocation[]>([]);
    const [allVisitors, setAllVisitors] = useState<VisitorRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            // 1. Get unique visitors count
            const { count: vCount, error: vErr } = await supabase
                .from('visitors')
                .select('*', { count: 'exact', head: true });

            if (!vErr && vCount !== null) {
                setUniqueVisitors(vCount);
            }

            // 2. Get interactions count
            const { count: iCount, error: iErr } = await supabase
                .from('interactions')
                .select('*', { count: 'exact', head: true });

            if (!iErr && iCount !== null) {
                setTotalInteractions(iCount);
            }

            // 3. Get locations for the map
            const { data: locData, error: locErr } = await supabase
                .from('visitors')
                .select('id, latitude, longitude, city, country, browser, cpu_cores, ram_gb, gpu_renderer, email')
                .not('latitude', 'is', null)
                .not('longitude', 'is', null);

            if (!locErr && locData) {
                setLocations(locData as VisitorLocation[]);
            }

            // 4. Get all visitor records for the list view
            const { data: allData, error: allErr } = await supabase
                .from('visitors')
                .select('*')
                .order('last_visit', { ascending: false });

            if (!allErr && allData) {
                setAllVisitors(allData as VisitorRecord[]);
            }

        } catch (err) {
            console.error('Error fetching admin analytics:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    return { uniqueVisitors, totalInteractions, locations, allVisitors, loading, refresh: fetchAnalytics };
};
