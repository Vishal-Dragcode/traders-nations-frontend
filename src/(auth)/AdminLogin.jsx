import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { API_URL } from "../../config";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Clear any stale session data when landing on login page
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin_email');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admin/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.toLowerCase() })
            });
            const result = await response.json();
            if (result.success) {
                localStorage.setItem('admin_email', email);
                navigate('/admin/verify-otp');
            } else {
                alert(result.error || 'Login failed');
            }
        } catch (error) {
            alert('Could not connect to authentication server');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0d0d0d' }}>
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-md">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-5 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-1">
                        Admin Access
                    </h2>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-[3px]">
                        Trader Nation Portal
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-6 rounded-3xl shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-2 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Tradersnationacadamy@gmail.com"
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[2px] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                        >
                            <span className="relative z-10">Authorize Session</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </form>
                </div>

                {/* Support Link */}
                <p className="mt-4 text-center text-xs font-medium text-slate-600">
                    System Restricted. Logins are monitored. <br />
                    <span className="text-slate-700 hover:text-blue-500 cursor-pointer transition-colors mt-2 inline-block">Request Support</span>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
