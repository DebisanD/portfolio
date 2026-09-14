import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Download, Github, Facebook, Send, Sparkles, BookOpen, CheckCircle2, UserCheck, X } from 'lucide-react';

export const Hero = () => {
  const { profile } = usePortfolio();
  const [activeTab, setActiveTab] = useState('developer.config.ts');
  const [showBioModal, setShowBioModal] = useState(false);

  const p = profile || {
    name: "DEBISA DARICHA DABA",
    title: "Software Engineer & Full-Stack Developer",
    status: "Available for Software Engineering & Web Development",
    tagline: "Building web applications with React.js, Node.js, Express.js & MongoDB. Passionate about system building, problem solving, and turning ideas into practical digital solutions.",
    avatar: "/images/debisa_avatar.jpg",
    shortBio: "I’m Debisa Daricha Daba, an Ethiopian Software Engineer and Full-Stack Developer passionate about building practical and user-focused web applications. I work primarily with the MERN stack — MongoDB, Express.js, React.js, and Node.js.",
    githubBio: "Software Engineer & Full-Stack Developer 🚀 Building web applications with React.js, Node.js, Express.js & MongoDB.",
    cvSummary: "Software Engineering graduate and aspiring Full-Stack Developer with hands-on experience building web-based applications using JavaScript, React.js, Node.js, Express.js, and MongoDB.",
    stats: {
      yearsExperience: "Class of 2025",
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
===================================================================
                  DEBISA DARICHA DABA
         SOFTWARE ENGINEER | FULL-STACK DEVELOPER
===================================================================
Email: debisadaricha3@gmail.com
Phone: +251910905895 / +251918342587
Location: Ethiopia (Remote Ready)
GitHub: https://github.com/DebisanD
Facebook: https://www.facebook.com/debisa.daricha.1
Telegram: @MaalanJira / @Deebiisan

-------------------------------------------------------------------
CV PROFESSIONAL SUMMARY
-------------------------------------------------------------------
Software Engineering graduate and aspiring Full-Stack Developer with hands-on 
experience building web-based applications using JavaScript, React.js, 
Node.js, Express.js, and MongoDB. Experienced in developing REST APIs, 
authentication and authorization systems, role-based access control, 
database-driven applications, job management platforms, and online examination 
features. Strong interest in software engineering, system design, problem 
solving, and developing practical digital solutions for real-world challenges.

-------------------------------------------------------------------
EDUCATION
-------------------------------------------------------------------
Degree: Bachelor of Science (B.Sc.) in Software Engineering
Institution: Dambi Dollo University, Ethiopia
Graduation: Class of 2025

-------------------------------------------------------------------
MAJOR ACADEMIC PROJECT
-------------------------------------------------------------------
Web-Based Job Portal System
- Designed to connect job seekers, employers, and administrators through a centralized recruitment platform.
- Implemented multi-role authentication, role-based access control, job posting & management, job applications, CV handling, online examinations, and application status tracking.
- Developed full-stack architecture combining React.js frontend, Node.js & Express REST APIs, and MongoDB database.

-------------------------------------------------------------------
CORE TECHNOLOGIES
-------------------------------------------------------------------
JavaScript • React.js • Node.js • Express.js • MongoDB • REST APIs • Git • GitHub • Tailwind CSS • Python • Odoo ERP

-------------------------------------------------------------------
PROFESSIONAL FOCUS
-------------------------------------------------------------------
Software Engineering • Full-Stack Development • Web Applications • Backend Development • REST API Development • Database Systems • System Design

===================================================================
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
                <div className="text-xs font-mono text-slate-400">Dambi Dollo University Software Engineering Graduate (2025)</div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              DEBISA DARICHA DABA <br />
              <span className="text-gradient">Software Engineer & Full-Stack Developer</span>
            </h1>

            {/* Subtitle / GitHub Bio */}
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {p.tagline}
            </p>

            {/* About / LinkedIn Summary Banner */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>About Debisa Daricha Daba</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {p.shortBio}
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-mono text-amber-400">
                <span>🎯 Career Goal:</span>
                <span className="text-slate-300 font-sans">To grow as a professional Full-Stack Software Engineer and build reliable digital solutions that create meaningful impact.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="glow-btn px-6 py-3.5 rounded-xl font-semibold text-white text-sm flex items-center gap-2 group shadow-xl"
              >
                <span>View Major Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setShowBioModal(true)}
                className="px-6 py-3.5 rounded-xl font-semibold text-cyan-300 text-sm glass-panel hover:bg-slate-800/80 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Who Is Debisa Daricha?</span>
              </button>

              <button
                onClick={handleDownloadCV}
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 text-sm glass-panel hover:bg-slate-800/80 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Social Icons & Handles */}
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

          {/* Right Column: Interactive Tech Stack Terminal Mockup */}
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
                  {['biography.ts', 'mern_stack.json', 'cv_summary.md'].map((tab) => (
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
                {activeTab === 'biography.ts' && (
                  <div>
                    <p className="text-slate-500">// Professional Engineer Profile</p>
                    <p><span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-300">"DEBISA DARICHA DABA"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">title:</span> <span className="text-emerald-300">"Software Engineer & Full-Stack Developer"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">university:</span> <span className="text-emerald-300">"Dambi Dollo University (Class of 2025)"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">majorProject:</span> <span className="text-emerald-300">"Web-Based Job Portal System"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">coreTech:</span> [</p>
                    <p className="pl-8 text-amber-300">"JavaScript", "React.js", "Node.js",</p>
                    <p className="pl-8 text-amber-300">"Express.js", "MongoDB", "Tailwind CSS"</p>
                    <p className="pl-4">],</p>
                    <p className="pl-4"><span className="text-slate-400">status:</span> <span className="text-cyan-400">"Available for Full-Stack Roles"</span></p>
                    <p>&#125;;</p>
                    <p className="mt-3 text-cyan-400 animate-pulse">&gt; Debisa Daricha Daba biography loaded.</p>
                  </div>
                )}

                {activeTab === 'mern_stack.json' && (
                  <div>
                    <p className="text-purple-400">&#123;</p>
                    <p className="pl-4"><span className="text-cyan-300">"frontend":</span> "React.js + Tailwind CSS",</p>
                    <p className="pl-4"><span className="text-cyan-300">"backend":</span> "Node.js + Express.js REST API",</p>
                    <p className="pl-4"><span className="text-cyan-300">"database":</span> "MongoDB / Mongoose Schema",</p>
                    <p className="pl-4"><span className="text-cyan-300">"security":</span> "Role-Based Access Control + JWT",</p>
                    <p className="pl-4"><span className="text-cyan-300">"features":</span> "Online Exams, CV Handling, Job Portal"</p>
                    <p>&#125;</p>
                  </div>
                )}

                {activeTab === 'cv_summary.md' && (
                  <div>
                    <p className="text-cyan-400 font-bold"># CV PROFESSIONAL SUMMARY</p>
                    <p className="mt-2 text-slate-300">Software Engineering graduate and aspiring Full-Stack Developer with hands-on experience building web applications using JavaScript, React.js, Node.js, Express.js, and MongoDB.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Core Technologies & Focus Badges */}
        <div className="mt-12 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3">⚡ Core Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git', 'GitHub', 'Tailwind CSS'].map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-3">🎯 Professional Focus</h4>
              <div className="flex flex-wrap gap-2">
                {['Software Engineering', 'Full-Stack Development', 'Web Applications', 'Backend Development', 'REST API Development', 'Database Systems', 'System Design'].map((focus) => (
                  <span key={focus} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-purple-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-purple-400" />
                    <span>{focus}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Metrics Row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Academic Study', value: 'Dambi Dollo', desc: 'Software Engineering B.Sc.' },
            { label: 'Primary Stack', value: 'MERN', desc: 'MongoDB, Express, React, Node' },
            { label: 'Major Project', value: 'Job Portal', desc: 'Recruitment & Exam System' },
            { label: 'Career Goal', value: 'System Builder', desc: 'Scalable Full-Stack Engineering' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800/80 text-left hover:border-cyan-500/30 transition-colors">
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono text-gradient">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Biography Modal: Who Is Debisa Daricha Daba? */}
      {showBioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl text-left space-y-6 bg-slate-900/95 text-slate-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white">Who Is Debisa Daricha Daba?</h3>
                  <p className="text-xs font-mono text-cyan-400">Software Engineer & Full-Stack Developer Biography</p>
                </div>
              </div>
              <button
                onClick={() => setShowBioModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content: Full 5-Paragraph Biography */}
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
              <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-cyan-400">
                <strong className="text-white">Debisa Daricha Daba</strong> is an Ethiopian Software Engineer and Full-Stack Developer passionate about building practical, scalable, and user-focused digital solutions. His work focuses primarily on modern web application development, combining strong software engineering principles with technologies such as <strong className="text-cyan-300 font-mono">JavaScript, React.js, Node.js, Express.js, and MongoDB</strong>.
              </p>

              <p>
                Debisa developed his foundation in Software Engineering through his academic studies at <strong className="text-amber-300">Dambi Dollo University</strong>, where he gained experience in software development, system analysis and design, databases, web technologies, and software engineering methodologies.
              </p>

              <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">🚀 Major Academic Project Highlight</h4>
                <p className="text-xs text-slate-300">
                  One of his major projects is a <strong className="text-white">Web-Based Job Portal System</strong>, designed to connect job seekers, employers, and administrators through a centralized recruitment platform. The system includes authentication, role-based access control, job posting and management, job applications, CV handling, online examinations, and application management. Through this project, Debisa gained practical experience in developing full-stack applications and integrating frontend, backend, database, and authentication technologies.
                </p>
              </div>

              <p>
                Beyond academic projects, Debisa is interested in developing solutions that address real-world problems in areas such as <strong className="text-emerald-300">employment, agriculture, business management, and digital services</strong>. He continuously works to improve his programming, system-building, problem-solving, communication, and professional skills.
              </p>

              <p>
                As a growing software professional, Debisa's goal is to become an accomplished <strong className="text-cyan-300">Full-Stack Software Engineer and System Builder</strong>, contributing to innovative technology projects while creating reliable and meaningful digital products that can positively impact individuals, organizations, and communities.
              </p>
            </div>

            {/* Core Technologies & Professional Focus inside Modal */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-cyan-400 font-bold">Core Technologies:</span>
                <p className="text-slate-400 mt-1">JavaScript • React.js • Node.js • Express.js • MongoDB • REST APIs • Git • GitHub • Tailwind CSS</p>
              </div>
              <div>
                <span className="text-purple-400 font-bold">Professional Focus:</span>
                <p className="text-slate-400 mt-1">Software Engineering • Full-Stack Development • Web Applications • Backend Development • REST API Development • Database Systems • System Design</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 flex items-center justify-end border-t border-slate-800">
              <button
                onClick={() => setShowBioModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                Close Biography
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

