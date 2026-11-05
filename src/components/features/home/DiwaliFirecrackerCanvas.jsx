import React, { useEffect, useRef } from "react";

/**
 * High-performance, lightweight Diwali firecracker & firework particle canvas.
 * Spawns periodic golden, amber, and warm orange fireworks and sparklers.
 * Allows interactive clicks to burst celebratory fireworks!
 */
const DiwaliFirecrackerCanvas = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let isRunning = true;
    let lastSpawnTime = 0;
    const spawnInterval = 2200; // Launch a firework every ~2.2 seconds

    let rockets = [];
    let particles = [];

    // Resize canvas to parent bounds
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Radiant royal festive fireworks: 24k Gold, Ruby Red, Warm Amber & Sparkle White
    const FESTIVE_COLORS = [
      "#FFD700", // 24k Brilliant Gold
      "#FFF380", // Champagne Gold Sparkle
      "#F59E0B", // Amber Gold
      "#EF4444", // Festive Ruby Red
      "#DC2626", // Crimson Red
      "#FB923C", // Warm Festive Orange
      "#FFFFFF", // Sparkle White
    ];

    class Rocket {
      constructor(targetX, targetY) {
        const rect = canvas.getBoundingClientRect();
        this.x = targetX !== undefined ? targetX : Math.random() * (rect.width * 0.8) + rect.width * 0.1;
        this.y = rect.height + 10;
        this.targetY = targetY !== undefined ? targetY : Math.random() * (rect.height * 0.45) + rect.height * 0.1;
        this.speed = Math.random() * 3 + 5;
        this.color = FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];
        this.trail = [];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: 0.8 });
        if (this.trail.length > 5) this.trail.shift();

        this.y -= this.speed;
        this.x += (Math.random() - 0.5) * 1; // Slight wobble
        return this.y <= this.targetY;
      }

      draw() {
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          ctx.beginPath();
          ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = (i / this.trail.length) * 0.6;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF";
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color || FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 4 + 1.2;
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.radius = Math.random() * 2 + 1;
        this.gravity = 0.04;
      }

      update() {
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        return this.alpha <= 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    const explode = (x, y, count = 35) => {
      const color = FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Click handler to launch an instant firework
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.x;
      const y = e.clientY - rect.y;
      explode(x, y, 45);
    };

    canvas.addEventListener("click", handleCanvasClick);

    // Animation Loop
    const animate = (timestamp) => {
      if (!isRunning) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Periodically spawn new rockets
      if (timestamp - lastSpawnTime > spawnInterval) {
        rockets.push(new Rocket());
        // Randomly launch a second companion firecracker
        if (Math.random() > 0.4) {
          setTimeout(() => {
            if (isRunning) rockets.push(new Rocket());
          }, 400);
        }
        lastSpawnTime = timestamp;
      }

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];
        const reachedTarget = rocket.update();
        rocket.draw();

        if (reachedTarget) {
          explode(rocket.x, rocket.y, 35);
          rockets.splice(i, 1);
        }
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dead = p.update();
        if (dead) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-auto cursor-default z-10 ${className}`}
    />
  );
};

export default DiwaliFirecrackerCanvas;

