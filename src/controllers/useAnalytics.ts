import { useEffect, useState, useRef } from 'react';
import fpPromise from '@fingerprintjs/fingerprintjs';
import { supabase } from '../lib/supabase';

export const useAnalytics = () => {
    const [visitorId, setVisitorId] = useState<string | null>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const initAnalytics = async () => {
            try {
                // 1. Get Fingerprint
                const fp = await fpPromise.load();
                const result = await fp.get();
                const currentVisitorId = result.visitorId;
                setVisitorId(currentVisitorId);

                // Check if session is already recorded to avoid spamming the DB
                const hasLoggedSession = sessionStorage.getItem('has_logged_session');

                // Helper to get WebGL GPU info
                const getGPU = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                        if (gl) {
                            // @ts-ignore
                            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                            // @ts-ignore
                            return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null;
                        }
                    } catch (e) { return null; }
                    return null;
                };

                if (!hasLoggedSession) {
                    sessionStorage.setItem('has_logged_session', 'true');

                    // 2. Get Location & Hardware Specs
                    let loc = null;
                    try {
                        const locRes = await fetch('https://ipapi.co/json/');
                        if (locRes.ok) loc = await locRes.json();
                    } catch (e) { console.error('Location fetch failed', e); }

                    const cpuCores = navigator.hardwareConcurrency || null;
                    const ramGb = (navigator as any).deviceMemory || null;
                    const gpuRenderer = getGPU();

                    // 3. Upsert visitor in Supabase
                    const { data: existingVisitor } = await supabase
                        .from('visitors')
                        .select('id, visit_count')
                        .eq('fingerprint', currentVisitorId)
                        .maybeSingle();

                    if (existingVisitor) {
                        // Update existing visitor
                        await supabase.from('visitors').update({
                            ip_address: loc?.ip || null,
                            city: loc?.city || null,
                            country: loc?.country_name || null,
                            region: loc?.region || null,
                            latitude: loc?.latitude || null,
                            longitude: loc?.longitude || null,
                            cpu_cores: cpuCores,
                            ram_gb: ramGb,
                            gpu_renderer: gpuRenderer,
                            last_visit: new Date().toISOString(),
                            visit_count: (existingVisitor.visit_count || 1) + 1
                        }).eq('id', existingVisitor.id);
                    } else {
                        // Insert new visitor
                        // @ts-ignore
                        const browserDetails = window.navigator.userAgent;
                        await supabase.from('visitors').insert([{
                            fingerprint: currentVisitorId,
                            ip_address: loc?.ip || null,
                            city: loc?.city || null,
                            country: loc?.country_name || null,
                            region: loc?.region || null,
                            latitude: loc?.latitude || null,
                            longitude: loc?.longitude || null,
                            cpu_cores: cpuCores,
                            ram_gb: ramGb,
                            gpu_renderer: gpuRenderer,
                            browser: browserDetails,
                            os: window.navigator.platform
                        }]);
                    }

                    // 4. Log page view interaction
                    await supabase.from('interactions').insert([{
                        fingerprint: currentVisitorId,
                        action: 'page_view',
                        details: { path: window.location.pathname }
                    }]);
                }

            } catch (err) {
                console.error('Analytics error:', err);
            }
        };

        initAnalytics();
    }, []);

    const trackInteraction = async (action: string, details?: any) => {
        if (!visitorId) return;
        try {
            await supabase.from('interactions').insert([{
                fingerprint: visitorId,
                action,
                details: details || {}
            }]);
        } catch (err) {
            console.error('Failed to log interaction', err);
        }
    };

    /**
     * Links an email address to the current visitor's fingerprint in the database.
     */
    const identifyVisitor = async (email: string) => {
        if (!visitorId || !email) return;
        try {
            await supabase
                .from('visitors')
                .update({ email: email })
                .eq('fingerprint', visitorId);

            await trackInteraction('email_provided', { email });
        } catch (err) {
            console.error('Failed to link identity', err);
        }
    };

    return { trackInteraction, identifyVisitor, visitorId };
};
