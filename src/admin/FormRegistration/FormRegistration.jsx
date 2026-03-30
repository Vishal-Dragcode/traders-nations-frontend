import React, { useState, useRef, useEffect } from "react";
import {
    Users, Search, Filter, Calendar, ChevronRight,
    CheckCircle2, Clock, XCircle, MoreVertical,
    Download, Printer, Share2,
    User, BookOpen, MapPin, Phone, Mail, GraduationCap, Briefcase,
    TrendingUp, Award, Layers, Sparkles, Check, ChevronDown, Monitor,
    Activity, Zap, ShieldCheck, Edit3, X, Eye, Save
} from 'lucide-react';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const StatusBadge = ({ status }) => {
    const styles = {
        Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Pending: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };
    const Icons = {
        Approved: CheckCircle2,
        Pending: Clock,
        Rejected: XCircle,
    };
    const Icon = Icons[status] || Clock;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${styles[status] || styles.Pending}`}>
            <Icon size={10} />
            {status}
        </span>
    );
};

const SectionHeader = ({ icon: Icon, title, colorClass }) => (
    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5 bg-white/2">
        <div className={`p-1.5 rounded-lg bg-white/5 ${colorClass}`}>
            <Icon size={12} />
        </div>
        <h3 className="text-[9px] font-black text-white uppercase tracking-[2px]">{title}</h3>
    </div>
);

const DetailRow = ({ label, value, isLast, editable, onChange, type = "text" }) => (
    <div className={`flex flex-col gap-0.5 px-4 py-2.5 ${!isLast ? "border-b border-white/5" : ""} hover:bg-white/1 transition-colors group`}>
        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">{label}</span>
        {editable ? (
            <input 
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-blue-500/40 w-full font-bold"
            />
        ) : (
            <p className="text-[10px] text-slate-300 font-bold group-hover:text-white transition-colors wrap-break-word">
                {value || "—"}
            </p>
        )}
    </div>
);

export default function EnrollmentTable() {
    const toast = useRef(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewingRecord, setViewingRecord] = useState(null);
    const [filterStatus, setFilterStatus] = useState("All");
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const RECORDS_PER_PAGE = 8;

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/enroll`);
            const result = await response.json();
            if (result.success) {
                const mappedData = result.data.map(r => ({
                    id: r._id,
                    dbId: r._id,
                    date: new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                    enrollmentId: r._id.slice(-8).toUpperCase(),
                    status: (r.status || 'pending').charAt(0).toUpperCase() + (r.status || 'pending').slice(1).toLowerCase(),
                    fullName: r.fullName,
                    email: r.email,
                    contact: r.contactNo,
                    course: r.courseEnrolled,
                    dob: r.dob ? r.dob.split('T')[0] : "",
                    age: r.age,
                    qualification: r.qualification,
                    occupation: r.occupation,
                    address1: r.address1,
                    address2: r.address2,
                    emergencyName: r.emergencyContact?.name,
                    emergencyContact: r.emergencyContact?.contactNo,
                    modeOfClass: r.modeOfClass,
                    batchTiming: r.batchTiming,
                    experience: r.experience,
                }));
                setRecords(mappedData);
            }
        } catch (error) {
            console.error("Error fetching enrollments:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Link Failed',
                detail: 'Could not connect to enrollment database.',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const updateStatus = async (newStatus) => {
        if (!viewingRecord) return;
        try {
            const response = await fetch(`${API_URL}/api/enroll/${viewingRecord.dbId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus.toLowerCase() })
            });
            const result = await response.json();
            
            if (result.success) {
                setRecords(prev => prev.map(rec =>
                    rec.id === viewingRecord.id ? { ...rec, status: newStatus } : rec
                ));
                setViewingRecord(prev => ({ ...prev, status: newStatus }));
                toast.current.show({
                    severity: 'success',
                    summary: 'Status Modified',
                    detail: `Enrollment status updated to ${newStatus}`,
                    life: 3000
                });
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Sync Failed',
                detail: 'Could not update status on central server.',
                life: 3000
            });
        }
    };

    const handleSaveDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/api/enroll/${viewingRecord.dbId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: viewingRecord.fullName,
                    email: viewingRecord.email,
                    contactNo: viewingRecord.contact,
                    dob: viewingRecord.dob,
                    age: viewingRecord.age,
                    qualification: viewingRecord.qualification,
                    occupation: viewingRecord.occupation,
                    address1: viewingRecord.address1,
                    address2: viewingRecord.address2,
                    emergencyContact: {
                        name: viewingRecord.emergencyName,
                        contactNo: viewingRecord.emergencyContact
                    },
                    courseEnrolled: viewingRecord.course,
                    modeOfClass: viewingRecord.modeOfClass,
                    batchTiming: viewingRecord.batchTiming,
                    experience: viewingRecord.experience
                })
            });
            const result = await response.json();
            
            if (result.success) {
                setRecords(prev => prev.map(rec =>
                    rec.id === viewingRecord.id ? { ...viewingRecord } : rec
                ));
                setIsEditing(false);
                toast.current.show({
                    severity: 'success',
                    summary: 'Record Synced',
                    detail: 'Student information has been successfully modified.',
                    life: 3000
                });
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Modification Failed',
                detail: 'Could not commit changes to the database.',
                life: 3000
            });
        }
    };

    const filteredRecords = records.filter(r => filterStatus === "All" || r.status === filterStatus);
    const totalPages = Math.ceil(filteredRecords.length / RECORDS_PER_PAGE);
    const paginatedRecords = filteredRecords.slice((currentPage - 1) * RECORDS_PER_PAGE, currentPage * RECORDS_PER_PAGE);

    return (
        <div className="space-y-4 animate-fade-in pb-4 font-inter">
            <Toast ref={toast} position="top-right" />
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-0.5 ">
                        Registration <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400">Terminal</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Active Intake</span>
                        </div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-[1.5px]">Student Log / V4.0</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0">Total Enrolled</p>
                        <p className="text-[11px] font-mono font-bold text-blue-400">{records.length} RECORDS</p>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 select-none">
                        <Activity size={10} className="text-emerald-400" />
                        <span className="text-[9px] font-black text-white uppercase tracking-tighter">Live Signals</span>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between p-2.5 border-b border-white/5 gap-2.5">
                    <div className="flex p-1 bg-[#12192b] rounded-lg border border-white/5">
                        {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
                                className={`px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:text-white'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="relative group w-full sm:w-56">
                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="SEARCH TERMINAL..." 
                            className="w-full bg-white/3 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-[9px] font-bold text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/20 transition-all uppercase tracking-widest"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar border-t border-white/5">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/2 border-b border-white/5">
                                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Student Source</th>
                                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Package</th>
                                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Status</th>
                                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Date</th>
                                <th className="px-4 py-2.5 text-right text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Ops</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedRecords.map((record) => (
                                <tr key={record.id} className="group hover:bg-white/2 transition-all duration-300">
                                    <td className="px-4 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-black text-[9px] text-blue-400">
                                                {record.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-[11px] font-black text-white tracking-tight">{record.fullName}</div>
                                                <div className="text-[7px] font-bold text-slate-700 uppercase tracking-widest leading-none mt-0.5">{record.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-300">{record.course}</span>
                                            <span className="text-[8px] font-black text-slate-700 uppercase tracking-tighter">{record.enrollmentId}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <StatusBadge status={record.status} />
                                    </td>
                                    <td className="px-4 py-2.5">
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{record.date}</span>
                                    </td>
                                    <td className="px-4 py-2.5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => { setViewingRecord(record); setIsEditing(false); }}
                                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/5 border border-blue-500/10 text-[8px] font-black text-blue-500/60 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                            >
                                                <Eye size={10} />
                                                View
                                            </button>
                                            <button 
                                                onClick={() => { setViewingRecord(record); setIsEditing(true); }}
                                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/5 border border-amber-500/10 text-[8px] font-black text-amber-500/60 uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                                            >
                                                <Edit3 size={10} />
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredRecords.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-900/20">
                        <Users size={32} className="text-slate-700 mb-3" strokeWidth={1} />
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">No matching logs in terminal</h3>
                        <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mt-1">Check filter protocols...</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                            Showing {(currentPage - 1) * RECORDS_PER_PAGE + 1}–{Math.min(currentPage * RECORDS_PER_PAGE, filteredRecords.length)} of {filteredRecords.length}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all border ${
                                    currentPage === 1
                                        ? 'text-slate-700 border-white/5 cursor-not-allowed'
                                        : 'text-slate-400 border-white/10 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-7 h-7 rounded-md text-[9px] font-black transition-all ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                            : 'text-slate-500 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all border ${
                                    currentPage === totalPages
                                        ? 'text-slate-700 border-white/5 cursor-not-allowed'
                                        : 'text-slate-400 border-white/10 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side Intelligence Sidebar */}
            <Sidebar 
                visible={!!viewingRecord} 
                position="right" 
                onHide={() => { setViewingRecord(null); setIsEditing(false); }}
                className="w-full sm:w-1/2 border-l border-white/10 bg-[#0a0f1c]"
                maskClassName="backdrop-blur-md bg-black/40"
                style={{ background: '#0a0f1c', borderLeft: '1px solid rgba(255,255,255,0.1)' }}
                showCloseIcon={false}
            >
                {viewingRecord && (
                    <div className="flex flex-col h-full font-inter">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg ${isEditing ? 'bg-amber-500/10 border-amber-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                                    {isEditing ? <Edit3 size={18} className="text-amber-500" /> : <Zap size={18} className="text-blue-500" />}
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">{isEditing ? 'Modify Protocol' : 'Signal Analysis'}</h3>
                                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">UID: {viewingRecord.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!isEditing && (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white transition-all"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                )}
                                <button onClick={() => { setViewingRecord(null); setIsEditing(false); }} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                                    <X size={16} className="text-slate-500 group-hover:text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                            {/* Enrollment Status Control */}
                            <div className="bg-white/3 border border-white/5 p-4 rounded-2xl space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Operational Protocol</span>
                                    <StatusBadge status={viewingRecord.status} />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'Pending', icon: Clock, color: 'hover:bg-blue-500 hover:text-white', active: 'bg-blue-600 text-white' },
                                        { label: 'Approved', icon: CheckCircle2, color: 'hover:bg-emerald-500 hover:text-white', active: 'bg-emerald-600 text-white' },
                                        { label: 'Rejected', icon: XCircle, color: 'hover:bg-rose-500 hover:text-white', active: 'bg-rose-600 text-white' }
                                    ].map((btn) => (
                                        <button
                                            key={btn.label}
                                            onClick={() => updateStatus(btn.label)}
                                            className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border border-white/5 text-[8px] font-black uppercase tracking-widest transition-all ${viewingRecord.status === btn.label ? btn.active : 'bg-white/2 text-slate-500 ' + btn.color}`}
                                        >
                                            <btn.icon size={12} />
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Data Clusters */}
                            <div className="space-y-4">
                                <div className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
                                    <SectionHeader icon={User} title="Core Identity" colorClass="text-blue-500" />
                                    <div className="grid grid-cols-2 divide-x divide-white/5">
                                        <DetailRow label="Name Alias" value={viewingRecord.fullName} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, fullName: val})} />
                                        <DetailRow label="Age Data" value={viewingRecord.age} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, age: val})} type="number" />
                                    </div>
                                    <DetailRow label="Birth Signature" value={viewingRecord.dob} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, dob: val})} type="date" />
                                    <DetailRow label="Contact Link" value={viewingRecord.contact} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, contact: val})} />
                                    <DetailRow label="Transmission Mail" value={viewingRecord.email} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, email: val})} />
                                    <DetailRow label="Primary Origin" value={viewingRecord.address1} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, address1: val})} />
                                    <DetailRow label="Secondary Origin" value={viewingRecord.address2} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, address2: val})} isLast />
                                </div>

                                <div className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
                                    <SectionHeader icon={Layers} title="Program Vectors" colorClass="text-purple-500" />
                                    <DetailRow label="Assigned Course" value={viewingRecord.course} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, course: val})} />
                                    <div className="grid grid-cols-2 divide-x divide-white/5">
                                        <DetailRow label="Time Slot" value={viewingRecord.batchTiming} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, batchTiming: val})} />
                                        <DetailRow label="Experience" value={viewingRecord.experience} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, experience: val})} />
                                    </div>
                                    <DetailRow label="Class Protocol" value={viewingRecord.modeOfClass} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, modeOfClass: val})} isLast />
                                </div>

                                <div className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
                                    <SectionHeader icon={GraduationCap} title="Qualification Log" colorClass="text-emerald-500" />
                                    <DetailRow label="Highest Degree" value={viewingRecord.qualification} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, qualification: val})} />
                                    <DetailRow label="Active Occupation" value={viewingRecord.occupation} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, occupation: val})} isLast />
                                </div>

                                <div className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
                                    <SectionHeader icon={Phone} title="Emergency Signal" colorClass="text-rose-500" />
                                    <div className="grid grid-cols-2 divide-x divide-white/5">
                                        <DetailRow label="Guardian Name" value={viewingRecord.emergencyName} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, emergencyName: val})} />
                                        <DetailRow label="Guardian Link" value={viewingRecord.emergencyContact} editable={isEditing} onChange={(val) => setViewingRecord({...viewingRecord, emergencyContact: val})} isLast />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="p-4 border-t border-white/5 bg-white/2 flex gap-3">
                            {isEditing ? (
                                <>
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-2.5 rounded-lg border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                    >
                                        <X size={12} />
                                        Discard
                                    </button>
                                    <button 
                                        onClick={handleSaveDetails}
                                        className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-[9px] font-black text-white uppercase tracking-widest hover:bg-emerald-500 shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save size={12} />
                                        Commit Sync
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => window.print()} 
                                        className="flex-1 py-2.5 rounded-lg border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Printer size={12} />
                                        Print
                                    </button>
                                    <button 
                                        onClick={() => setViewingRecord(null)}
                                        className="flex-1 py-2.5 rounded-lg bg-blue-600 text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-500 shadow-xl transition-all"
                                    >
                                        Terminate
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Sidebar>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                /* Sidebar fix */
                .p-sidebar .p-sidebar-content { padding: 0; height: 100%; }
                .p-sidebar { border: none !important; }
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
            `}</style>
        </div>
    );
}
