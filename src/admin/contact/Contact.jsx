import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Phone, 
  User, 
  Trash2, 
  ShieldCheck, 
  Activity, 
  Filter,
  Calendar,
  Eye,
  MessageSquare,
  CheckCircle2,
  X,
  Circle,
  Zap,
  Edit3,
  Save
} from 'lucide-react';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import { API_URL } from "../../../config";

function DashboardContact() {
  const toast = useRef(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingContact, setViewingContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const RECORDS_PER_PAGE = 8;

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setContacts(result.data.map(c => ({
          id: c._id,
          name: c.name,
          phone: c.mobile,
          email: c.email,
          message: c.message,
          isRead: c.isRead,
          date: new Date(c.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          time: new Date(c.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        })));
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.current.show({
        severity: 'error',
        summary: 'Sync Failed',
        detail: 'Could not retrieve communication logs from the server.',
        life: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );
  const totalPages = Math.ceil(filteredContacts.length / RECORDS_PER_PAGE);
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * RECORDS_PER_PAGE, currentPage * RECORDS_PER_PAGE);

  // Save edited contact via PUT API
  const handleSaveContact = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/contact/${viewingContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: viewingContact.name,
          mobile: viewingContact.phone,
          email: viewingContact.email,
          message: viewingContact.message
        })
      });
      const result = await response.json();
      if (result.success) {
        setContacts(prev => prev.map(c =>
          c.id === viewingContact.id ? { ...viewingContact } : c
        ));
        setIsEditing(false);
        toast.current.show({
          severity: 'success',
          summary: 'Signal Updated',
          detail: 'Contact record has been successfully modified.',
          life: 3000
        });
      }
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Sync Failed',
        detail: 'Could not commit changes to the database.',
        life: 3000
      });
    }
  };

  // Toggle read/unread
  const handleToggleRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/contact/${id}/isread`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        const updatedIsRead = result.data.isRead;
        setContacts(prev => prev.map(c =>
          c.id === id ? { ...c, isRead: updatedIsRead } : c
        ));
        if (viewingContact?.id === id) {
          setViewingContact(prev => ({ ...prev, isRead: updatedIsRead }));
        }
        toast.current.show({
          severity: 'success',
          summary: updatedIsRead ? 'Marked as Read' : 'Marked as Unread',
          detail: `Signal status has been updated.`,
          life: 2000
        });
      }
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Update Failed',
        detail: 'Could not update the read status.',
        life: 3000
      });
    }
  };

  // Function to handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to purge this communication log?")) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/contact/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        
        if (result.success) {
          setContacts(prev => prev.filter(contact => contact.id !== id));
          if (viewingContact?.id === id) setViewingContact(null);
          toast.current.show({
            severity: 'success',
            summary: 'Signal Purged',
            detail: 'Communication log has been successfully removed.',
            life: 3000
          });
        }
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Purge Failed',
          detail: 'System could not remove the contact record.',
          life: 3000
        });
      }
    }
  };

  const unreadCount = contacts.filter(c => !c.isRead).length;

  return (
    <div className="space-y-4 animate-fade-in pb-6 font-inter">
      <Toast ref={toast} position="top-right" />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-0.5">
            Contact <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400">Intelligence</span>
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Live Directory</span>
            </div>
            <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-[1.5px]">Communication Log / V1.5</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0">Unread Signals</p>
              <p className="text-[11px] font-mono font-bold text-amber-400">{unreadCount} PENDING</p>
            </div>
          )}
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 select-none">
            <Activity size={10} className="text-emerald-400" />
            <span className="text-[9px] font-black text-white uppercase tracking-tighter">Logs: {contacts.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/5 overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-2.5 border-b border-white/5 gap-2.5">
          <div className="relative group w-full sm:w-64">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH SIGNALS..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white/3 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-[9px] font-bold text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/20 transition-all uppercase tracking-widest"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/10 text-[8px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
              <Filter size={10} />
              Refine
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/10 text-[8px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
              Recent
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2 border-b border-white/5">
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Source</th>
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Communication</th>
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Signal Preview</th>
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Status</th>
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Date</th>
                <th className="px-4 py-2.5 text-right text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedContacts.map((contact) => (
                <tr key={contact.id} className={`group hover:bg-white/2 transition-all duration-300 ${!contact.isRead ? 'bg-emerald-500/3 border-l-2 border-l-emerald-500/30' : ''}`}>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <User size={14} />
                      </div>
                      <div>
                        <div className={`text-[11px] font-black tracking-tight ${!contact.isRead ? 'text-white' : 'text-slate-400'}`}>{contact.name}</div>
                        <div className="text-[7px] font-bold text-slate-700 uppercase tracking-widest leading-none mt-0.5">ID: {contact.id.slice(-8).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Phone size={9} className="text-blue-500" />
                        <span className="text-[9px] font-bold">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Mail size={9} className="text-purple-500" />
                        <span className="text-[9px] font-bold">{contact.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 max-w-[200px]">
                    <p className="text-[9px] text-slate-500 font-bold line-clamp-1 group-hover:text-slate-300 transition-colors">{contact.message}</p>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${contact.isRead ? 'bg-white/3 text-slate-600 border-white/5' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                      <div className={`w-1 h-1 rounded-full ${!contact.isRead ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                      {contact.isRead ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar size={9} className="text-blue-500" />
                      <span className="text-[8px] font-black uppercase tracking-widest">{contact.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setViewingContact(contact); setIsEditing(false); }}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/5 border border-blue-500/10 text-[8px] font-black text-blue-500/60 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Eye size={10} />
                        View
                      </button>
                      <button
                        onClick={() => { setViewingContact(contact); setIsEditing(true); }}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/5 border border-amber-500/10 text-[8px] font-black text-amber-500/60 uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all"
                      >
                        <Edit3 size={10} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/5 border border-rose-500/10 text-[8px] font-black text-rose-500/60 uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <Trash2 size={10} />
                        Purge
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/20">
            <ShieldCheck size={32} className="text-slate-700 mb-3" strokeWidth={1} />
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">No communication logs found</h3>
            <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mt-1">Awaiting incoming signals...</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              Showing {(currentPage - 1) * RECORDS_PER_PAGE + 1}–{Math.min(currentPage * RECORDS_PER_PAGE, filteredContacts.length)} of {filteredContacts.length}
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

      {/* Right-Side Intelligence Sidebar */}
      <Sidebar
        visible={!!viewingContact}
        position="right"
        onHide={() => { setViewingContact(null); setIsEditing(false); }}
        className="w-full sm:w-1/2 border-l border-white/10"
        maskClassName="backdrop-blur-md bg-black/40"
        style={{ background: '#0a0f1c', borderLeft: '1px solid rgba(255,255,255,0.1)' }}
        showCloseIcon={false}
      >
        {viewingContact && (
          <div className="flex flex-col h-full font-inter">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg ${isEditing ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                  {isEditing ? <Edit3 size={18} className="text-amber-500" /> : <Zap size={18} className="text-emerald-500" />}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">{isEditing ? 'Modify Protocol' : 'Signal Analysis'}</h3>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                    ID: {viewingContact.id.slice(-8).toUpperCase()}
                  </p>
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
                <button onClick={() => { setViewingContact(null); setIsEditing(false); }} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                  <X size={16} className="text-slate-500 group-hover:text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {/* Signal Status */}
              <div className="bg-white/3 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${viewingContact.isRead ? 'bg-white/5 text-slate-500 border-white/10' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${!viewingContact.isRead ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                    {viewingContact.isRead ? 'Signal Read' : 'New Unread Signal'}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleRead(viewingContact.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[8px] font-black uppercase tracking-widest transition-all ${viewingContact.isRead ? 'bg-white/3 border-white/10 text-slate-500 hover:bg-blue-600 hover:text-white hover:border-transparent' : 'bg-emerald-600 border-transparent text-white hover:bg-emerald-500'}`}
                >
                  {viewingContact.isRead ? <><Circle size={10} /> Mark Unread</> : <><CheckCircle2 size={10} /> Mark Read</>}
                </button>
              </div>

              {/* Identity Cluster */}
              <div className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5 bg-white/2">
                  <div className="p-1.5 rounded-lg bg-white/5 text-emerald-500">
                    <User size={12} />
                  </div>
                  <h3 className="text-[9px] font-black text-white uppercase tracking-[2px]">Source Identity</h3>
                </div>
                <div className="divide-y divide-white/5">
                  <div className="px-4 py-3">
                    <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-1">Full Name</span>
                    {isEditing ? (
                      <input value={viewingContact.name} onChange={e => setViewingContact({...viewingContact, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-[11px] text-white font-black focus:outline-none focus:border-amber-500/40" />
                    ) : (
                      <p className="text-[11px] text-white font-black">{viewingContact.name}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-white/5">
                    <div className="px-4 py-3">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-1">Mobile Link</span>
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <Phone size={10} className="text-blue-500 shrink-0" />
                          <input value={viewingContact.phone} onChange={e => setViewingContact({...viewingContact, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-[10px] text-slate-300 font-bold focus:outline-none focus:border-amber-500/40" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Phone size={10} className="text-blue-500" />
                          <p className="text-[10px] text-slate-300 font-bold">{viewingContact.phone}</p>
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-1">Transmission Mail</span>
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <Mail size={10} className="text-purple-500 shrink-0" />
                          <input value={viewingContact.email} onChange={e => setViewingContact({...viewingContact, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-[10px] text-slate-300 font-bold focus:outline-none focus:border-amber-500/40" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Mail size={10} className="text-purple-500" />
                          <p className="text-[10px] text-slate-300 font-bold break-all">{viewingContact.email}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest block mb-1">Signal Timestamp</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={10} className="text-blue-500" />
                      <p className="text-[10px] text-slate-300 font-bold">{viewingContact.date} — {viewingContact.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Cluster */}
              <div className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5 bg-white/2">
                  <div className="p-1.5 rounded-lg bg-white/5 text-blue-500">
                    <MessageSquare size={12} />
                  </div>
                  <h3 className="text-[9px] font-black text-white uppercase tracking-[2px]">Transmission Data</h3>
                </div>
                <div className="p-4">
                  {isEditing ? (
                    <textarea
                      rows={6}
                      value={viewingContact.message}
                      onChange={e => setViewingContact({...viewingContact, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-[12px] text-slate-300 font-medium leading-relaxed focus:outline-none focus:border-amber-500/40 resize-none"
                    />
                  ) : (
                    <p className="text-[12px] text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                      {viewingContact.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/5 bg-white/2 flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2.5 rounded-lg border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={11} />
                    Discard
                  </button>
                  <button
                    onClick={handleSaveContact}
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-[9px] font-black text-white uppercase tracking-widest hover:bg-emerald-500 shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={11} />
                    Commit Sync
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleDelete(viewingContact.id)}
                    className="flex-1 py-2.5 rounded-lg border border-rose-500/20 text-[9px] font-black text-rose-500/60 uppercase tracking-widest hover:bg-rose-600 hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={11} />
                    Purge Signal
                  </button>
                  <button
                    onClick={() => { setViewingContact(null); setIsEditing(false); }}
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
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
        .p-sidebar .p-sidebar-content { padding: 0; height: 100%; }
        .p-sidebar { border: none !important; }
      `}</style>
    </div>
  );
}

export default DashboardContact;
