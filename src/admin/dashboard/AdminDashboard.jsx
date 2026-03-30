import React, { useState, useEffect } from 'react';
import { Users, Star, Mail, ArrowUpRight, ShieldCheck, Activity, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { API_URL } from "../../../config";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        totalReviews: 0,
        totalContacts: 0,
        todayRegistrations: 0,
        todayReviews: 0,
        todayContacts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetching parallel stats for high performance
                const [regRes, revRes, conRes] = await Promise.all([
                    fetch(`${API_URL}/api/enroll`),
                    fetch(`${API_URL}/api/reviews`), // Reviews usually public-list
                    fetch(`${API_URL}/api/contact`)
                ]);

                const [regData, revData, conData] = await Promise.all([
                    regRes.json(),
                    revRes.json(),
                    conRes.json()
                ]);

                const todayStr = new Date().toDateString();

                setStats({
                    totalRegistrations: regData.success ? regData.data.length : 0,
                    totalReviews: revData.success ? revData.data.length : 0,
                    totalContacts: conData.success ? conData.data.length : 0,
                    todayRegistrations: regData.success ? regData.data.filter(r => new Date(r.createdAt).toDateString() === todayStr).length : 0,
                    todayReviews: revData.success ? revData.data.filter(r => new Date(r.createdAt).toDateString() === todayStr).length : 0,
                    todayContacts: conData.success ? conData.data.filter(r => new Date(r.createdAt).toDateString() === todayStr).length : 0,
                });
            } catch (error) {
                console.error("Dashboard Sync Failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const totalStats = [
        { label: 'Total Registrations', value: loading ? '...' : stats.totalRegistrations.toLocaleString(), change: '+12.5%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Total Reviews', value: loading ? '...' : stats.totalReviews.toLocaleString(), change: '+8.2%', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Total Contacts', value: loading ? '...' : stats.totalContacts.toLocaleString(), change: '+2.4%', icon: Mail, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    ];

    const todayStats = [
        { label: 'Today Registrations', value: loading ? '...' : stats.todayRegistrations, time: 'Live sync active', icon: Users, color: 'text-blue-400', border: 'border-blue-500/20' },
        { label: 'Today Reviews', value: loading ? '...' : stats.todayReviews, time: 'Live sync active', icon: Star, color: 'text-amber-400', border: 'border-amber-500/20' },
        { label: 'Today Contacts', value: loading ? '...' : stats.todayContacts, time: 'Live sync active', icon: Mail, color: 'text-emerald-400', border: 'border-emerald-500/20' },
    ];

    return (
        <div className="space-y-6 animate-fade-in max-w-full mx-auto font-inter">
            {/* Header Area - Compact & Professional */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-0.5 ">
                        System <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-400">Intelligence</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Live Network</span>
                        </div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-[1.5px]">Admin Terminal / Node-01</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0">Global Sync</p>
                        <p className="text-[11px] font-mono font-bold text-blue-400">92% PERFORMANCE</p>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Sync Time</span>
                        <span className="text-[11px] font-bold text-white font-mono">09:42:15</span>
                    </div>
                </div>
            </div>

            {/* Total Stats - Premium Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {totalStats.map((stat, i) => (
                    <div key={i} className="group relative p-5 rounded-2xl bg-linear-to-br from-white/5 to-transparent border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 transition-all" />
                        <div className="flex justify-between items-start mb-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} transition-all duration-500 group-hover:scale-105 shadow-inner`}>
                                <stat.icon size={20} strokeWidth={2.5} />
                            </div>
                            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.change}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-white mb-0.5 tracking-tight">{stat.value}</h3>
                        <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-slate-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Today Stats - Sleek Horizontal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {todayStats.map((stat, i) => (
                    <div key={i} className={`p-4 rounded-xl bg-slate-900/40 border ${stat.border} group transition-all duration-300 hover:bg-slate-900/60`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 ${stat.color} group-hover:bg-white/10 transition-colors`}>
                                <stat.icon size={16} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-0.5">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-600">{stat.label}</p>
                                    <ArrowUpRight size={12} className="text-slate-800 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <h4 className="text-lg font-black text-white tracking-tighter">{stat.value}</h4>
                                    <span className="text-[7px] font-bold text-slate-700 uppercase tracking-tighter">{stat.time}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Progress Bar (Visual Polish) */}
                        <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-current ${stat.color} opacity-30 group-hover:opacity-100 transition-all duration-700`} 
                                style={{ width: i === 0 ? '65%' : i === 1 ? '40%' : '85%' }} 
                            />
                        </div>
                    </div>
                ))}
            </div>

           

          

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
