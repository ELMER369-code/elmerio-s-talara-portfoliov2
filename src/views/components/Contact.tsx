import React from 'react';
import { useTheme } from '../../context/ThemeContext';

import { useAnalytics } from '../../controllers/useAnalytics';

const Contact = () => {
    const { vibe } = useTheme();
    const { identifyVisitor } = useAnalytics();
    const [isOpen, setIsOpen] = React.useState(false);
    const [identityInput, setIdentityInput] = React.useState('');

    const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=elmeriotalara@gmail.com&su=&body=Hello%20Elmer,%20Good%20Day!";
    const messengerUrl = "https://m.me/dummyacctv3?text=Hello%20Elmer,%20Good%20Day!";

    const handleIdentityTracking = (platform: string) => {
        const identityStr = identityInput.trim() ? `${identityInput} (via ${platform})` : `Contacted via ${platform} (No Name Given)`;
        identifyVisitor(identityStr);
    };

    return (
        <section id="contact" className="py-20 container mx-auto px-6 text-center max-w-4xl relative">
            <p className={`font-mono text-theme-accent text-lg mb-4`}>
                04. What's Next?
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-silver mb-8 font-sans transition-all duration-300">
                Get In Touch
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
                Whether you have a question about my hardware prototypes, software solutions, or just want to say hi, my inbox is always open.
            </p>

            <button
                onClick={() => setIsOpen(true)}
                className={`inline-block font-mono text-theme-accent border border-theme-accent px-8 py-4 rounded hover:bg-theme-accent/10 transition-all duration-300 shadow-[0_0_15px_${vibe === 'cyan' ? 'rgba(0,242,255,0.1)' : 'rgba(0,255,65,0.1)'}]`}
            >
                Say Hello
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className={`relative w-full max-w-md bg-navy-light border border-theme-accent/30 rounded-xl shadow-2xl p-8 animate-in zoom-in duration-300`}>
                        {/* Close Button "X" */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`absolute -top-3 -right-3 w-8 h-8 bg-navy border border-theme-accent/50 text-theme-accent rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-navy transition-all z-[110] shadow-lg`}
                            title="Close"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-2xl font-bold text-silver mb-2 font-sans">Reach Out Directly</h3>
                        <p className="text-slate-400 text-sm mb-6 font-mono italic">Choose your preferred channel</p>

                        <div className="mb-6 text-left">
                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Your Name or Email (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g. John Doe / john@example.com"
                                value={identityInput}
                                onChange={(e) => setIdentityInput(e.target.value)}
                                className="w-full bg-navy/50 border border-theme-accent/30 rounded-lg px-4 py-3 text-sm text-silver focus:ring-1 focus:ring-theme-accent outline-none placeholder:text-slate-600 transition-all focus:bg-navy"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <a
                                href={messengerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleIdentityTracking('Messenger')}
                                className="flex items-center justify-center gap-4 bg-[#00B2FF]/10 text-[#00B2FF] border border-[#00B2FF]/30 py-4 rounded-lg font-mono text-lg hover:bg-[#00B2FF]/20 transition-all group relative overflow-hidden"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.457 5.518 3.737 7.238V22l3.352-1.84c.883.245 1.815.38 2.784.38 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.18 12.19l-2.545-2.722-4.962 2.722 5.457-5.795 2.618 2.722 4.889-2.722-5.457 5.795z" />
                                </svg>
                                VIA MESSENGER
                            </a>

                            <a
                                href={gmailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleIdentityTracking('Gmail')}
                                className="flex items-center justify-center gap-4 bg-[#EA4335]/10 text-[#EA4335] border border-[#EA4335]/30 py-4 rounded-lg font-mono text-lg hover:bg-[#EA4335]/20 transition-all group"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                VIA GMAIL
                            </a>
                        </div>

                        <div className={`mt-8 pt-4 border-t border-theme-accent/10 text-xs text-slate-500 font-mono italic`}>
                            Pre-filled message: "Hello Elmer, Good Day!"
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;
