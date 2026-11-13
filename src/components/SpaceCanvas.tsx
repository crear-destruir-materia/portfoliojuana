import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  /** Estrella dibujada con puntas (estilo ilustración) */
  sparkle: boolean;
  rotation: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  active: boolean;
}

/** Dibuja una estrella de 8 puntas como las de la ilustración de referencia */
function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number,
  color: string,
  alpha: number
) {
  const points = 8;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? r : r * 0.38;
    const a = (i * Math.PI) / points;
    ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
  }
  ctx.closePath();
  ctx.shadowColor = `rgba(255, 200, 61, ${alpha * 0.9})`;
  ctx.shadowBlur = r * 2.2;
  ctx.fillStyle = `rgba(${color}, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

export const SpaceCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Paleta inspirada en la ilustración: amarillos cálidos sobre azul nocturno
    const dotColors = [
      "205, 225, 255", // polvo estelar azul claro
      "150, 190, 245", // azul suave
      "255, 236, 170", // crema cálido
    ];
    const sparkleColors = ["255, 205, 64", "255, 220, 100", "255, 190, 50"];

    const starCount = Math.min(240, Math.floor((width * height) / 6500));
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const sparkle = Math.random() < 0.09;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.3,
        size: sparkle ? Math.random() * 6 + 4 : Math.random() * 1.6 + 0.4,
        color: sparkle
          ? sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
          : dotColors[Math.floor(Math.random() * dotColors.length)],
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        sparkle,
        rotation: Math.random() * Math.PI,
      };
    });

    const shootingStars: ShootingStar[] = Array.from({ length: 2 }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, length: 0, alpha: 0, active: false,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const spawnShootingStar = (s: ShootingStar) => {
      s.x = Math.random() * width * 0.85;
      s.y = Math.random() * height * 0.45;
      const angle = Math.PI / 5 + (Math.random() * 0.2 - 0.1);
      const speed = Math.random() * 8 + 9;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.length = Math.random() * 90 + 70;
      s.alpha = 1;
      s.active = true;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const offsetX = (mouseX - width / 2) * 0.02;
      const offsetY = (mouseY - height / 2) * 0.02;

      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        star.y -= 0.06 * star.z;
        if (star.y < -20) star.y = height + 20;

        const sx = (star.x + offsetX * star.z + width) % width;
        const sy = (star.y + offsetY * star.z + height) % height;
        const alpha = 0.4 + 0.6 * Math.abs(Math.sin(star.twinklePhase));

        if (star.sparkle) {
          star.rotation += 0.002;
          const r = star.size * (0.85 + 0.15 * Math.sin(star.twinklePhase));
          drawSparkle(ctx, sx, sy, r, star.rotation, star.color, alpha);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${(alpha * 0.85).toFixed(2)})`;
          ctx.fill();
        }

        const dx = sx - mouseX;
        const dy = sy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(255, 210, 80, ${((1 - dist / 130) * 0.25).toFixed(2)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      for (const s of shootingStars) {
        if (!s.active && Math.random() < 0.003) spawnShootingStar(s);
        if (!s.active) continue;
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.015;
        if (s.alpha <= 0 || s.x > width || s.y > height) {
          s.active = false;
          continue;
        }
        const tailX = s.x - (s.vx / 12) * s.length;
        const tailY = s.y - (s.vy / 12) * s.length;
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 248, 220, ${s.alpha})`);
        grad.addColorStop(0.4, `rgba(255, 200, 61, ${s.alpha * 0.7})`);
        grad.addColorStop(1, "rgba(50, 110, 210, 0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
