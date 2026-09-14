import React from 'react';
import { GraduationCap, Award, CheckCircle2, Calendar, BookOpen, ExternalLink } from 'lucide-react';

export const Education = () => {
  const certifications = [
    {
      title: 'Odoo ERP System Engineering',
      issuer: 'Enterprise System Architecture',
      year: '2025',
      badge: 'Odoo ERP',
      desc: 'Custom Python Odoo module engineering, CRM, inventory control, and REST API synchronization.'
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'React & Node.js REST Architecture',
      year: '2025',
      badge: 'Fullstack',
      desc: 'Building responsive React applications with Tailwind CSS, Express backend services, and MongoDB.'
    },
    {
      title: 'Python & Systems Engineering',
      issuer: 'Backend & Data Architecture',
      year: '2025',
      badge: 'Python',
      desc: 'Object-oriented programming, data structures, RESTful API design, and database optimizations.'
    },
    {
      title: 'Database & Cloud Architecture',
      issuer: 'PostgreSQL & MongoDB Specialist',
      year: '2025',
      badge: 'Database',
      desc: 'Relational & NoSQL database modeling, query optimization, indexing, and data security.'
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10 section-glow-top bg-slate-950/40 backdrop-blur-sm border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC & CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Education & <span className="text-gradient">Professional Badges</span>
          </h2>
          <p className="text-slate-300 text-base">
            Formal university degree in software engineering alongside specialized enterprise certifications.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: University Degree Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 font-bold">
                  Class of 2025
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">BACHELOR DEGREE</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">Dambi Dollo University</h3>
                <p className="text-sm font-semibold text-slate-300 mt-1">Bachelor of Science in Computer Science / Software Engineering</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Graduated with focus on full-stack software development, object-oriented software engineering, database systems design, and enterprise application architecture.
              </p>

              {/* Coursework Highlights */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <h4 className="text-xs font-mono text-slate-400 uppercase font-bold">Core Competencies</h4>
                {[
                  'Full-Stack Web & REST API Architecture',
                  'Object-Oriented Programming (Python, JS)',
                  'Database Systems (PostgreSQL & MongoDB)',
                  'System Analysis, Design & Agile Development'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Certifications Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((c, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-cyan-300">
                      {c.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{c.year}</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> {c.issuer}
                  </span>
                  <span className="text-cyan-400 font-bold">Verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
