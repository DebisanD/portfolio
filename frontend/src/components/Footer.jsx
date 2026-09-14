import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Code2, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const { profile } = usePortfolio();

  return (
    <footer className="relative z-10 bg-[#060911] border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="font-bold text-white text-sm">
            {profile?.name || 'DEBISA DARICHA DABA'} <span className="text-slate-500 font-normal">| Senior Full Stack Software Engineer</span>
          </span>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <a href={profile?.social?.github || "https://github.com/DebisanD"} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub (DebisanD)
          </a>
          <span>•</span>
          <a href="https://t.me/MaalanJira" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            Telegram (@MaalanJira)
          </a>
          <span>•</span>
          <a href="https://t.me/Deebiisan" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            Telegram (@Deebiisan)
          </a>
          <span>•</span>
          <a href={`mailto:${profile?.social?.email || "debisadaricha3@gmail.com"}`} className="hover:text-cyan-400 transition-colors">
            Email
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
          <span>© {new Date().getFullYear()} Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          <span>Full-Stack Architecture</span>
        </div>

      </div>
    </footer>
  );
};
