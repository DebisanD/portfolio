import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "DEBISA engineered the AgriLink Ethiopia platform with exceptional accuracy and speed. His understanding of full-stack REST API architecture, database optimization, and responsive design was crucial for connecting Ethiopian agricultural producers with regional buyers.",
      author: "Abebe Tadesse",
      role: "Agricultural Tech Consultant & Client",
      company: "AgriTech Systems Ethiopia",
      rating: 5
    },
    {
      id: 2,
      quote: "Working with DEBISA on custom Odoo ERP module integrations was seamless. He engineered Python REST APIs and business automation triggers that increased operational speed significantly.",
      author: "Kizito Osei",
      role: "Senior ERP Solutions Architect",
      company: "Enterprise ERP Solutions",
      rating: 5
    },
    {
      id: 3,
      quote: "Debisa is a standout software developer from Dambi Dollo University. His Job Portal System showed advanced technical maturity in multi-role security, candidate tracking, and backend performance.",
      author: "Dr. Lensa Bekele",
      role: "Computer Science Faculty Lead",
      company: "Dambi Dollo University",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative z-10 section-glow-top bg-slate-950/60 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Quote className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS & REVIEWS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Client & Peer <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-slate-300 text-base">
            Feedback from enterprise partners, university faculty, and software development leads.
          </p>
        </div>

        {/* Testimonial Slider Card */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 relative shadow-2xl">
            <Quote className="w-12 h-12 text-cyan-500/20 absolute top-6 right-8 pointer-events-none" />

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote Body */}
            <blockquote className="text-lg md:text-xl text-slate-100 font-normal leading-relaxed italic">
              "{current.quote}"
            </blockquote>

            {/* Author Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-base font-bold text-white">{current.author}</div>
                <div className="text-xs text-cyan-400 font-mono">{current.role} • <span className="text-slate-400">{current.company}</span></div>
              </div>

              {/* Slider Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                  title="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-2">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                  title="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
