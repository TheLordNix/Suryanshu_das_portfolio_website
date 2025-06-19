import { useEffect, useRef } from "react";
import {
  drawSplats,
  getBoxTops,
  generateParticles,
  setNightMode,
} from "../utils/rainUtils";

const RainCanvas = ({ rainActive, nightMode }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particles = useRef([]);
  const splats = useRef([]);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const baseCount = 40;
    const count = nightMode ? Math.ceil(baseCount * 1.1) : baseCount;
    particles.current = generateParticles(count, W, H);
  }, [nightMode]);

  useEffect(() => {
    setNightMode(nightMode);
  }, [nightMode]);

  function drawRain(ctx, W, H) {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = nightMode
      ? "rgba(255,255,255,0.8)"
      : "rgba(85, 170, 255, 0.8)";
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";

    const padding = 10;

    for (let p of particles.current) {
      if (
        p.x < -padding ||
        p.x > W + padding ||
        p.y < -padding * 3 ||
        p.y > H + padding
      )
        continue;

      const startX = Math.min(Math.max(p.x, padding), W - padding);
      const startY = Math.min(Math.max(p.y, -padding * 3), H - padding);

      const endX = startX + (p.l * p.xs) / 10;
      const endY = startY + (p.l * p.ys) / 10;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    drawSplats(ctx, splats.current, "rain");
  }

  function moveRain(W, H) {
    const tops = getBoxTops();
    const borderRadius = 16;

    for (let p of particles.current) {
      p.x += p.xs;
      p.y += p.ys;

      let hit = false;
      for (const box of tops) {
        if (
          p.y + (p.l * p.ys) / 10 >= box.top &&
          p.x >= box.left + borderRadius &&
          p.x <= box.right - borderRadius
        ) {
          splats.current.push({
            x: p.x,
            y: box.top,
            radius: 12,
            life: 20,
            maxLife: 20,
            on: "rain",
          });
          p.x = Math.random() * W;
          p.y = -20;
          hit = true;
          break;
        }
      }

      if (!hit && (p.x > W || p.y > H)) {
        p.x = Math.random() * W;
        p.y = -20;
      }
    }
  }

  function animate(ctx, W, H) {
    drawRain(ctx, W, H);
    moveRain(W, H);
    animationRef.current = requestAnimationFrame(() => animate(ctx, W, H));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (rainActive) {
      animate(ctx, canvas.width, canvas.height);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [rainActive, nightMode]);

  return (
    <canvas
      id="rain-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 w-full h-full"
      style={{
        backgroundColor: "transparent",       // Let wave show behind
        zIndex: nightMode ? 10 : 0,            // Only on top in night mode
      }}
    />
  );
};

export default RainCanvas;
