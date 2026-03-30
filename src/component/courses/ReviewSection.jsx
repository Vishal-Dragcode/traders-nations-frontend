import React, { useState, useRef } from 'react';
import { useTheme } from '../../settings/ThemeContext';
import { Star, Quote, X, Send, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react';
import { API_URL } from '../../../config';
import { Toast } from 'primereact/toast';

const StarRating = ({ rating, setRating, interactive = false, size = 16 }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && setRating && setRating(star)}
                className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default group'}
            >
                <Star
                    size={size}
                    className={`transition-all duration-300 ${star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300 dark:text-gray-600'
                        }`}
                />
            </button>
        ))}
    </div>
);

const ReviewCard = ({ r, isDark }) => {
    const avatar = r.username ? r.username.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '??';
    const date = r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recent';
    const colors = ['from-blue-500/20 to-indigo-500/20', 'from-emerald-500/20 to-teal-500/20', 'from-amber-500/20 to-orange-500/20', 'from-red-500/20 to-rose-500/20'];
    const avatarColor = colors[Math.abs(r.username?.length || 0) % colors.length];

    return (
        <div className={`group relative flex flex-col md:flex-row gap-3 p-3 rounded-2xl border transition-all duration-500 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4
        ${isDark
                ? 'bg-white/3 border-white/5 hover:border-blue-500/30 hover:bg-white/5'
                : 'bg-white border-blue-50 hover:border-blue-100'
            }`} style={{ boxShadow: isDark ? '0 4px 20px -10px rgba(0,0,0,0.5)' : '0 4px 20px -10px rgba(0,0,0,0.05)' }}>

            {/* Author & Info Section */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-3 md:w-32 shrink-0 md:border-r md:border-white/5 md:pr-3">
                <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${avatarColor} border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:rotate-6
                ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                    <span className="text-[10px] font-bold">{avatar}</span>
                </div>
                <div className="min-w-0">
                    <h4 className={`text-[13px] font-bold truncate tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {r.username}
                    </h4>
                    <p className={`text-[9px] font-bold uppercase tracking-widest opacity-50 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {date}
                    </p>
                    <div className="mt-1.5">
                        <StarRating rating={r.rating} size={9} />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <Quote size={16} className={`mb-2 opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-[13px] leading-relaxed font-medium transition-colors duration-500 ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-900'}`}>
                    "{r.review}"
                </p>
            </div>

            {/* Floating Verified Badge */}
            <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border backdrop-blur-md
            ${isDark ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400/80' : 'border-emerald-100 bg-emerald-50 text-emerald-600'}`}>
                <CheckCircle size={8} className="fill-current/20" />
                Verified
            </div>
        </div>
    );
};

const RatingBreakdown = ({ reviews, isDark }) => {
    const counts = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
    }));

    return (
        <div className="space-y-3">
            {counts.map(({ star, count, percentage }) => (
                <div key={star} className="group flex items-center gap-4">
                    <div className="flex items-center gap-1.5 w-12 shrink-0">
                        <span className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{star}</span>
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                    </div>
                    <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                        <div
                            className="h-full bg-linear-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-1000 group-hover:brightness-125"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <span className={`text-[10px] font-bold w-8 text-right opacity-40 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {count}
                    </span>
                </div>
            ))}
        </div>
    );
};

const ReviewSection = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const toast = useRef(null);

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ name: '', rating: 5, text: '' });
    const [errors, setErrors] = useState({});
    const [visibleCount, setVisibleCount] = useState(5);

    // Fetch reviews from API
    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/reviews`);
            const result = await response.json();
            if (result.success) {
                setReviews(result.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchReviews();
    }, []);

    const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1)).toFixed(1);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!form.text.trim() || form.text.length < 10) e.text = 'Write a bit more about your journey';
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }

        setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: form.name.trim(),
                    review: form.text.trim(),
                    rating: form.rating
                })
            });

            const result = await response.json();

            if (result.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Review Submitted',
                    detail: 'Your success story has been posted successfully!',
                    life: 3000
                });
                fetchReviews();
                setShowModal(false);
                setForm({ name: '', rating: 5, text: '' });
                setErrors({});
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Submission Failed',
                    detail: result.error || "Failed to submit review",
                    life: 3000
                });
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Connection Error',
                detail: "Unable to reach the server",
                life: 3000
            });
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls = `w-full px-5 py-3 rounded-2xl text-sm border outline-none transition-all duration-300 ${isDark
        ? 'bg-black/40 border-white/5 text-white placeholder-gray-600 focus:border-blue-500/50'
        : 'bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-blue-400'
        }`;

    return (
        <section id="reviews" className="relative py-4 px-4 overflow-hidden font-inter" style={{ background: isDark ? '#000000' : '#f9fafb' }}>
            <Toast ref={toast} position="top-right" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── Header Area ── */}
                <div className="mb-6 text-center">
                    <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Student Achievement
                    </h2>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-[30%]">
                    <div className={`sticky top-24 p-3 rounded-3xl border transition-all duration-700
                            ${isDark
                            ? 'bg-white/3 border-white/5'
                            : 'bg-white border-blue-100'
                        }`} style={{ boxShadow: isDark ? '0 10px 40px -20px rgba(0,0,0,0.8)' : '0 10px 40px -20px rgba(0,0,0,0.1)' }}>

                        <div className="space-y-5">
                            {/* Large Rating */}
                            <div className="text-center space-y-0.5">
                                <div className={`text-5xl font-bold transition-transform duration-500 hover:scale-105 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {avgRating}
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <StarRating rating={Math.round(avgRating)} size={16} />
                                    <p className={`text-[8px] font-bold uppercase tracking-[0.2em] opacity-40 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {reviews.length} Verified Reviews
                                    </p>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <RatingBreakdown reviews={reviews} isDark={isDark} />

                            {/* CTA */}
                            <div className="space-y-3 pt-3 border-t border-white/5">
                                <div className="space-y-1.5 text-center">
                                    <p className={`text-xs font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Share your journey
                                    </p>
                                    <p className={`text-[10px] font-medium leading-relaxed opacity-50 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Help others start their trading journey.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowModal(true)}
                                    className="group relative w-full flex items-center justify-between h-12 pl-6 pr-1.5 rounded-xl transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden"
                                    style={{ background: '#2563EB', boxShadow: 'none' }}
                                >
                                    <span className="relative z-10 uppercase tracking-[1.5px] text-[10px] font-bold text-white">
                                        Write a Review
                                    </span>
                                    <div className="relative z-10 w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                                        <Send size={16} strokeWidth={2.5} />
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Reviews (70%) */}
                <div className="lg:w-[70%] space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 opacity-40">
                                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                                <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Fetching Success Stories...
                                </p>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 opacity-30 border-2 border-dashed border-white/10 rounded-3xl">
                                <Quote size={40} className="mb-4" />
                                <p className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    No reviews yet. Be the first!
                                </p>
                            </div>
                        ) : (
                            reviews.slice(0, visibleCount).map((r) => (
                                <ReviewCard key={r._id || r.id} r={r} isDark={isDark} />
                            ))
                        )}
                    </div>

                    {!loading && visibleCount < reviews.length && (
                        <div className="pt-4 flex justify-center">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 5)}
                                className={`group relative flex items-center h-12 pl-8 pr-1.5 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 border
                                    ${isDark
                                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
                                        : 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100'}`}
                            >
                                <span className="uppercase tracking-[2px] text-[10px] font-bold mr-6">
                                    Read More Reviews
                                </span >
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                                    <ArrowUpRight size={16} strokeWidth={2.5} />
                                </div>
                            </button >
                        </div >
                    )}
                </div >
            </div >

            {/* ── Write Review Modal ── */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl"
                    onClick={(e) => e.target === e.currentTarget && !submitting && setShowModal(false)}
                >
                    <div
                        className={`relative w-full max-w-lg rounded-4xl border overflow-hidden p-4 transition-all duration-700
                            ${isDark ? 'bg-black border-white/10' : 'bg-white border-blue-100'}`}
                        style={{ boxShadow: 'none' }}
                    >

                        <button
                            onClick={() => !submitting && setShowModal(false)}
                            className={`absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 hover:rotate-90
                                ${isDark ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}
                        >
                            <X size={18} />
                        </button>

                        <div className="mb-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3
                                ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                <TrendingUp size={11} />
                                Review Platform
                            </div>
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Inspire Others</h3>
                            <p className={`text-xs mt-2 font-medium leading-relaxed opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Share your honest experience with the academy. Your feedback helps us build a stronger community.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className={`block text-[9px] font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Experience Rating *</label>
                                <StarRating rating={form.rating} setRating={(v) => !submitting && setForm(f => ({ ...f, rating: v }))} interactive size={24} />
                            </div>

                            <div className="grid md:grid-cols-1 gap-4">
                                <div className="space-y-1">
                                    <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Full Name *</label>
                                    <input
                                        type="text"
                                        disabled={submitting}
                                        placeholder="e.g. Arjun Sharma"
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        className={inputCls}
                                    />
                                    {errors.name && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mt-2">{errors.name}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Your Experience *</label>
                                <textarea
                                    rows={5}
                                    disabled={submitting}
                                    placeholder="What was the highlight of your learning journey?"
                                    value={form.text}
                                    onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                                    className={`${inputCls} resize-none`}
                                />
                                <div className="flex justify-between items-center mt-2">
                                    {errors.text ? <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{errors.text}</p> : <span />}
                                    <p className={`text-[10px] font-bold tracking-widest opacity-40 ${isDark ? 'text-white' : 'text-gray-900'}`}>{form.text.length} chars</p>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className={`group relative w-full flex items-center justify-between h-14 pl-8 pr-2 rounded-2xl transition-all duration-500 overflow-hidden ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                                style={{ background: '#2563EB', boxShadow: 'none' }}
                            >
                                <span className="relative z-10 uppercase tracking-[2px] text-xs font-bold text-white">
                                    {submitting ? 'Publishing...' : 'Publish Review'}
                                </span>
                                <div className={`relative z-10 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white transition-transform duration-500 ${submitting ? 'animate-pulse' : 'group-hover:rotate-45'}`}>
                                    <Send size={18} strokeWidth={2.5} />
                                </div>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ReviewSection;
