import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Shield, Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar = ({ onOpenAdmin }) => {
  const { isBackendConnected, adminToken, logoutAdmin, profile } = usePortfolio();
  const { theme, toggleLightDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'API Tester', href: '#api-explorer' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Code', href: '#code-snippets' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'py-3 bg-[#030712]/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo with User Avatar */}
        <a href="#about" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
            <img
              src={profile?.avatar || "/images/debisa_avatar.jpg"}
              alt={profile?.name || "DEBISA DARICHA DABA"}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm md:text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              DEBISA DARICHA DABA
            </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">SOFTWARE DEVELOPER</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side controls: Light/Dark Toggle, Backend Status Dot & Admin Auth */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Quick Sun / Moon Light-Dark Mode Toggle */}
          <button
            onClick={toggleLightDark}
            className="p-2 rounded-full bg-slate-900/90 border border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg"
            title={theme === 'light' ? "Switch to Dark (Black) Mode" : "Switch to Light (White) Mode"}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-cyan-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
            )}
          </button>

          {/* API Backend Status Badge */}
          <div
            title={isBackendConnected ? "Express REST API is live" : "Connecting to Express REST API"}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono"
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              isBackendConnected ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
            }`} />
            <span className={isBackendConnected ? 'text-emerald-400' : 'text-amber-400'}>
              {isBackendConnected ? 'API Live' : 'API Connecting'}
            </span>
          </div>

          {/* Admin CMS Trigger Button */}
          {adminToken ? (
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Logout</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Portal</span>
            </button>
          )}

          {/* Contact CTA button */}
          <a
            href="#contact"
            className="glow-btn px-4 py-2 rounded-xl text-xs font-semibold text-white tracking-wide uppercase shadow-lg"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu trigger button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLightDark}
            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-amber-400"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-6 py-4 flex flex-col gap-4 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 font-medium py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="text-xs text-cyan-400 flex items-center gap-1.5"
            >
              <Shield className="w-4 h-4" /> Admin Portal
            </button>
            <span className="text-xs font-mono text-emerald-400">● REST API Connected</span>
          </div>
        </div>
      )}
    </header>
  );
};
