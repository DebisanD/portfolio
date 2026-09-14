import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Code2, Server, Database, Layers, Terminal, Cpu, Network, Palette, Workflow, FileCode, Sparkles } from 'lucide-react';

export const Skills = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database & Cloud', 'Architecture'];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-indigo-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-amber-400" />;
      case 'Network': return <Network className="w-5 h-5 text-cyan-400" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-rose-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-teal-400" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-violet-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(s.category.toLowerCase()));

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Skills & <span className="text-gradient">Core Tech Stack</span>
          </h2>
          <p className="text-slate-300 text-base">
            Comprehensive skill set built over 6+ years of engineering robust software systems and modern web products.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800/80 glass-panel-hover flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                {getIcon(skill.icon)}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-base">{skill.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">{skill.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
