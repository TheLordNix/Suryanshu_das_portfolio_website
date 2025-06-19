export let nightMode = false;

export function setNightMode(value) {
  nightMode = value;
}

export function generateParticles(count, width, height) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      l: Math.random() * 1 + 15,
      xs: -4 + Math.random() * 2 + 2,
      ys: Math.random() * 2 + 5,
    });
  }
  return particles;
}

// Only interact with visible grid buttons and SlideInBox
export function getBoxTops() {
  const tops = [];
  // All grid buttons (mobile)
  document.querySelectorAll(".rain-hitbox").forEach((btn) => {
    if (btn.offsetParent !== null) {
      const rect = btn.getBoundingClientRect();
      tops.push({ left: rect.left, right: rect.right, top: rect.top });
    }
  });
  // SlideInBox (mobile)
  const slideSheet = document.querySelector(".slide-in-sheet");
  if (slideSheet && slideSheet.offsetParent !== null) {
    const rect = slideSheet.getBoundingClientRect();
    tops.push({ left: rect.left, right: rect.right, top: rect.top });
  }
  // Desktop draggable box (optional, if you use it)
  const draggableBox = document.getElementById("draggable-box");
  if (draggableBox && draggableBox.style.display !== "none") {
    const rect = draggableBox.getBoundingClientRect();
    tops.push({ left: rect.left, right: rect.right, top: rect.top });
  }
  return tops;
}

export function drawSplats(ctx, splats, type) {
  for (let i = splats.length - 1; i >= 0; i--) {
    const s = splats[i];
    if (s.on !== type) continue;

    ctx.save();
    ctx.globalAlpha = s.life / s.maxLife;

    const lines = 7;
    const angleStep = (2 * Math.PI) / lines;

    for (let j = 0; j < lines; j++) {
      const angle = j * angleStep;
      const r = s.radius * 1.5 * (1 - s.life / s.maxLife);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + Math.cos(angle) * r, s.y + Math.sin(angle) * r);
      ctx.strokeStyle = nightMode
        ? "rgba(221,221,221,0.8)"
        : "rgba(30,144,255,0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();
    s.life--;
    if (s.life <= 0) splats.splice(i, 1);
  }
}