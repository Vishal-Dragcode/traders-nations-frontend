import { useState, useRef } from "react";
import { useTheme } from "../../settings/ThemeContext";
import { API_URL } from "../../../config";
import { Toast } from 'primereact/toast';

export default function ContactUs() {
    const toast = useRef(null);
    const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const { theme, colors } = useTheme();
    const isDark = theme === 'dark';

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.mobile || !form.email || !form.message) {
            toast.current.show({
                severity: 'warn',
                summary: 'Required Fields',
                detail: 'Please fill out all the fields.',
                life: 3000
            });
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const result = await response.json();
            if (result.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Your message has been sent successfully. We will call you soon!',
                    life: 5000
                });
                setForm({ name: "", mobile: "", email: "", message: "" });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Submission Failed',
                    detail: result.error || 'Something went wrong.',
                    life: 3000
                });
            }
        } catch (error) {
            console.error("Error sending contact request:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Server Error',
                detail: 'Could not connect to the server.',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const socials = ["LN", "TL", "IN", "FB", "TW"];

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-6 py-24 sm:py-32 gap-12 overflow-hidden relative transition-colors duration-500"
            style={{ backgroundColor: colors.background }}
        >
            <Toast ref={toast} position="top-right" />
            <style>{`
        .glass-card {
          background: ${isDark ? colors.background : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${colors.border};
          box-shadow: none;
        }

        .input-field {
          background: ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
          transition: all 0.3s ease;
        }

        .input-field:focus-within {
          border-color: rgba(165, 180, 252, 0.3);
          background: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
          box-shadow: none;
        }

        .social-pill {
          background: ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          transition: all 0.3s ease;
        }

        .social-pill:hover {
          background: rgba(165, 180, 252, 0.1);
          border-color: rgba(165, 180, 252, 0.4);
          transform: translateY(-2px);
          color: #A5B4FC;
        }
      `}</style>

            {/* ── SECTION HEADING ── */}
            <div className="text-center z-10 animate-fade-in">
                <h2 className="text-3xl sm:text-3xl font-black uppercase tracking-widest mb-4"
                    style={{ color: colors.text }}>
                    Contact
                </h2>
            </div>

            {/* ── CONTENT CONTAINER ── */}
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl z-10 font-inter">

                {/* ── LEFT CARD (INFO) ── */}
                <div className="flex-[1.2] glass-card rounded-[32px] p-8 sm:p-12 flex flex-col justify-between min-h-[450px]">

                    <div>
                        <h1 className="text-[32px] sm:text-[42px] font-bold uppercase leading-[1.1] tracking-tight mb-16"
                            style={{ color: colors.text }}>
                            TRADER<br />
                            NATION<br />
                            GROUP
                        </h1>

                        <div className="flex flex-col gap-8 self-end max-w-md ml-auto text-right">
                            {/* Phone Row */}
                            <div className="flex items-center justify-end gap-12">
                                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                                    PHONE
                                </span>
                                <span className="text-base sm:text-lg font-medium"
                                    style={{ color: isDark ? 'rgba(255,255,255,0.9)' : colors.text }}>
                                    +91 70836 84525
                                </span>
                            </div>

                            {/* Email Row */}
                            <div className="flex items-center justify-end gap-12">
                                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                                    EMAIL
                                </span>
                                <span className="text-base sm:text-lg font-medium lowercase"
                                    style={{ color: isDark ? 'rgba(255,255,255,0.9)' : colors.text }}>
                                    Tradersnationacadamy@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Socials at bottom right */}
                    <div className="flex items-center justify-end gap-3 mt-12">
                        {socials.map((s) => (
                            <a
                                key={s}
                                href="#"
                                className={`social-pill w-11 h-11 rounded-full flex items-center justify-center
                           text-[11px] font-bold tracking-widest no-underline ${isDark ? 'text-white/40' : 'text-gray-500'}`}
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT CARD (FORM) ── */}
                <div className="flex-1 glass-card rounded-[32px] p-8 sm:p-10 flex flex-col">

                    <div className="mb-10">
                        <h2 className="text-[18px] font-bold uppercase tracking-[0.15em] mb-2"
                            style={{ color: colors.text }}>
                            Request a Call
                        </h2>
                        <p className={`text-[13px] leading-relaxed ${isDark ? 'text-white/30' : 'text-gray-500'}`}>
                            Fill out the application form and<br />
                            we will call you back
                        </p>
                    </div>

                    <div className="space-y-4 mb-10">
                        {/* Name Input */}
                        <div className="input-field rounded-2xl px-6 py-4">
                            <input
                                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-500"
                                style={{ color: colors.text }}
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="input-field rounded-2xl px-6 py-4">
                            <input
                                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-500"
                                style={{ color: colors.text }}
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={form.mobile}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="input-field rounded-2xl px-6 py-4">
                            <input
                                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-500"
                                style={{ color: colors.text }}
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Message Input */}
                        <div className="input-field rounded-2xl px-6 py-4">
                            <textarea
                                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-500 resize-none"
                                style={{ color: colors.text }}
                                name="message"
                                rows={2}
                                placeholder="How can we help you?"
                                value={form.message}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* SEND REQUEST BUTTON */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`group relative flex items-center justify-between w-full h-14 pl-8 pr-2 rounded-full transition-all duration-500 hover:scale-[1.01] active:scale-95 border mt-auto
                            ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100'}
                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className=" uppercase tracking-[2px] text-xs font-bold">
                            {loading ? 'Sending...' : 'Send Request'}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-45 ${isDark ? 'bg-[#A5B4FC]/20 text-[#A5B4FC]' : 'bg-blue-600 text-white'}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </div>
                    </button>

                </div>
            </div>

            {/* ── GOOGLE MAPS SECTION ── */}
            <div className={`w-full max-w-6xl rounded-[32px] overflow-hidden border h-64 transition-all duration-700 z-10 ${isDark ? 'border-white/10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100' : 'border-gray-200 opacity-90 hover:opacity-100'
                }`}>
                <iframe
                    title="TraderNation Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59545.61095291809!2d75.68159!3d19.87868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb98f0e9d84bd9%3A0x5e9a77f7c87a5a21!2sChhatrapati%20Sambhajinagar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    allowFullScreen=""
                    loading="lazy"
                />
            </div>

        </div>
    );
}
