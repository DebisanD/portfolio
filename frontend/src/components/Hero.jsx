import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Download, Github, Facebook, Send, Sparkles } from 'lucide-react';

export const Hero = () => {
  const { profile } = usePortfolio();
  const [activeTab, setActiveTab] = useState('developer.config.ts');

  const p = profile || {
    name: "DEBISA DARICHA DABA",
    title: "Senior Full Stack Software Engineer & Odoo ERP Specialist",
    status: "Available for software projects & consulting",
    tagline: "Building scalable web applications, custom Odoo ERP platforms, AgriTech systems, and enterprise solutions since 2025.",
    avatar: "/images/debisa_avatar.jpg",
    stats: {
      yearsExperience: "Since 2025",
      completedProjects: 18,
      codeCommits: "2.1k+",
      clientSatisfaction: "100%"
    },
    social: {
      github: "https://github.com/DebisanD",
      facebook: "https://www.facebook.com/debisa.daricha.1",
      telegram: "https://t.me/MaalanJira",
      telegram2: "https://t.me/Deebiisan",
      phone: "+251910905895 / +251918342587",
      email: "debisadaricha3@gmail.com"
    }
  };

  const handleDownloadCV = () => {
    const resumeText = `
=====================================================
DEBISA DARICHA DABA - SENIOR FULL STACK SOFTWARE ENGINEER
=====================================================
Email: debisadaricha3@gmail.com
Phone: +251910905895 / +251918342587
Location: Ethiopia (Remote Ready)
GitHub: https://github.com/DebisanD
Facebook: https://www.facebook.com/debisa.daricha.1
Telegram: @MaalanJira / @Deebiisan

SUMMARY:
Software Developer & Full Stack Systems Engineer based in Ethiopia. Graduate of Dambi Dollo University, developing high-impact enterprise applications, custom Odoo ERP systems, and AgriTech portals since 2025.

FEATURED PROJECTS:
1. Job Portal System - Full-stack recruitment portal with applicant tracking.
2. Odoo ERP Enterprise Solution - Custom ERP modules, CRM, inventory, & financial workflows.
3. AgriLink Ethiopia - Digital agricultural commodity marketplace & price intelligence platform.

CORE SKILLS:
- Languages & Frameworks: Python, Odoo ERP, JavaScript (ES6+), React, Node.js, Express, HTML5/CSS3, Tailwind CSS
- Databases & Tools: PostgreSQL, MongoDB, REST APIs, Git, System Architecture

=====================================================
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DEBISA_DARICHA_DABA_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Avatar & Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* User Avatar + Status Pill */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 p-[3px] shadow-xl shadow-cyan-500/25 overflow-hidden shrink-0">
                <img
                  src={p.avatar || "/images/debisa_avatar.jpg"}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 shadow-xl">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>{p.status}</span>
                </div>
                <div className="text-xs font-mono text-slate-400">Software Developer (Class of 2025)</div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              DEBISA DARICHA DABA <br />
              <span className="text-gradient">Software Engineer</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {p.tagline}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="glow-btn px-6 py-3.5 rounded-xl font-semibold text-white text-sm flex items-center gap-2 group shadow-xl"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleDownloadCV}
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 text-sm glass-panel hover:bg-slate-800/80 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Social Icons & Contact Handles */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-slate-300 text-xs font-mono">
              <a href={p.social?.github || "https://github.com/DebisanD"} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors px-3 py-2 glass-panel rounded-xl flex items-center gap-2">
                <Github className="w-4 h-4 text-cyan-400" />
                <span>DebisanD</span>
              </a>

              <a href={p.social?.facebook || "https://www.facebook.com/debisa.daricha.1"} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors px-3 py-2 glass-panel rounded-xl flex items-center gap-2 border-blue-500/30">
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook</span>
              </a>

              <a href="https://t.me/MaalanJira" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors px-3 py-2 glass-panel rounded-xl flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Telegram: @MaalanJira</span>
              </a>

              <a href="https://t.me/Deebiisan" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors px-3 py-2 glass-panel rounded-xl flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-400" />
                <span>@Deebiisan</span>
              </a>
            </div>

          </div>

          {/* Right Column: Code Terminal Window Mockup */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl border border-slate-800 shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
              
              {/* Window Bar */}
              <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                
                {/* File Tabs */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  {['developer.config.ts', 'server.js', 'stack.json'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded-md transition-all ${
                        activeTab === tab ? 'bg-slate-800 text-cyan-400 font-semibold border border-slate-700' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto bg-[#090d16]/90 text-slate-300">
                {activeTab === 'developer.config.ts' && (
                  <div>
                    <p className="text-slate-500">// Software Developer Profile</p>
                    <p><span className="text-purple-400">const</span> <span className="text-cyan-300">engineer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-300">"DEBISA DARICHA DABA"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">role:</span> <span className="text-emerald-300">"{p.title}"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">location:</span> <span className="text-emerald-300">"Ethiopia"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">facebook:</span> <span className="text-blue-300">"debisa.daricha.1"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">experienceStart:</span> <span className="text-amber-300">"2025"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">featuredProjects:</span> [</p>
                    <p className="pl-8 text-amber-300">"Job Portal System",</p>
                    <p className="pl-8 text-amber-300">"Odoo ERP Enterprise Solution",</p>
                    <p className="pl-8 text-amber-300">"AgriLink Ethiopia"</p>
                    <p className="pl-4">],</p>
                    <p className="pl-4"><span className="text-slate-400">hireable:</span> <span className="text-cyan-400">true</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">deployState:</span> <span className="text-emerald-400">"Production Ready"</span></p>
                    <p>&#125;;</p>
                    <p className="mt-3 text-cyan-400 animate-pulse">&gt; DEBISA DARICHA DABA profile loaded cleanly.</p>
                  </div>
                )}

                {activeTab === 'server.js' && (
                  <div>
                    <p className="text-slate-500">// REST API Server Entry Point</p>
                    <p><span className="text-purple-400">import</span> express <span className="text-purple-400">from</span> <span className="text-emerald-300">'express'</span>;</p>
                    <p><span className="text-purple-400">const</span> app = express();</p>
                    <p className="mt-2">app.get(<span className="text-emerald-300">'/api/projects'</span>, (req, res) =&gt; &#123;</p>
                    <p className="pl-4 text-slate-400">res.json(db.projects);</p>
                    <p>&#125;);</p>
                    <p className="mt-2 text-emerald-400">// Server listening on http://localhost:5000</p>
                  </div>
                )}

                {activeTab === 'stack.json' && (
                  <div>
                    <p className="text-purple-400">&#123;</p>
                    <p className="pl-4"><span className="text-cyan-300">"frontend":</span> "React 18 + Vite + Tailwind CSS",</p>
                    <p className="pl-4"><span className="text-cyan-300">"backend":</span> "Node.js + Express REST API",</p>
                    <p className="pl-4"><span className="text-cyan-300">"database":</span> "MongoDB / JSON Store",</p>
                    <p className="pl-4"><span className="text-cyan-300">"deployment":</span> "Docker / Vercel Ready"</p>
                    <p>&#125;</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Stats Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Developer Since', value: '2025', desc: 'Software engineering career start' },
            { label: 'Completed Projects', value: `${p.stats?.completedProjects || 18}+`, desc: 'Enterprise, Web & ERP solutions' },
            { label: 'Code Commits', value: p.stats?.codeCommits || '2.1k+', desc: 'Git repositories & modules' },
            { label: 'Client Satisfaction', value: p.stats?.clientSatisfaction || '100%', desc: 'Delivered with excellence' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800/80 text-left hover:border-cyan-500/30 transition-colors">
              <div className="text-3xl font-extrabold text-white tracking-tight font-mono text-gradient">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
