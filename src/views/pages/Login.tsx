import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // Redirect to admin dashboard will be handled by router protection later
            window.location.href = '/admin';
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-cyan-electric selection:text-navy-deep">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-silver font-mono">
                    System Access
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Admin Initialization Protocol
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-navy-light py-8 px-4 shadow-[0_0_15px_rgba(100,255,218,0.1)] sm:rounded-lg sm:px-10 border border-cyan-electric/20">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 font-mono">
                                Operator ID (Email)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-navy-deep text-silver placeholder-slate-500 focus:outline-none focus:ring-cyan-electric focus:border-cyan-electric sm:text-sm font-mono"
                                    placeholder="admin@system.local"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 font-mono">
                                Security Key (Password)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-navy-deep text-silver placeholder-slate-500 focus:outline-none focus:ring-cyan-electric focus:border-cyan-electric sm:text-sm font-mono"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm font-mono border border-red-500/50 p-2 rounded bg-red-500/10">
                                [ ACCESS DENIED ] {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-cyan-electric rounded-md shadow-sm text-sm font-medium text-cyan-electric bg-transparent hover:bg-cyan-electric hover:text-navy-deep focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-electric transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                            >
                                {loading ? 'Authenticating...' : 'Engage'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
