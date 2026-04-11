import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../settings/ThemeContext";
import { Calendar, Clock, MapPin, Users, ArrowUpRight, Zap, Mic, BookOpen, TrendingUp, X, User, Phone, Mail, CheckCircle2 } from "lucide-react";
import { Toast } from 'primereact/toast';
import { API_URL } from "../../../config";

const RegistrationModal = ({ event, onClose, onSubmit }) => {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Guard: event must have a valid _id before hitting the API
    if (!event?._id) {
      console.error("[REGISTER] Event ID is missing — cannot register.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Use dedicated endpoint: eventId is locked in the URL, never undefined
      const res = await fetch(`${API_URL}/api/events/${event._id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName:  formData.name,
          contactNo: formData.mobile,
          email:     formData.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        onSubmit(formData);
        onClose();
      } else {
        // Surface the backend error message to the user
        setError(data.error || "Registration failed. Please try again.");
        console.error("[REGISTER] Submission failed:", data.error);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error("[REGISTER] Network Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-[380px] rounded-2xl overflow-hidden border shadow-xl animate-zoom-in"
        style={{ 
          background: colors.background,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
        }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-colors z-10"
          style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-7">
          <div className="mb-6">
            <h3 className="text-lg font-black" style={{ color: colors.text }}>Register for Event</h3>
            <p className="text-xs opacity-50 mt-1" style={{ color: colors.text }}>{event.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold opacity-40 ml-1" style={{ color: colors.text }}>Full Name</label>
              <div className="relative group">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" style={{ color: colors.text }} />
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border outline-none text-sm transition-all duration-300"
                  style={{ 
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    color: colors.text
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold opacity-40 ml-1" style={{ color: colors.text }}>Mobile Number</label>
              <div className="relative group">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" style={{ color: colors.text }} />
                <input
                  required
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border outline-none text-sm transition-all duration-300"
                  style={{ 
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    color: colors.text
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold opacity-40 ml-1" style={{ color: colors.text }}>Email Address</label>
              <div className="relative group">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" style={{ color: colors.text }} />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border outline-none text-sm transition-all duration-300"
                  style={{ 
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    color: colors.text
                  }}
                />
              </div>
            </div>

            {error && (
              <p className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => setError("")}
              className="w-full h-11 rounded-xl bg-[#A5B4FC] text-[#050810] font-bold text-xs uppercase tracking-[1px] mt-2 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-[#050810]/30 border-t-[#050810] rounded-full animate-spin" />
              ) : (
                <>
                  Register Now
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-[9px] text-center opacity-40 leading-relaxed" style={{ color: colors.text }}>
            Seats for <span className="font-bold underline">{event.title}</span> are filling fast.
          </p>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onRegister }) => {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const isPast = event.tag === "past";

  return (
    <div
      className="group relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
        boxShadow: isDark
          ? "0 0 0 1px rgba(255,255,255,0.04)"
          : "0 2px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div className="p-6 sm:p-8">
        {/* Title */}
        <h3
          className="text-lg sm:text-xl font-bold mb-3 leading-snug"
          style={{ color: isPast ? (isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)") : colors.text }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm mb-6 leading-relaxed opacity-60"
          style={{ color: colors.text }}
        >
          {event.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-3 mb-8">
          {[
            { Icon: Calendar, label: event.date },
            { Icon: Clock, label: event.time || "TBD" },
            { Icon: MapPin, label: event.location },
            { Icon: Users, label: `${event.booked || 0} / ${event.slots || 0} Booked` },
          ].map(({ Icon: MetaIcon, label }, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 border border-white/5">
                <MetaIcon size={14} className="opacity-40" style={{ color: colors.text }} />
              </div>
              <span className="text-xs font-medium opacity-50" style={{ color: colors.text }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {!isPast ? (
          <button
            onClick={() => onRegister(event)}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl font-black text-xs uppercase tracking-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/10"
            style={{
              background: "#A5B4FC",
              color: "#050810",
            }}
          >
            Register Now
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="w-full flex items-center justify-center h-12 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ color: colors.text }}>
            Event Completed
          </div>
        )}
      </div>
    </div>
  );
};

const Events = () => {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/events`);
        const data = await res.json();
        if (data.success) {
            // Map backend status to frontend tags Proper
            const mapped = data.data.map(e => ({
                ...e,
                tag: (e.status === 'Completed' || e.status === 'Cancelled') ? 'past' : 'upcoming'
            }));
            setEvents(mapped);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = events.filter((e) => e.tag === activeTab);

  const handleRegisterSubmit = (data) => {
    toast.current.show({
      severity: 'success',
      summary: 'Registration Successful',
      detail: `You have successfully registered for ${selectedEvent.title}. Sequence Protocol Initialized.`,
      life: 5000
    });
  };

  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <Toast ref={toast} position="top-right" />
      
      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-8 overflow-hidden">
        {/* background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(165,180,252,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(165,180,252,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Live Events &{' '}
              <span style={{ color: '#A5B4FC' }}>
                Workshops
              </span>
            </h2>
            <p className={`text-xs md:text-sm max-w-xl mx-auto font-medium mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Learn from the Best Traders. Join live workshops, webinars, and trading sessions hosted by industry professionals. Level up your trading game with hands-on learning.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 sm:px-8 pb-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="inline-flex rounded-full border p-1 gap-1"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            }}
          >
            {["upcoming", "past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[1.5px] transition-all duration-300"
                style={{
                  background:
                    activeTab === tab
                      ? "#A5B4FC"
                      : "transparent",
                  color:
                    activeTab === tab
                      ? "#050810"
                      : isDark
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.4)",
                }}
              >
                {tab === "upcoming" ? "Upcoming" : "Past Events"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>
                No events found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <EventCard key={event._id} event={event} onRegister={(ev) => setSelectedEvent(ev)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <RegistrationModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
          onSubmit={handleRegisterSubmit} 
        />
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Events;
