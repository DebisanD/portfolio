import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Check } from 'lucide-react';

export const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel p-3 rounded-full shadow-2xl border border-cyan-500/40 text-cyan-300 hover:text-white hover:scale-110 transition-all flex items-center justify-center group"
        title="Customize Portfolio Theme"
      >
        <Palette className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
      </button>

      {/* Palette Popover Panel */}
      {isOpen && (
        <div className="absolute bottom-14 left-0 glass-panel p-4 rounded-2xl border border-slate-700/80 shadow-2xl w-60 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Theme Accents</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                  theme === t.id
                    ? 'bg-slate-900 border-cyan-500/60 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-white/20 shadow-sm"
                    style={{ backgroundColor: t.color }}
                  />
                  <span>{t.name}</span>
                </div>
                {theme === t.id && <Check className="w-4 h-4 text-cyan-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
