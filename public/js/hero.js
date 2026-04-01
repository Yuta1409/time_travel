// ============================================
// TIMETRAVEL AGENCY — Hero Canvas Particles
// ============================================

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouseX = -1000;
  let mouseY = -1000;

  // ── Resize ──
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  }

  // ── Particle class ──
  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 2 + 0.3;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.opacity = Math.random() * 0.7 + 0.1;
      this.opacitySpeed = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1);
      this.minOpacity = 0.05;
      this.maxOpacity = Math.random() * 0.8 + 0.2;
      // Gold color variations
      const hue = Math.random() * 20 + 38; // 38-58 (gold range)
      const sat = Math.random() * 20 + 60; // 60-80%
      const light = Math.random() * 20 + 55; // 55-75%
      this.color = `hsl(${hue}, ${sat}%, ${light}%)`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.opacitySpeed;

      if (this.opacity <= this.minOpacity || this.opacity >= this.maxOpacity) {
        this.opacitySpeed *= -1;
      }

      // Mouse repulsion (subtle)
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x += dx * force * 0.02;
        this.y += dy * force * 0.02;
      }

      // Reset when out of bounds
      if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.size > 1.5 ? 6 : 0;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ── Shooting star ──
  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width * 0.7;
      this.y = Math.random() * canvas.height * 0.3;
      this.length = Math.random() * 80 + 40;
      this.speed = Math.random() * 6 + 4;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      this.opacity = 0;
      this.phase = 'in'; // 'in' | 'out'
      this.maxOpacity = Math.random() * 0.6 + 0.3;
      this.active = false;
      this.timer = Math.random() * 300 + 100; // frames until next
    }

    update() {
      if (!this.active) {
        this.timer--;
        if (this.timer <= 0) {
          this.active = true;
          this.reset();
          this.active = true;
          this.opacity = 0;
          this.phase = 'in';
        }
        return;
      }

      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      if (this.phase === 'in') {
        this.opacity += 0.08;
        if (this.opacity >= this.maxOpacity) this.phase = 'out';
      } else {
        this.opacity -= 0.04;
        if (this.opacity <= 0) {
          this.active = false;
          this.timer = Math.random() * 400 + 200;
        }
      }
    }

    draw() {
      if (!this.active || this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.opacity;
      const grad = ctx.createLinearGradient(
        this.x, this.y,
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      grad.addColorStop(0, '#e4c98b');
      grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      ctx.stroke();
      ctx.restore();
    }
  }

  let shootingStars = [];

  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 200);
    particles = Array.from({ length: count }, () => new Particle());
    shootingStars = Array.from({ length: 3 }, () => new ShootingStar());
  }

  // ── Animation loop ──
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    shootingStars.forEach(s => {
      s.update();
      s.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  // ── Mouse tracking ──
  document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  // ── Init ──
  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas.parentElement);
  resize();
  animate();

  // ── Cleanup on hidden ──
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

})();
