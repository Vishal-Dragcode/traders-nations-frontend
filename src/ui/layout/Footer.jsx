import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../settings/ThemeContext';

export default function Footer() {
  const { theme, colors } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  return (
    <footer
      className={`w-full transition-colors duration-300 border-t ${isDark ? 'border-white/10' : 'border-gray-200'
        }`}
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">

        {/* Top Row: Logo + Social */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">

          {/* Left: Logo + Description */}
          <div className="max-w-md flex flex-col items-center md:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              {/* Brand Name */}
              <span className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Trader
                <span className="text-blue-600">Nation</span>
              </span>
            </div>

            {/* Description */}
            <p className={`text-sm leading-relaxed text-center md:text-left max-w-sm ${isDark ? 'text-white/60' : 'text-gray-500'
              }`}>
              Professional trading education platform empowering traders with structured
              learning, mentorship, and real market exposure.
            </p>
          </div>

          {/* Right: Follow Us + Social Icons */}
          <div className="flex flex-col items-center gap-3">
            <span className={`text-sm font-semibold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-500'
              }`}>
              Follow us
            </span>
            <div className="flex items-center gap-3">
              {/* Telegram Icon */}
              <a
                href="https://t.me/Fxtejascommuinity"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${isDark
                  ? 'border-[#229ED9]/30 text-[#229ED9] hover:bg-[#229ED9]/10 hover:border-[#229ED9]/50'
                  : 'border-[#229ED9]/20 text-[#229ED9] hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
                </svg>
              </a>



              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/fx.tejas_?igsh=MTJ5aXQ0eGxrYWlwdg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${isDark
                  ? 'border-[#E4405F]/30 text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/50'
                  : 'border-[#E4405F]/20 text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* YouTube Icon */}
              <a
                href="https://www.youtube.com/@FxTejasTrader"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${isDark
                  ? 'border-[#FF0000]/30 text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50'
                  : 'border-[#FF0000]/20 text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className={`my-6 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`} />

        {/* Middle: Nav Links */}
        <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-3">
          {[
            "Terms & Conditions",
            "Privacy Policy",
            "FAQ",
            "Contact Us",
            "About Us",
          ].map((link) => (
            <button
              key={link}
              onClick={() => {
                if (link === "Contact Us") navigate('/contact');
                if (link === "FAQ") navigate('/faq');
                if (link === "Terms & Conditions") navigate('/terms-and-conditions');
                if (link === "Privacy Policy") navigate('/privacy-policy');
                if (link === "About Us") navigate('/about');
              }}
              className={`text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${isDark ? 'text-white/40 hover:text-blue-400' : 'text-gray-500 hover:text-blue-700'
                }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className={`my-6 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`} />

        {/* Bottom: Copyright */}
        <p className={`text-center text-[11px] tracking-widest font-medium uppercase ${isDark ? 'text-white/20' : 'text-gray-400'
          }`}>
          © 2026 TraderNation. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
