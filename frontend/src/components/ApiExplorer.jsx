import React, { useState } from 'react';
import { Terminal, Play, Server, Database, Code2, Cpu, CheckCircle2, RefreshCw } from 'lucide-react';

export const ApiExplorer = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('/api/projects');
  const [responseJson, setResponseJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  const endpoints = [
    { name: 'Projects API', path: '/api/projects', method: 'GET', desc: 'Fetches all portfolio engineering projects' },
    { name: 'Profile API', path: '/api/profile', method: 'GET', desc: 'Fetches developer bio, status & social handles' },
    { name: 'Skills API', path: '/api/skills', method: 'GET', desc: 'Fetches tech stack matrix & proficiency %' },
    { name: 'Experiences API', path: '/api/experiences', method: 'GET', desc: 'Fetches career history & highlights' },
    { name: 'Server Telemetry', path: '/api/stats', method: 'GET', desc: 'Returns API server status & db connections' },
  ];

  const handleExecuteRequest = async (path = activeEndpoint) => {
    setLoading(true);
    const startTime = performance.now();
    try {
      const res = await fetch(path);
      const data = await res.json();
      const endTime = performance.now();
      setExecutionTime((endTime - startTime).toFixed(1));
      setResponseJson(data);
    } catch (err) {
      setResponseJson({ error: 'Failed to execute API request', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="api-explorer" className="py-24 relative z-10 section-glow-top bg-slate-950/60 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>LIVE REST API & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Live <span className="text-gradient">API Playground</span> & System Architecture
          </h2>
          <p className="text-slate-300 text-base">
            Test live backend endpoints in real-time and inspect the enterprise system data flow powering this application.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: System Data Flow Architecture */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Full-Stack Architecture</span>
              </h3>

              {/* Visual Flow Pipeline Nodes */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
                    <div>
                      <div className="text-white font-bold">Client Layer (React 18 + Vite)</div>
                      <div className="text-[10px] text-slate-400">Single Page App & State Management</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px]">SPA</span>
                </div>

                <div className="text-center text-cyan-400 text-sm font-bold">↓ REST HTTP / JSON</div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
                    <div>
                      <div className="text-white font-bold">API Backend (Node.js + Express)</div>
                      <div className="text-[10px] text-slate-400">REST Controller & Auth Middleware</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px]">Express</span>
                </div>

                <div className="text-center text-emerald-400 text-sm font-bold">↓ Mongoose ORM / Python Connector</div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                    <div>
                      <div className="text-white font-bold">Database & ERP Layer</div>
                      <div className="text-[10px] text-slate-400">MongoDB Database + Odoo Python Modules</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px]">MongoDB</span>
                </div>
              </div>

              {/* System Badges */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> CORS Enabled
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> MongoDB Live
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive REST API Tester */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
              
              {/* Endpoint Selector Tabs */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-emerald-400" />
                  <span>API Request Tester</span>
                </h3>

                <button
                  onClick={() => handleExecuteRequest(activeEndpoint)}
                  disabled={loading}
                  className="glow-btn px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg"
                >
                  {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>Execute Request</span>
                </button>
              </div>

              {/* Endpoint Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {endpoints.map((ep) => (
                  <button
                    key={ep.path}
                    onClick={() => {
                      setActiveEndpoint(ep.path);
                      handleExecuteRequest(ep.path);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      activeEndpoint === ep.path
                        ? 'bg-slate-900 border-cyan-500 text-cyan-300 font-bold shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{ep.method}</span>
                    </div>
                    <div className="text-xs font-mono font-bold mt-1.5 text-white truncate">{ep.path}</div>
                  </button>
                ))}
              </div>

              {/* Execution Status Bar */}
              <div className="bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 font-bold">Request:</span>
                  <span className="text-cyan-400">{activeEndpoint}</span>
                </div>
                {executionTime && (
                  <span className="text-slate-400 text-[11px]">Latency: <strong className="text-emerald-400">{executionTime} ms</strong></span>
                )}
              </div>

              {/* Terminal Output Previewer */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] p-4 text-xs font-mono min-h-[220px] max-h-[320px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-48 text-cyan-400 gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Executing HTTP GET request to backend API...</span>
                  </div>
                ) : responseJson ? (
                  <pre className="text-cyan-300 leading-relaxed">
                    {JSON.stringify(responseJson, null, 2)}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-48 text-slate-500">
                    Click "Execute Request" or pick an endpoint above to view live JSON response.
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
