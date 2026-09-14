import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github, Search, Layers, X, Sparkles, Code2, Server } from 'lucide-react';

export const Projects = () => {
  const { projects } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'AI & Fullstack', 'Fullstack', 'DevOps & Cloud'];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative z-10 bg-slate-950/40 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Featured <span className="text-gradient">Engineering Projects</span>
          </h2>
          <p className="text-slate-300 text-base">
            Explore a curated selection of full-stack web applications, SaaS dashboards, and cloud platforms built with modern technology stacks.
          </p>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'glass-panel text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col glass-panel-hover group"
            >
              {/* Project Image Preview */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono text-cyan-300">
                  {project.category}
                </div>

                {project.featured && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-[10px] font-semibold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>View Architecture</span> →
                  </button>

                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                        title="View Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel max-w-3xl w-full max-h-[90vh] rounded-2xl border border-slate-800 overflow-y-auto flex flex-col p-6 relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 rounded-xl overflow-hidden mb-6 bg-slate-900 relative">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-xs font-mono text-cyan-300">
                {activeModalProject.category}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white">{activeModalProject.title}</h3>

            <div className="mt-4 text-slate-300 text-sm leading-relaxed space-y-3">
              <p>{activeModalProject.longDescription || activeModalProject.description}</p>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-end gap-4">
              {activeModalProject.github && (
                <a
                  href={activeModalProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub Repository
                </a>
              )}
              {activeModalProject.demo && (
                <a
                  href={activeModalProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-btn px-5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Launch Live Application
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
