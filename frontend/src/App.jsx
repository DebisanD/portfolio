import React, { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Rendering Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="text-rose-400 font-bold text-2xl">⚠️ Rendering Error Occurred</div>
          <p className="text-slate-300 font-mono text-xs max-w-lg bg-slate-950 p-4 rounded-xl border border-rose-500/30 text-rose-300">
            {this.state.error?.toString()}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function AppContent() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 relative selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Particle Canvas Background */}
      <ParticleCanvas />

      {/* Navigation Header */}
      <Navbar onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Main Sections */}
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Admin CMS Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ErrorBoundary>
  );
}
