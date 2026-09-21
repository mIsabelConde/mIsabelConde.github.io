import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  energy: number;
}

interface SynapseSignal {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

interface CyberBackgroundProps {
  isMatrixMode?: boolean;
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ isMatrixMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      isActive: false
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const colors = [
      'rgba(0, 243, 255, 0.85)', // Cyan
      'rgba(0, 255, 102, 0.85)', // Green
      'rgba(59, 130, 246, 0.85)', // Blue
      'rgba(168, 85, 247, 0.75)'  // Purple
    ];

    let particles: Particle[] = [];
    let signals: SynapseSignal[] = [];

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 14000), 75);
      particles = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 1.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.65,
          vy: (Math.random() - 0.5) * 0.65,
          radius,
          baseRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          energy: Math.random()
        });
      }
      signals = [];
    };

    initParticles();

    // Signal spawner for neural impulses
    let lastSignalTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Spawn neural pulse signals periodically
      if (time - lastSignalTime > 320 && particles.length > 5) {
        lastSignalTime = time;
        const fromIdx = Math.floor(Math.random() * particles.length);
        // Find a nearby particle
        for (let j = 0; j < particles.length; j++) {
          if (fromIdx !== j) {
            const dx = particles[fromIdx].x - particles[j].x;
            const dy = particles[fromIdx].y - particles[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < 130 && dist > 20) {
              signals.push({
                fromIndex: fromIdx,
                toIndex: j,
                progress: 0,
                speed: 0.025 + Math.random() * 0.02,
                color: Math.random() > 0.4 ? '#00f3ff' : '#00ff66'
              });
              break;
            }
          }
        }
      }

      // Update & draw particles
      const connectionDist = 135;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 3;
            p.y -= Math.sin(angle) * force * 3;
            p.radius = p.baseRadius * 1.8;
          } else {
            p.radius = p.baseRadius;
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect with nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw neural signals travelling on lines
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1 || !particles[sig.fromIndex] || !particles[sig.toIndex]) {
          signals.splice(s, 1);
          continue;
        }

        const pA = particles[sig.fromIndex];
        const pB = particles[sig.toIndex];
        const curX = pA.x + (pB.x - pA.x) * sig.progress;
        const curY = pA.y + (pB.y - pA.y) * sig.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = sig.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
      style={{ display: 'block' }}
    />
  );
};
