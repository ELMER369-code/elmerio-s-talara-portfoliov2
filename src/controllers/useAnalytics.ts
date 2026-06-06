import { useEffect, useRef } from 'react';

export const useAnalytics = () => {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
    }, []);

    const trackInteraction = async (action: string, details?: any) => {
        console.log('[Analytics] Interaction:', action, details);
    };

    const identifyVisitor = async (email: string) => {
        console.log('[Analytics] Identify:', email);
    };

    return { trackInteraction, identifyVisitor, visitorId: null };
};
