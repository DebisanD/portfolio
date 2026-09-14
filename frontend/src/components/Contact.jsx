import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Send, MapPin, CheckCircle, MessageSquare, AlertCircle, Loader2, Facebook } from 'lucide-react';

export const Contact = () => {
  const { sendContactMessage, profile } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setErrorMsg(res.error || 'Failed to send message.');
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 section-glow-top bg-[#070a14]/80 backdrop-blur-md border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-300 text-base">
            Interested in building a high-impact project or adding a senior engineer to your team? Send a direct message below.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                I am currently open for full-stack contract opportunities, principal engineering roles, and technical consulting.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">DIRECT EMAIL</div>
                    <a href={`mailto:${profile?.social?.email || "debisadaricha3@gmail.com"}`} className="text-white hover:text-cyan-400 font-medium">
                      {profile?.social?.email || "debisadaricha3@gmail.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Facebook className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">FACEBOOK PROFILE</div>
                    <a href={profile?.social?.facebook || "https://www.facebook.com/debisa.daricha.1"} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 font-medium">
                      facebook.com/debisa.daricha.1
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">PHONE & TELEGRAM</div>
                    <div className="text-white font-medium">
                      {profile?.social?.phone || "+251910905895 / +251918342587"}
                    </div>
                    <a href="https://t.me/Deebiisan" target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline">
                      Telegram: @Deebiisan / @Maalan Jira
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">LOCATION</div>
                    <div className="text-white font-medium">{profile?.location || "Ethiopia (Remote Ready)"}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Available for immediate start</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you for reaching out. Your message has been transmitted directly to DEBISA DARICHA DABA's inbox backend.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl font-semibold text-xs text-cyan-300 bg-slate-900 border border-slate-800 hover:border-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Job Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Message *
                    </label>
                    <textarea
                      required
                      rows="5"
                      placeholder="Tell me about your project or team needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="glow-btn w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to REST API...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
