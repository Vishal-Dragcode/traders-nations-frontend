import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../settings/ThemeContext";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";

/**
 * Scalloped Logo Frame component to match the wavy border in the image
 */
const ScallopedFrame = ({ children }) => {
  const { colors } = useTheme();
  return (
    <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14">
      <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
        <path
          id="scallopPath"
          d="M50 5 C 55 5, 58 10, 63 12 C 68 14, 73 13, 77 17 C 81 21, 80 26, 83 31 C 86 36, 91 39, 91 44 C 91 49, 86 52, 83 57 C 80 62, 81 67, 77 71 C 73 75, 68 74, 63 76 C 58 78, 55 83, 50 83 C 45 83, 42 78, 37 76 C 32 74, 27 75, 23 71 C 19 67, 20 62, 17 57 C 14 52, 9 49, 9 44 C 9 39, 14 36, 17 31 C 20 26, 19 21, 23 17 C 27 13, 32 14, 37 12 C 42 10, 45 5, 50 5 Z"
          fill="none"
          stroke="#A5B4FC"
          strokeWidth="1.5"
        />
      </svg>
      <div
        className="z-10 rounded-full w-[70%] h-[70%] flex items-center justify-center font-bold text-xs sm:text-sm border border-[#A5B4FC]/30"
        style={{ background: colors.background, color: colors.text }}
      >
        {children}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(path);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(path);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
      ? 'py-2 px-4 sm:px-8'
      : 'py-0 px-0'
      }`}>
      <div
        className={`mx-auto flex items-center justify-between gap-4 transition-all duration-500 ${isScrolled
          ? 'max-w-[1400px] border border-white/10 rounded-full px-6 py-1.5'
          : 'max-w-full w-full border-b border-white/5 px-8 py-3'
          }`}
        style={{ background: colors.background }}
      >

        {/* 1. Logo Section */}
        <Link to="/" className="shrink-0 transition-transform hover:scale-105 active:scale-95">
          <ScallopedFrame>TN</ScallopedFrame>
        </Link>

        {/* 2. Main Pill Navigation */}
        <div
          className={`hidden lg:flex flex-1 items-center transition-all duration-500 ${isScrolled
            ? 'border border-white/10 rounded-full h-11 px-8 group hover:border-white/20'
            : 'h-11 px-4'
            }`}
          style={{ background: isScrolled ? colors.background : 'transparent' }}
        >
          <div className="flex items-center justify-between w-full  tracking-wider uppercase">

            {/* Brand Name */}
            <div
              className={`font-bold text-lg mr-8 border-r transition-all duration-500 ${isScrolled ? 'border-white/10 pr-8' : 'border-transparent pr-0'} h-6 flex items-center whitespace-nowrap`}
              style={{ color: colors.text }}
            >
              TRADER NATION
            </div>

            {/* Navigation Links - Aligned Right */}
            <div className={`flex gap-8 text-[11px] font-medium transition-colors ${isScrolled ? 'ml-auto opacity-70 hover:opacity-100' : 'ml-0 opacity-80 hover:opacity-100'}`} style={{ color: colors.text }}>
              <button
                onClick={() => handleNavigation('/')}
                className={`hover:text-[#A5B4FC] transition-colors ${location.pathname === '/' ? 'text-[#A5B4FC]' : ''}`}
              >Home</button>
              <button
                onClick={() => handleNavigation('/about')}
                className={`hover:text-[#A5B4FC] transition-colors ${location.pathname === '/about' ? 'text-[#A5B4FC]' : ''}`}
              >About Us</button>
              <Link
                to="/courses"
                className={`hover:text-[#A5B4FC] transition-colors ${location.pathname === '/courses' ? 'text-[#A5B4FC]' : ''}`}
              >Courses</Link>
              <Link
                to="/events"
                className={`relative hover:text-[#A5B4FC] transition-colors flex items-center gap-1.5 ${location.pathname === '/events' ? 'text-[#A5B4FC]' : ''}`}
              >
                Events
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}
          style={{ color: colors.text }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* 4. Actions Section: Theme Toggle, Contact, Profile */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-500
              ${isDark
                ? 'bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20 hover:scale-110'
                : 'bg-black/5 border-black/10 text-indigo-600 hover:bg-black/10 hover:scale-110'
              }
            `}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} fill="currentColor" opacity={0.5} /> : <Moon size={18} fill="currentColor" opacity={0.5} />}
          </button>

          <button
            onClick={() => handleNavigation('/contact')}
            className={`hidden sm:flex items-center h-11 transition-all duration-500 ${isScrolled
              ? 'pl-8 pr-1.5 border border-white/10 rounded-full group hover:border-[#A5B4FC]/40'
              : 'pl-6 pr-1.5 group'
              }`}
            style={{
              background: isScrolled ? colors.background : 'transparent',
              borderColor: isScrolled ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') : 'transparent'
            }}
          >
            <span className=" uppercase tracking-[2px] text-xs font-bold mr-4" style={{ color: colors.text }}>
              Contact Us
            </span>
            <div className={`w-9 h-9 rounded-full bg-[#A5B4FC] flex items-center justify-center text-[#050810] transition-transform duration-500 group-hover:rotate-45 ${!isScrolled && 'scale-90'}`}>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </div>
          </button>

        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-28 left-4 right-4 border rounded-[40px] p-8 z-50 animate-zoom-in ${isDark ? 'border-white/10 shadow-2xl shadow-black' : 'border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'}`}
          style={{ background: colors.background }}
        >
          <div className="flex flex-col gap-6 text-center">
            <button onClick={() => handleNavigation('/')} className="text-xl font-bold uppercase tracking-widest" style={{ color: colors.text }}>Home</button>
            <button onClick={() => handleNavigation('/about')} className="text-xl font-bold uppercase tracking-widest" style={{ color: colors.text }}>About Us</button>
            <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold uppercase tracking-widest" style={{ color: colors.text }}>Courses</Link>
            <Link
              to="/events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              style={{ color: location.pathname === '/events' ? '#A5B4FC' : colors.text }}
            >
              Events
            </Link>
            <button onClick={() => handleNavigation('/contact')} className="text-xl font-bold uppercase tracking-widest" style={{ color: colors.text }}>Contact</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }
      `}</style>
    </nav>
  );
};

export default Navbar;
