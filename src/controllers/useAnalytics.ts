import { useEffect, useState, useRef } from 'react';
import fpPromise from '@fingerprintjs/fingerprintjs';

export const useAnalytics = () => {
    const [visitorId, setVisitorId] = useState<string | null>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const initAnalytics = async () => {
            try {
                const fp = await fpPromise.load();
                const result = await fp.get();
                const currentVisitorId = result.visitorId;
                setVisitorId(currentVisitorId);

                const hasLoggedSession = sessionStorage.getItem('has_logged_session');

                if (!hasLoggedSession) {
                    sessionStorage.setItem('has_logged_session', 'true');
                    console.log('[Analytics] Visitor:', currentVisitorId);
                }
            } catch (err) {
                console.error('Analytics error:', err);
            }
        };

        initAnalytics();
    }, []);

    const trackInteraction = async (action: string, details?: any) => {
        if (!visitorId) return;
        console.log('[Analytics] Interaction:', action, details);
    };

    const identifyVisitor = async (email: string) => {
        if (!visitorId || !email) return;
        console.log('[Analytics] Identify:', email, visitorId);
    };

    return { trackInteraction, identifyVisitor, visitorId };
};
