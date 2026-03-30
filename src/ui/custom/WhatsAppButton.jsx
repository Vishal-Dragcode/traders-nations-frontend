import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '../../settings/ThemeContext';

const WhatsAppButton = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Replace with your actual WhatsApp number
    const whatsappNumber = "+919689684525";
    const message = "Hello! I'm interested in Trader Nation courses.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-8 right-8 z-50 group">
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">
                Chat with us!
                <div className="absolute top-full right-5 border-8 border-transparent border-t-[#25D366]"></div>
            </div>


            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 ${isDark
                    ? 'bg-[#25D366] text-white'
                    : 'bg-[#25D366] text-white'
                    }`}
                style={{ boxShadow: 'none' }}
                aria-label="Contact via WhatsApp"
            >
                <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-90 group-hover:scale-100 transition-transform"></div>
                <MessageCircle size={30} fill="currentColor" strokeWidth={1.5} />

                {/* Notification Badge */}
                <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#25D366]"></span>
                </span>
            </a>
        </div>
    );
};

export default WhatsAppButton;
