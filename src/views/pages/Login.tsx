import React from 'react';

const Login = () => {
    return (
        <div className="min-h-screen bg-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-cyan-electric selection:text-navy-deep">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-silver font-mono">
                    Admin Features Unavailable
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Authentication requires a database backend
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-navy-light py-8 px-4 shadow-[0_0_15px_rgba(100,255,218,0.1)] sm:rounded-lg sm:px-10 border border-cyan-electric/20">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-cyan-electric/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-cyan-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Admin login and authentication are powered by Supabase Auth.
                            This portfolio is currently running in static mode without a database connection.
                        </p>
                        <p className="text-slate-500 text-xs font-mono">
                            To enable admin access, configure a Supabase project and set the required environment variables.
                        </p>
                        <a
                            href="/"
                            className="inline-block mt-4 px-6 py-3 border border-cyan-electric rounded-md text-sm font-medium text-cyan-electric hover:bg-cyan-electric hover:text-navy-deep transition-all font-mono"
                        >
                            Return to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
