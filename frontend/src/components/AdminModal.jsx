import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Shield, X, Plus, Trash2, Mail, Layers, Cpu, Server, Lock, User, Save, Loader2 } from 'lucide-react';

export const AdminModal = ({ isOpen, onClose }) => {
  const {
    adminToken,
    loginAdmin,
    logoutAdmin,
    profile,
    updateProfile,
    messages,
    fetchMessages,
    projects,
    addProject,
    deleteProject,
    skills,
    addSkill,
    deleteSkill,
    stats
  } = usePortfolio();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: '',
    title: '',
    status: '',
    location: '',
    avatar: '',
    tagline: '',
    about: '',
    social: {
      github: '',
      facebook: '',
      telegram: '',
      telegram2: '',
      phone: '',
      email: ''
    }
  });

  // New Project Form State
  const [newProj, setNewProj] = useState({
    title: '',
    category: 'Fullstack Web App',
    description: '',
    longDescription: '',
    tags: '',
    image: '/images/project_job_portal.jpg',
    github: 'https://github.com/DebisanD',
    demo: 'https://github.com/DebisanD'
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
      if (profile) {
        setProfileForm({
          name: profile.name || '',
          title: profile.title || '',
          status: profile.status || '',
          location: profile.location || '',
          avatar: profile.avatar || '',
          tagline: profile.tagline || '',
          about: profile.about || '',
          social: {
            github: profile.social?.github || '',
            facebook: profile.social?.facebook || '',
            telegram: profile.social?.telegram || '',
            telegram2: profile.social?.telegram2 || '',
            phone: profile.social?.phone || '',
            email: profile.social?.email || ''
          }
        });
      }
    }
  }, [isOpen, adminToken, profile]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginAdmin(password);
    setLoading(false);
    setPassword('');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    await updateProfile(profileForm);
    setSavingProfile(false);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const tagArray = newProj.tags.split(',').map(t => t.trim()).filter(Boolean);
    const success = await addProject({ ...newProj, tags: tagArray });
    if (success) {
      setNewProj({
        title: '',
        category: 'Fullstack Web App',
        description: '',
        longDescription: '',
        tags: '',
        image: '/images/project_job_portal.jpg',
        github: 'https://github.com/DebisanD',
        demo: 'https://github.com/DebisanD'
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
              Enter admin password to edit profile, manage projects, skills, and view contact form messages.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">ADMIN PASSWORD</label>
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
                className="glow-btn w-full py-2.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login to Admin Panel'}
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Navigation */}
            <div className="bg-slate-900/50 px-6 py-2 border-b border-slate-800 flex items-center gap-3 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeTab === 'profile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>

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
              
              {/* TAB: EDIT PROFILE */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono uppercase">Developer Profile Settings</h4>
                      <p className="text-xs text-slate-400">Update personal information, social handles, and avatar image.</p>
                    </div>
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="glow-btn px-5 py-2 text-xs font-semibold text-white rounded-xl flex items-center gap-2"
                    >
                      {savingProfile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Profile Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">FULL NAME</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">JOB TITLE & SPECIALIZATION</label>
                      <input
                        type="text"
                        required
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">AVAILABILITY STATUS PILL</label>
                      <input
                        type="text"
                        value={profileForm.status}
                        onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">LOCATION</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">AVATAR IMAGE URL / PATH</label>
                      <input
                        type="text"
                        value={profileForm.avatar}
                        onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">HERO TAGLINE</label>
                      <textarea
                        rows="2"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">ABOUT SUMMARY</label>
                      <textarea
                        rows="3"
                        value={profileForm.about}
                        onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 resize-none"
                      />
                    </div>

                    {/* Social Handles */}
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">CONTACT EMAIL</label>
                      <input
                        type="email"
                        value={profileForm.social.email}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          social: { ...profileForm.social, email: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">PHONE NUMBER(S)</label>
                      <input
                        type="text"
                        value={profileForm.social.phone}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          social: { ...profileForm.social, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">GITHUB URL</label>
                      <input
                        type="text"
                        value={profileForm.social.github}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          social: { ...profileForm.social, github: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">FACEBOOK URL</label>
                      <input
                        type="text"
                        value={profileForm.social.facebook}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          social: { ...profileForm.social, facebook: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">TELEGRAM HANDLE 1</label>
                      <input
                        type="text"
                        value={profileForm.social.telegram}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          social: { ...profileForm.social, telegram: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">TELEGRAM HANDLE 2</label>
                      <input
                        type="text"
                        value={profileForm.social.telegram2}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          social: { ...profileForm.social, telegram2: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="glow-btn px-6 py-2.5 text-xs font-semibold text-white rounded-xl flex items-center gap-2 shadow-lg"
                    >
                      {savingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB: INBOX MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-mono uppercase">Contact Form Submissions</h4>
                    <span className="text-xs text-slate-400 font-mono">{messages.length} messages received</span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs font-mono bg-slate-950/40 rounded-xl border border-slate-800">
                      No messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m, idx) => (
                        <div key={m.id || m._id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">{m.name} ({m.email})</span>
                            <span className="text-[10px] font-mono text-slate-400">{m.date ? new Date(m.date).toLocaleDateString() : 'Recent'}</span>
                          </div>
                          {m.subject && <div className="text-xs font-semibold text-cyan-300">Subject: {m.subject}</div>}
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: MANAGE PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Create Form */}
                  <form onSubmit={handleCreateProject} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-left">
                    <h5 className="text-xs font-bold text-cyan-400 font-mono uppercase">Add New Project</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        <option>Fullstack Web App</option>
                        <option>AgriTech & Web</option>
                        <option>Enterprise ERP</option>
                        <option>DevOps & Cloud</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Short Description"
                        required
                        value={newProj.description}
                        onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white md:col-span-2"
                      />
                      <input
                        type="text"
                        placeholder="Tags (comma separated: React, Node.js)"
                        value={newProj.tags}
                        onChange={(e) => setNewProj({ ...newProj, tags: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Image URL (/images/project_job_portal.jpg)"
                        value={newProj.image}
                        onChange={(e) => setNewProj({ ...newProj, image: e.target.value })}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                    <button type="submit" className="glow-btn px-4 py-2 text-xs font-semibold text-white rounded-lg flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </form>

                  {/* Project List */}
                  <div className="space-y-3">
                    {projects.map((p, idx) => (
                      <div key={p.id || p._id || idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{p.title}</div>
                          <div className="text-[10px] text-slate-400">{p.category} • {p.tags?.join(', ')}</div>
                        </div>
                        <button
                          onClick={() => deleteProject(p.id || p._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: MANAGE SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {/* Create Skill */}
                  <form onSubmit={handleCreateSkill} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-left">
                    <h5 className="text-xs font-bold text-cyan-400 font-mono uppercase">Add New Skill</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    {skills.map((s, idx) => (
                      <div key={s.id || s._id || idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{s.name}</div>
                          <div className="text-[10px] text-cyan-400 font-mono">{s.level}% • {s.category}</div>
                        </div>
                        <button
                          onClick={() => deleteSkill(s.id || s._id)}
                          className="p-1 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SERVER STATS */}
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
