import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, Building2, CheckCircle } from 'lucide-react';

export const Experience = () => {
  const { experiences } = usePortfolio();

  return (
    <section id="experience" className="py-24 relative z-10 section-glow-top bg-slate-950/30 border-b border-slate-800/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PATHWAY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Work <span className="text-gradient">Experience & Impact</span>
          </h2>
          <p className="text-slate-300 text-base">
            Track record of driving backend efficiency, frontend performance, and team engineering excellence.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 max-w-4xl mx-auto relative border-l-2 border-slate-800/80 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.id || exp._id || `exp-${idx}`} className="relative group">
              
              {/* Timeline Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 group-hover:shadow-[0_0_15px_#38bdf8] transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Content Card */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 glass-panel-hover space-y-4">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-400 font-medium">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span>{exp.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/60 space-y-2">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
