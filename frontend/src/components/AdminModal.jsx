import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, X, Plus, Trash2, Mail, Layers, Cpu, Server, Lock, CheckCircle, RefreshCw } from 'lucide-react';

export const AdminModal = ({ isOpen, onClose }) => {
  const {
    adminToken,
    loginAdmin,
    logoutAdmin,
    messages,
    fetchMessages,
    projects,
    addProject,
    deleteProject,
    skills,
    addSkill,
    deleteSkill,
    stats,
    refreshData
  } = usePortfolio();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [loading, setLoading] = useState(false);

  // New Project Form State
  const [newProj, setNewProj] = useState({
    title: '',
    category: 'Fullstack',
    description: '',
    longDescription: '',
    tags: '',
    image: '/images/project_ai_saas.jpg',
    github: 'https://github.com',
    demo: 'https://example.com'
  });

  // New Skill Form State
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Frontend',
    level: 85,
    icon: 'Code2'
  });

  useEffect(() => {
    if (isOpen && adminToken) {
      fetchMessages();
    }
  }, [isOpen, adminToken]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginAdmin(password);
    setLoading(false);
    setPassword('');
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const tagArray = newProj.tags.split(',').map(t => t.trim()).filter(Boolean);
    const success = await addProject({ ...newProj, tags: tagArray });
    if (success) {
      setNewProj({
        title: '',
        category: 'Fullstack',
        description: '',
        longDescription: '',
        tags: '',
        image: '/images/project_ai_saas.jpg',
        github: 'https://github.com',
        demo: 'https://example.com'
      });
    }
  };

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    const success = await addSkill(newSkill);
    if (success) {
      setNewSkill({ name: '', category: 'Frontend', level: 85, icon: 'Code2' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel max-w-4xl w-full max-h-[90vh] rounded-2xl border border-slate-800 flex flex-col overflow-hidden relative shadow-2xl">
        
        {/* Header */}
        <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Portfolio Admin CMS</h3>
              <p className="text-xs text-slate-400 font-mono">REST API Management Portal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!adminToken ? (
          /* Login Screen */
          <div className="p-8 max-w-md mx-auto w-full space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Admin Authentication</h4>
            <p className="text-xs text-slate-400">
              Enter admin password to manage projects, skills, and view contact form messages.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">PASSWORD (Default: admin or password123)</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="glow-btn w-full py-2.5 rounded-xl font-semibold text-white text-sm"
              >
                {loading ? 'Authenticating...' : 'Login to Admin Panel'}
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs */}
            <div className="bg-slate-900/50 px-6 py-2 border-b border-slate-800 flex items-center gap-3 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeTab === 'messages' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Inbox ({messages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeTab === 'projects' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Manage Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeTab === 'skills' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Manage Skills ({skills.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeTab === 'stats' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Server className="w-4 h-4" />
                <span>Server Stats</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: INBOX MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-mono uppercase">Contact Form Submissions</h4>
                    <button onClick={fetchMessages} className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <p className="text-sm text-slate-400 py-8 text-center">No messages received yet.</p>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-cyan-300">{msg.name} ({msg.email})</span>
                          <span className="text-slate-500 font-mono">{new Date(msg.date).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-white">{msg.subject}</div>
                        <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: MANAGE PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Create New Project Form */}
                  <form onSubmit={handleCreateProject} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase">Add New Project</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Project Title"
                        required
                        value={newProj.title}
                        onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                      <select
                        value={newProj.category}
                        onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                      >
                        <option>Fullstack</option>
                        <option>AI & Fullstack</option>
                        <option>DevOps & Cloud</option>
                      </select>
                    </div>

                    <textarea
                      placeholder="Short Description"
                      required
                      value={newProj.description}
                      onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                    />

                    <input
                      type="text"
                      placeholder="Comma-separated Tags (e.g. React, Node.js, Express)"
                      value={newProj.tags}
                      onChange={(e) => setNewProj({ ...newProj, tags: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                    />

                    <button type="submit" className="glow-btn px-4 py-2 text-xs font-semibold text-white rounded-lg flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </form>

                  {/* Project List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-slate-400 uppercase">Existing Projects</h4>
                    {projects.map((p) => (
                      <div key={p.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{p.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{p.category}</div>
                        </div>
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: MANAGE SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {/* Create New Skill Form */}
                  <form onSubmit={handleCreateSkill} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase">Add New Skill</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Skill Name"
                        required
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                      <select
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                      >
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>Database & Cloud</option>
                        <option>Architecture</option>
                      </select>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Level %"
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                    <button type="submit" className="glow-btn px-4 py-2 text-xs font-semibold text-white rounded-lg flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add Skill
                    </button>
                  </form>

                  {/* Skill List */}
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((s) => (
                      <div key={s.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{s.name}</div>
                          <div className="text-[10px] text-cyan-400 font-mono">{s.level}% • {s.category}</div>
                        </div>
                        <button
                          onClick={() => deleteSkill(s.id)}
                          className="p-1 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SERVER STATS */}
              {activeTab === 'stats' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase">Backend Telemetry</h4>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                    {JSON.stringify(stats, null, 2)}
                  </pre>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
