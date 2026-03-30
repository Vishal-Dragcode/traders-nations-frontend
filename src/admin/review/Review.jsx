import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Star, MessageSquare, User, Calendar, Activity, ShieldCheck, Search, Filter, Edit3, Check, X } from 'lucide-react';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import { API_URL } from "../../../config";

const ReviewDashboard = () => {
  const toast = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const RECORDS_PER_PAGE = 8;

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/reviews`);
      const result = await response.json();
      if (result.success) {
        setReviews(result.data.map(r => ({
          id: r._id,
          name: r.username,
          rating: r.rating,
          date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          avatar: r.username.charAt(0).toUpperCase(),
          avatarColor: "text-blue-400 bg-blue-500/10",
          text: r.review,
        })));
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.current.show({
        severity: 'error',
        summary: 'Link Failed',
        detail: 'Could not connect to the review database.',
        life: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: editingReview.name,
          review: editingReview.text,
          rating: editingReview.rating
        })
      });

      const result = await response.json();
      if (result.success) {
        setReviews(prev => prev.map(r => r.id === editingReview.id ? editingReview : r));
        setEditingReview(null);
        toast.current.show({
          severity: 'success',
          summary: 'Signal Updated',
          detail: 'Database record has been modified successfully.',
          life: 3000
        });
      }
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Update Failed',
        detail: 'System protocol error during modification.',
        life: 3000
      });
    }
  };

  // Function to handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`${API_URL}/api/reviews/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();

        if (result.success) {
          setReviews(prev => prev.filter(review => review.id !== id));
          toast.current.show({
            severity: 'success',
            summary: 'Review Purged',
            detail: 'The review has been successfully removed from the database.',
            life: 3000
          });
        }
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Purge Failed',
          detail: 'System could not execute the delete command.',
          life: 3000
        });
      }
    }
  };

  // Function to render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={`${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
          />
        ))}
      </div>
    );
  };

  // Dynamic performance metrics
  const satisfactionScore = reviews.length > 0
    ? ((reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length * 5)) * 100).toFixed(1)
    : "0.0";

  const totalPages = Math.ceil(reviews.length / RECORDS_PER_PAGE);
  const paginatedReviews = reviews.slice((currentPage - 1) * RECORDS_PER_PAGE, currentPage * RECORDS_PER_PAGE);

  return (
    <div className="space-y-4 animate-fade-in pb-4 font-inter">
      <Toast ref={toast} position="top-right" />
      {/* Header Area - Dynamic & Minimalist */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-0.5 ">
            Review <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-400">Intelligence</span>
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              <div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">Global Feedback</span>
            </div>
            <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-[1.5px]">Master Log / V2.1</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0">Satisfaction</p>
            <p className="text-[11px] font-mono font-bold text-amber-400">{satisfactionScore}% SCORE</p>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 select-none">
            <Activity size={10} className="text-blue-400" />
            <span className="text-[9px] font-black text-white uppercase tracking-tighter">Logs: {reviews.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/5 overflow-hidden shadow-2xl">
        {/* Table Top Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-2.5 border-b border-white/5 gap-2.5">
          <div className="relative group w-full sm:w-56">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="FILTER LOGS..."
              className="w-full bg-white/3 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-[9px] font-bold text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/20 transition-all uppercase tracking-widest"
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

        {/* Modern Table implementation */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2 border-b border-white/5">
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Source</th>
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Score</th>
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Date</th>
                <th className="px-4 py-2.5 text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Signal Preview</th>
                <th className="px-4 py-2.5 text-right text-[8px] font-black text-slate-600 uppercase tracking-[2px]">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedReviews.map((review) => (
                <tr key={review.id} className="group hover:bg-white/2 transition-all duration-300">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-black text-[9px] border border-white/5 ${review.avatarColor}`}>
                        {review.avatar}
                      </div>
                      <div>
                        <div className="text-[11px] font-black text-white tracking-tight">{review.name}</div>
                        <div className="text-[7px] font-bold text-slate-700 uppercase tracking-widest">ID {review.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="p-1 rounded bg-white/3 border border-white/5 inline-block group-hover:border-amber-500/10 transition-all">
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-slate-500">
                      <span className="text-[8px] font-black uppercase tracking-widest">{review.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-start gap-1.5 max-w-sm">
                      <div className="text-[9px] text-slate-400 font-bold group-hover:text-slate-200 transition-colors leading-relaxed line-clamp-1">
                        {review.text}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingReview(review)}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/5 border border-blue-500/10 text-[8px] font-black text-blue-500/60 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Edit3 size={10} />
                        Modify
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/5 border border-rose-500/10 text-[8px] font-black text-rose-500/60 uppercase tracking-widest hover:bg-rose-500 hover:text-white hover:opacity-100 transition-all"
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

        {reviews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/20">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 mb-4">
              <ShieldCheck size={32} strokeWidth={1} />
            </div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">No review logs detected in database</h3>
            <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mt-1">Standby for incoming signals...</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              Showing {(currentPage - 1) * RECORDS_PER_PAGE + 1}–{Math.min(currentPage * RECORDS_PER_PAGE, reviews.length)} of {reviews.length}
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
        visible={!!editingReview} 
        position="right" 
        onHide={() => setEditingReview(null)}
        className="w-full sm:w-1/2 border-l border-white/10 bg-[#0a0f1c]"
        maskClassName="backdrop-blur-md bg-black/40"
        style={{ background: '#0a0f1c', borderLeft: '1px solid rgba(255,255,255,0.1)' }}
        showCloseIcon={false}
      >
        <div className="flex flex-col h-full font-inter">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Edit3 size={18} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Signal Modification</h3>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Admin Protocol Active</p>
              </div>
            </div>
            <button onClick={() => setEditingReview(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <X size={16} className="text-slate-500 group-hover:text-white" />
            </button>
          </div>

          {editingReview && (
            <form onSubmit={handleUpdate} className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {/* Field: Identity */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Student Identity</label>
                  <span className="text-[7px] font-bold text-slate-700 uppercase tracking-tighter">ID: {editingReview.id}</span>
                </div>
                <div className="relative group">
                  <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500" />
                  <input 
                    type="text" 
                    value={editingReview.name}
                    onChange={(e) => setEditingReview({...editingReview, name: e.target.value})}
                    className="w-full bg-white/3 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-xs font-bold text-white focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-slate-700"
                    placeholder="ENTER FULL NAME..."
                    required
                  />
                </div>
              </div>

              {/* Field: Intel Score */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Intelligence Score (1-5)</label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button 
                      key={num}
                      type="button"
                      onClick={() => setEditingReview({...editingReview, rating: num})}
                      className={`py-3 rounded-xl border text-[11px] font-black transition-all ${editingReview.rating >= num ? 'bg-amber-500/20 border-amber-500/40 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-white/3 border-white/5 text-slate-600'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field: Transmission Data */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Transmission Data (Log)</label>
                <div className="relative group">
                  <MessageSquare size={12} className="absolute left-3 top-4 text-slate-600 group-focus-within:text-blue-500" />
                  <textarea 
                    rows={6}
                    value={editingReview.text}
                    onChange={(e) => setEditingReview({...editingReview, text: e.target.value})}
                    className="w-full bg-white/3 border border-white/10 rounded-xl py-4 pl-9 pr-4 text-[13px] font-medium text-slate-300 focus:outline-none focus:border-blue-500/30 transition-all resize-none leading-relaxed"
                    placeholder="ENTER LOG DETAILS..."
                    required
                  />
                </div>
              </div>

              {/* Action Vectors */}
              <div className="flex gap-3 pt-6 pb-6">
                <button 
                  type="button" 
                  onClick={() => setEditingReview(null)}
                  className="flex-1 py-2.5 rounded-lg border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-[2px] hover:bg-white/5 hover:text-slate-300 transition-all font-inter"
                >
                  Terminate
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 text-[9px] font-black text-white uppercase tracking-[2px] hover:bg-blue-500 shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 group font-inter"
                >
                  <Check size={10} className="group-hover:scale-125 transition-transform" />
                  Authorize Sync
                </button>
              </div>
            </form>
          )}
        </div>
      </Sidebar>

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        /* Hide PrimeReact sidebar default padding and focus */
        .p-sidebar .p-sidebar-content { padding: 0; height: 100%; }
        .p-sidebar { border: none !important; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ReviewDashboard;
