import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAllData = async () => {
    try {
      const [resStats, resProfile, resProjects, resSkills, resExp] = await Promise.all([
        fetch('/api/stats').catch(() => null),
        fetch('/api/profile').catch(() => null),
        fetch('/api/projects').catch(() => null),
        fetch('/api/skills').catch(() => null),
        fetch('/api/experiences').catch(() => null),
      ]);

      if (resStats && resStats.ok) {
        const statsData = await resStats.json();
        setStats(statsData);
        setIsBackendConnected(true);
      } else {
        setIsBackendConnected(false);
      }

      if (resProfile && resProfile.ok) setProfile(await resProfile.json());
      if (resProjects && resProjects.ok) setProjects(await resProjects.json());
      if (resSkills && resSkills.ok) setSkills(await resSkills.json());
      if (resExp && resExp.ok) setExperiences(await resExp.json());
    } catch (err) {
      console.error('Error fetching data from backend:', err);
      setIsBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Admin authentication
  const loginAdmin = async (password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setAdminToken(data.token);
        localStorage.setItem('adminToken', data.token);
        showToast('Successfully logged in as Admin!', 'success');
        fetchMessages();
        return true;
      } else {
        showToast(data.message || 'Invalid Credentials', 'error');
        return false;
      }
    } catch (err) {
      showToast('Authentication API error', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
    showToast('Logged out from Admin CMS', 'info');
  };

  // Fetch messages for admin
  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        setMessages(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  // Contact form submission
  const sendContactMessage = async (formData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Message sent successfully!', 'success');
        fetchAllData();
        return { success: true };
      } else {
        showToast(data.error || 'Failed to send message.', 'error');
        return { success: false, error: data.error };
      }
    } catch (err) {
      showToast('Network error while sending message.', 'error');
      return { success: false, error: err.message };
    }
  };

  // Project Mutations
  const addProject = async (projectData) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      if (res.ok) {
        const newProj = await res.json();
        setProjects(prev => [newProj, ...prev]);
        showToast('New project created successfully!', 'success');
        return true;
      }
    } catch (err) {
      showToast('Error creating project', 'error');
    }
    return false;
  };

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
        showToast('Project deleted', 'info');
        return true;
      }
    } catch (err) {
      showToast('Error deleting project', 'error');
    }
    return false;
  };

  // Skill Mutations
  const addSkill = async (skillData) => {
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData)
      });
      if (res.ok) {
        const newSkill = await res.json();
        setSkills(prev => [...prev, newSkill]);
        showToast('Skill added!', 'success');
        return true;
      }
    } catch (err) {
      showToast('Error adding skill', 'error');
    }
    return false;
  };

  const deleteSkill = async (id) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSkills(prev => prev.filter(s => s.id !== id));
        showToast('Skill removed', 'info');
        return true;
      }
    } catch (err) {
      showToast('Error removing skill', 'error');
    }
    return false;
  };

  // Profile Mutation
  const updateProfile = async (profileData) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.profile || profileData);
        showToast('Profile updated successfully!', 'success');
        fetchAllData();
        return true;
      } else {
        showToast(data.error || 'Failed to update profile', 'error');
      }
    } catch (err) {
      showToast('Error updating profile', 'error');
    }
    return false;
  };

  return (
    <PortfolioContext.Provider value={{
      profile,
      projects,
      skills,
      experiences,
      stats,
      messages,
      isBackendConnected,
      loading,
      adminToken,
      toast,
      showToast,
      loginAdmin,
      logoutAdmin,
      updateProfile,
      sendContactMessage,
      fetchMessages,
      addProject,
      deleteProject,
      addSkill,
      deleteSkill,
      refreshData: fetchAllData
    }}>
      {children}
      {/* Toast Render */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border flex items-center gap-3 transition-all duration-300 ${
          toast.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' :
          toast.type === 'error' ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' :
          'bg-slate-900/80 border-cyan-500/50 text-cyan-200'
        }`}>
          <span className="text-xl">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
          </span>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
