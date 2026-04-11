import React, { useState } from "react";
import { Search, Download, Trash2, Printer, Eye, User, Phone, Mail, Calendar, MapPin, Zap, Activity, CheckCircle2, ChevronLeft, ShieldCheck, Users } from "lucide-react";
import { API_URL } from "../../../config";

export default function EventData({ onBack, event, isModal = false }) {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = `${API_URL}/api`;

    React.useEffect(() => {
        const fetchRegistrations = async () => {
            if (!event?._id) return;
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/events/${event._id}/registrations`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    // Map backend fields to frontend display names Proper
                    const mappedData = data.data.map(reg => ({
                        id: reg._id.toString().slice(-6).toUpperCase(),
                        student: reg.fullName,
                        email: reg.email,
                        mobile: reg.contactNo,
                        date: new Date(reg.createdAt).toLocaleDateString()
                    }));
                    setRegistrations(mappedData);
                }
            } catch (err) {
                console.error("Registrations sync error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [event?._id]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = registrations.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(registrations.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={`space-y-6 animate-fade-in pb-8 font-inter ${isModal ? 'pb-0' : ''}`}>
            {/* Header Area */}
            {!isModal && (
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                        {onBack && (
                            <button 
                                onClick={onBack}
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-0.5">
                                Registration <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400">Data Logs</span>
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Active Sync</span>
                                </div>
                                <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-[2px]">Real-time Event Intake Stream</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all text-[10px] uppercase font-black tracking-widest">
                            <Printer size={14} />
                            Print Logs
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all text-[10px] uppercase font-black tracking-widest shadow-lg shadow-blue-600/20">
                            <Download size={14} />
                            Export Data
                        </button>
                    </div>
                </div>
            )}

            {/* Table Area - Futuristic Console Design */}
            <div className="bg-slate-950/40 backdrop-blur-2xl rounded-3xl border border-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-white/2">
                                {[
                                    { label: "Full Name", icon: User },
                                    { label: "Mobile Number", icon: Phone },
                                    { label: "Email Address", icon: Mail }
                                ].map((head, idx) => (
                                    <th key={idx} className="px-6 py-3.5 text-left border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <head.icon size={12} className="text-blue-500 opacity-40" />
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[2px]">{head.label}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest animate-pulse">Synchronizing Terminal...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-30">
                                            <Users size={40} className="text-slate-600 mb-2" />
                                            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[2px]">No Signals Detected</p>
                                            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Repository is currently empty for this session.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentRecords.map((reg) => (
                                    <tr key={reg.id} className="group hover:bg-blue-500/2 transition-colors">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600/20 to-indigo-600/10 border border-white/5 flex items-center justify-center text-blue-400 text-xs font-black shadow-inner">
                                                    {reg.student.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{reg.student}</div>
                                                    <div className="text-[8px] font-bold text-slate-600 mt-0.5 uppercase tracking-widest flex items-center gap-1">
                                                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                        {reg.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">{reg.mobile}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="text-[10px] font-medium text-slate-500 lowercase tracking-tight group-hover:text-slate-300 transition-colors">{reg.email}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Console - Proper Logic Applied */}
                {registrations.length > recordsPerPage && !loading && (
                    <div className="p-3 bg-white/2 border-t border-white/5 flex justify-end items-center">
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
                            <button 
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-colors ${currentPage === 1 ? 'text-slate-800 cursor-not-allowed' : 'text-slate-500 hover:text-white'}`}
                            >
                                Prev
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => (
                                <button 
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-7 h-7 rounded-lg text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-colors ${currentPage === totalPages ? 'text-slate-800 cursor-not-allowed' : 'text-slate-500 hover:text-white'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
            `}</style>
        </div>
    );
}
