import React, { useState, useRef } from "react";
import { Plus, Edit3, Trash2, Calendar, Clock, MapPin, Users, Zap, ArrowRight, ShieldCheck, X, Save, Trash } from "lucide-react";
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import EventData from "./EventData";

const DetailRow = ({ label, value, onChange, type = "text", textArea = false }) => (
    <div className="flex flex-col gap-1 px-4 py-3 border-b border-white/5 hover:bg-white/2 transition-colors group">
        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1 group-hover:text-slate-400 transition-colors">{label}</span>
        {textArea ? (
            <textarea 
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                rows={3}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-blue-500/40 w-full font-bold resize-none"
            />
        ) : (
            <input 
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-blue-500/40 w-full font-bold"
            />
        )}
    </div>
);

export default function EventRegister() {
    const toast = useRef(null);
    const [selectedEventLogs, setSelectedEventLogs] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null); 
    const [isAddMode, setIsAddMode] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = "http://localhost:5000/api";

    // 1. Fetch Events from Backend
    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/events`);
            const data = await res.json();
            if (data.success) {
                setEvents(data.data);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            toast.current?.show({ severity: 'error', summary: 'System Error', detail: 'Could not sync with central event terminal.', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchEvents();
    }, []);

    const handleOpenAdd = () => {
        setEditingEvent({
            title: "",
            description: "",
            date: "",
            time: "",
            location: "",
            slots: 50,
            price: "Free",
            status: "Upcoming"
        });
        setIsAddMode(true);
    };

    const handleOpenEdit = (event) => {
        setEditingEvent({ ...event });
        setIsAddMode(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
            try {
                const res = await fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE' });
                const data = await res.json();
                if (data.success) {
                    setEvents(events.filter(e => e._id !== id));
                    toast.current.show({
                        severity: 'info',
                        summary: 'Event Purged',
                        detail: 'The event session has been removed from terminal.',
                        life: 3000
                    });
                }
            } catch (err) {
                toast.current.show({ severity: 'error', summary: 'Deletion Failed', detail: 'Primary sequence error during deletion.' });
            }
        }
    };

    const handleSave = async () => {
        if (!editingEvent.title || !editingEvent.date) {
            toast.current.show({ severity: 'warn', summary: 'Input Required', detail: 'Title and Date are mandatory protocols.', life: 3000 });
            return;
        }

        try {
            const method = isAddMode ? 'POST' : 'PUT';
            const url = isAddMode ? `${API_BASE_URL}/events` : `${API_BASE_URL}/events/${editingEvent._id}`;
            
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingEvent)
            });
            const data = await res.json();

            if (data.success) {
                fetchEvents(); // Refresh data proper
                setEditingEvent(null);
                toast.current.show({
                    severity: 'success',
                    summary: isAddMode ? 'Event Initialized' : 'Record Adjusted',
                    detail: `The system signature for ${editingEvent.title} has been updated.`,
                    life: 3000
                });
            }
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Access Denied', detail: 'Failed to commit changes to the event core.' });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-8 font-inter">
            <Toast ref={toast} position="top-right" />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-0.5">
                        Event <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400">Management</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">System Ready</span>
                        </div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-[2px]">Orchestrate Live Sessions & Workshops</p>
                    </div>
                </div>
                
                <button 
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20 active:scale-95 group"
                >
                    <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span className="text-xs font-black uppercase tracking-widest">Create New Event</span>
                </button>
            </div>

             {/* Content Area */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {events.map((event) => (
                     <div key={event._id} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden group hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                         <div className="h-1 w-full bg-blue-600/50 group-hover:bg-blue-600 transition-colors" />
                         <div className="p-6">
                             <div className="flex justify-between items-start mb-4">
                                 <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                     <Zap size={18} />
                                 </div>
                                 <div className="flex gap-1">
                                     <button 
                                         onClick={() => handleOpenEdit(event)}
                                         className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                                     >
                                         <Edit3 size={14} />
                                     </button>
                                     <button 
                                         onClick={() => handleDelete(event._id)}
                                         className="p-2 rounded-lg bg-rose-500/5 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                                     >
                                         <Trash2 size={14} />
                                     </button>
                                 </div>
                             </div>

                             <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h3>
                             <p className="text-[11px] text-slate-500 leading-relaxed mb-6 line-clamp-2">{event.description || "Digital asset intake stream verified. Session protocols established."}</p>
                             
                             <div className="space-y-3 mb-6">
                                 {[
                                     { Icon: Calendar, label: event.date },
                                     { Icon: Clock, label: event.time || "TBD" },
                                     { Icon: MapPin, label: event.location },
                                     { Icon: Users, label: `${event.booked || 0} / ${event.slots || 0} Registered` },
                                 ].map((meta, idx) => (
                                     <div key={idx} className="flex items-center gap-2.5 text-slate-400">
                                         <meta.Icon size={12} className="text-blue-500/40" />
                                         <span className="text-[10px] font-bold truncate opacity-70 group-hover:opacity-100 transition-opacity">{meta.label}</span>
                                     </div>
                                 ))}
                             </div>

                             <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                 <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest border ${
                                     ['Upcoming', 'Ongoing'].includes(event.status)
                                     ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                     : 'bg-white/5 text-slate-500 border-white/10'
                                 }`}>
                                     {event.status}
                                 </span>
                                 <button 
                                     onClick={() => setSelectedEventLogs(event)}
                                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/5 text-blue-500 hover:bg-blue-500 hover:text-white transition-all group/btn"
                                 >
                                     <div className="w-1 h-1 rounded-full bg-blue-500 group-hover/btn:bg-white" />
                                     <span className="text-[9px] font-black uppercase tracking-tight">View Register</span>
                                 </button>
                             </div>
                         </div>
                     </div>
                 ))}
                
                {/* Empty Slot */}
                <div 
                    onClick={handleOpenAdd}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-white/10 bg-white/2 hover:bg-white/3 hover:border-white/20 transition-all cursor-pointer group px-10"
                >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus size={20} className="text-slate-600 group-hover:text-white" />
                    </div>
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest group-hover:text-white transition-colors">Register New Cluster</span>
                </div>
            </div>

            {/* Side Intelligence Modal - Create/Edit */}
            <Sidebar 
                visible={!!editingEvent} 
                position="right" 
                onHide={() => setEditingEvent(null)}
                className="w-full sm:w-[450px] border-l border-white/10 bg-[#0a0f1c]"
                maskClassName="backdrop-blur-md bg-black/40"
                style={{ background: '#0a0f1c', borderLeft: '1px solid rgba(255,255,255,0.1)' }}
                showCloseIcon={false}
            >
                {editingEvent && (
                    <div className="flex flex-col h-full font-inter">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg ${isAddMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                    {isAddMode ? <Plus size={18} className="text-blue-500" strokeWidth={3} /> : <Edit3 size={18} className="text-amber-500" />}
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">{isAddMode ? 'Initialize Cluster' : 'Modify Signature'}</h3>
                                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Event Configuration Matrix</p>
                                </div>
                            </div>
                            <button onClick={() => setEditingEvent(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                                <X size={16} className="text-slate-500 group-hover:text-white" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
                                <DetailRow label="Event Title" value={editingEvent.title} onChange={(val) => setEditingEvent({...editingEvent, title: val})} />
                                <DetailRow label="Session Description" value={editingEvent.description} onChange={(val) => setEditingEvent({...editingEvent, description: val})} textArea />
                                <div className="grid grid-cols-2 divide-x divide-white/5">
                                    <DetailRow label="Operational Date" value={editingEvent.date} onChange={(val) => setEditingEvent({...editingEvent, date: val})} type="date" />
                                    <DetailRow label="Time Window" value={editingEvent.time} onChange={(val) => setEditingEvent({...editingEvent, time: val})} placeholder="10:00 AM - 1:00 PM" />
                                </div>
                                <DetailRow label="Geographic / Virtual Link" value={editingEvent.location} onChange={(val) => setEditingEvent({...editingEvent, location: val})} />
                                <div className="grid grid-cols-2 divide-x divide-white/5">
                                    <DetailRow label="Available Slots" value={editingEvent.slots} onChange={(val) => setEditingEvent({...editingEvent, slots: parseInt(val) || 0})} type="number" />
                                    <DetailRow label="Entry Fee / Pricing" value={editingEvent.price} onChange={(val) => setEditingEvent({...editingEvent, price: val})} placeholder="Free" />
                                </div>
                            </div>

                            <div className="bg-white/3 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target Status</span>
                                <div className="flex gap-2">
                                    {['Active', 'Upcoming'].map(s => (
                                        <button 
                                            key={s}
                                            onClick={() => setEditingEvent({...editingEvent, status: s})}
                                            className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase transition-all ${editingEvent.status === s ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-600 hover:text-white'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-white/5 bg-white/2 flex gap-3">
                            <button 
                                onClick={() => setEditingEvent(null)}
                                className="flex-1 py-3 rounded-xl border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                            >
                                <X size={12} strokeWidth={3} />
                                Discard Changes
                            </button>
                            <button 
                                onClick={handleSave}
                                className="flex-1 py-3 rounded-xl bg-blue-600 text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={12} strokeWidth={3} />
                                {isAddMode ? 'Sync Cluster' : 'Commit Mod'}
                            </button>
                        </div>
                    </div>
                )}
            </Sidebar>

            {/* Proper Model - View Registrations */}
            <Dialog 
                header={null}
                visible={!!selectedEventLogs} 
                onHide={() => setSelectedEventLogs(null)}
                className="w-[95%] sm:w-[80%] max-w-5xl rounded-3xl"
                maskClassName="backdrop-blur-xl bg-black/60"
                contentStyle={{ background: '#0a0f1c', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)', padding: '0' }}
                showCloseIcon={false}
            >
                {selectedEventLogs && (
                    <div className="flex flex-col h-full font-inter p-2 sm:p-3">
                        {/* Premium Header - Scaled Down for Professional Look */}
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/2 rounded-t-[24px]">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-blue-500/30 bg-linear-to-br from-blue-600/20 to-indigo-600/10 shadow-[0_5px_15px_rgba(37,99,235,0.1)] text-blue-400 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                                    <Users size={20} strokeWidth={2.5} className="relative z-10" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none mb-1">Registration <span className="text-blue-500">Repository</span></h3>
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex items-center gap-1.2 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                                            <div className="w-1.2 h-1.2 rounded-full bg-blue-500 animate-bounce" />
                                            <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none">Live Sync</span>
                                        </div>
                                        <div className="w-px h-2.5 bg-white/10" />
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{selectedEventLogs.title}</p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedEventLogs(null)} 
                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-rose-500/10 rounded-xl transition-all group border border-white/5 hover:border-rose-500/20"
                            >
                                <X size={22} className="text-slate-500 group-hover:text-rose-500 group-hover:rotate-90 transition-all duration-300" />
                            </button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                            <EventData onBack={() => setSelectedEventLogs(null)} event={selectedEventLogs} isModal />
                        </div>
                    </div>
                )}
            </Dialog>

            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                /* Sidebar fix */
                .p-sidebar .p-sidebar-content { padding: 0; height: 100%; }
                .p-sidebar { border: none !important; }

                /* Proper Scrollbar Hiding */
                ::-webkit-scrollbar {
                  display: none;
                }
                * {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
