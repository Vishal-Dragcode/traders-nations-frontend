import { useState, useEffect } from "react";
import { useTheme } from "../../settings/ThemeContext";
import {
    GraduationCap,
    Users,
    Monitor,
    Smartphone,
    Trophy,
    Globe,
    Phone,
    MessageCircle,
    ArrowUpRight
} from "lucide-react";

/**
 * Features data with Lucide icons
 */
const features = [
    {
        icon: GraduationCap,
        title: "NISM-Certified Curriculum",
        desc: "Industry-recognized certifications that boost your credibility in the financial world.",
    },
    {
        icon: Users,
        title: "NSE-Trained Faculty",
        desc: "Learn from experts trained by the National Stock Exchange of India.",
    },
    {
        icon: Monitor,
        title: "Live Practical Sessions",
        desc: "Real-time trading simulations and hands-on market analysis exercises.",
    },
    {
        icon: Smartphone,
        title: "Online & Classroom Courses",
        desc: "Flexible learning modes to fit your schedule — learn anywhere, anytime.",
    },
    {
        icon: Trophy,
        title: "Award-Winning Innovation",
        desc: "Recognized nationally for pioneering financial education methodologies.",
    },
    {
        icon: Globe,
        title: "Main Center Location",
        desc: "Centrally located hub providing world-class financial training and support.",
    },
];

const stats = [
    { value: "8+", label: "Years of Excellence" },
    { value: "10K+", label: "Success Stories" },
    { value: "100K+", label: "Indians Empowered" },
];

export default function WhyChooseTraderNation() {
    const [visible, setVisible] = useState(false);
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const accentColor = "#A5B4FC";

    return (
        <section
            style={{
                background: colors.background,
                color: colors.text,
                fontFamily: "'Inter', sans-serif"
            }}
            className="relative overflow-hidden"
        >

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-8">

                {/* Header */}
                <div
                    className={`text-center mb-12 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                   
                    <h2
                        className={`text-3xl md:text-3xl font-black uppercase tracking-widest  mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                        Why Choose{" "}
                        <span style={{ color: accentColor }}>
                            Trader Nation?
                        </span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg opacity-60 font-medium">
                        Founded by <strong className={isDark ? "text-white" : "text-black"}>Ravindra Bharti Sir</strong>, Trader Nation has been
                        empowering aspiring traders and investors with financial literacy for over 8 years.
                    </p>
                </div>

                {/* Stats Row */}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className={`backdrop-blur border rounded-2xl p-5 text-center transition-all duration-500 hover:-translate-y-1 group ${isDark ? "bg-white/5 border-white/10 hover:border-[#A5B4FC]/40" : "bg-black/5 border-black/10 hover:border-[#2563EB]/40"
                                }`}
                        >
                            <div
                                className="text-3xl sm:text-4xl font-black "
                                style={{ color: isDark ? accentColor : '#2563EB' }}
                            >
                                {s.value}
                            </div>
                            <div className="text-xs sm:text-sm mt-1 font-medium opacity-60">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className={`group backdrop-blur border rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 cursor-default ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#A5B4FC]/40" : "bg-black/5 border-black/10 hover:bg-black/5 hover:border-[#2563EB]/40"
                                }`}
                        >
                            <div
                                className="mb-4 transition-transform duration-500 group-hover:scale-110"
                                style={{ color: isDark ? accentColor : '#2563EB' }}
                            >
                                <f.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-bold text-base mb-1  uppercase tracking-wider group-hover:text-inherit transition-colors">
                                {f.title}
                            </h3>
                            <p className="text-sm leading-relaxed opacity-60">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div
                    className={`border rounded-[40px] p-8 sm:p-12 text-center transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        } ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                        }`}
                >
                    <h3 className="text-2xl sm:text-3xl font-black mb-2 ">
                        Start Your Journey Toward{" "}
                        <span style={{ color: accentColor }}>
                            Financial Independence
                        </span>
                    </h3>
                    <p className="mb-8 text-sm sm:text-base max-w-xl mx-auto opacity-60">
                        Join 10,000+ success stories. Talk to our experts today and enroll in India's most trusted share market course.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Call Button */}
                        <a
                            href="tel:+917083684525"
                            className="group flex items-center gap-4 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold h-14 pl-8 pr-1.5 rounded-full text-base transition-all duration-500 hover:scale-105 active:scale-95 w-full sm:w-auto"
                        >
                            <div className="flex flex-col text-left mr-8">
                                <span className="text-[10px] uppercase tracking-[2px] opacity-70">Call Us Now</span>
                                <span className="">+91 7083684525</span>
                            </div>
                            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                                <ArrowUpRight size={20} />
                            </div>
                        </a>

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/919689684525"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center gap-4 border font-bold h-14 pl-8 pr-1.5 rounded-full text-base transition-all duration-500 hover:scale-105 active:scale-95 w-full sm:w-auto ${isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
                                }`}
                        >
                            <div className="flex flex-col text-left mr-8">
                                <span className="text-[10px] uppercase tracking-[2px] opacity-70">WhatsApp Us</span>
                                <span className="">+91 9689684525</span>
                            </div>
                            <div className="w-11 h-11 rounded-full bg-[#22C55E] text-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                                <MessageCircle size={20} />
                            </div>
                        </a>
                    </div>

                    <p className="mt-8 opacity-40 text-[10px] uppercase tracking-[2px]">
                        🔒 100% Free Consultation · No Spam · Trusted by 1,00,000+ Students
                    </p>
                </div>

            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>
        </section>
    );
}
