import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 55 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.2,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.6 + 0.3,
      color: ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#fbbf24'][Math.floor(Math.random() * 5)]
    }));

    let mouse = { x: width / 2, y: height / 3 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 65;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Cursor Radial Glow Spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const spotlight = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 350);
        spotlight.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
        spotlight.addColorStop(0.5, 'rgba(129, 140, 248, 0.04)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interactive mouse push/pull effect
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          p.x -= (dx / dist) * 0.7;
          p.y -= (dy / dist) * 0.7;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pdist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - pdist / 130) * 0.18;
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Mesh Lighting Orbs */}
      <div className="orb-cyan top-[-10%] left-[-10%] animate-pulse-slow" />
      <div className="orb-purple top-[25%] right-[-10%] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="orb-emerald bottom-[-10%] left-[20%] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      <div className="orb-cyan bottom-[15%] right-[15%] opacity-60 animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80"
      />
    </div>
  );
};
