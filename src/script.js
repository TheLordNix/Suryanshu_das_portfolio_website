let newX=0, newY=0, startX=0, startY=0;
let isDragging = false;
const topBar2 = document.getElementById("topBar2");
const draggableBox = document.getElementById("draggable-box");

topBar2.addEventListener("mousedown", mouseDown);

function mouseDown(e) {
  e.preventDefault();
  isDragging = true;

  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  if (!isDragging) return;

  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  draggableBox.style.left = (draggableBox.offsetLeft - newX) + "px";
  draggableBox.style.top = (draggableBox.offsetTop - newY) + "px";
}

function mouseUp() {
  isDragging = false;

  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);
}

document.querySelectorAll('.toggle-education').forEach(el => {
  el.addEventListener("click", function() {
    const box = document.getElementById("draggable-box");
    if (box.style.display === "none" || box.style.display === "") {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });
});

let rainActive = true;
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

const waveCanvas = document.getElementById('wave-canvas');
const waveCtx = waveCanvas.getContext('2d');
let waveW = window.innerWidth;
let waveH = 80;
waveCanvas.width = waveW;
waveCanvas.height = waveH;


window.addEventListener('resize', () => {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  waveW = window.innerWidth;
  waveCanvas.width = waveW;
});

function getWaveYAtX(x) {
  return waveAmplitude * Math.sin((x * waveLength) + waveOffset) + waveH / 2;
}

let splats = [];
function drawSplats(ctxToUse, type) {
  for (let i = splats.length - 1; i >= 0; i--) {
    let s = splats[i];
    if (s.on !== type) continue;
    ctxToUse.save();
    ctxToUse.globalAlpha = s.life / s.maxLife;
    let lines = 8;
    let angleStep = (2 * Math.PI) / lines;
    for (let j = 0; j < lines; j++) {
      let angle = j * angleStep;
      let r = s.radius * 1.5 * (1 - s.life / s.maxLife);
      ctxToUse.beginPath();
      ctxToUse.moveTo(s.x, s.y);
      ctxToUse.lineTo(s.x + Math.cos(angle) * r, s.y + Math.sin(angle) * r);
      ctxToUse.strokeStyle = "rgba(30,144,255,0.8)";
      ctxToUse.lineWidth = 2;
      ctxToUse.stroke();
    }
    ctxToUse.restore();
    s.life--;
    if (s.life <= 0) splats.splice(i, 1);
  }
}

function getBoxTops() {
  const homeBox = document.querySelector('.bg-white.shadow-lg');
  const draggableBox = document.getElementById('draggable-box');
  const tops = [];
  if (homeBox && homeBox.offsetParent !== null) {
    const rect = homeBox.getBoundingClientRect();
    tops.push({left: rect.left, right: rect.right, top: rect.top});
  }
  if (draggableBox && draggableBox.style.display !== "none") {
    const rect = draggableBox.getBoundingClientRect();
    tops.push({left: rect.left, right: rect.right, top: rect.top});
  }
  return tops;
}

let mp = 100;
let particles = [];
for(let i = 0; i < mp; i++) {
  particles.push({
    x: Math.random()*W,
    y: Math.random()*H,
    l: Math.random()*1 + 15,
    xs: -4 + Math.random()*2 + 2,
    ys: Math.random()*2 + 5
  });
}

function drawRain() {
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(30,144,255,0.8)";
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  for(let i = 0; i < mp; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + p.l * p.xs / 10, p.y + p.l * p.ys / 10);
    ctx.stroke();
  }
  drawSplats(ctx, 'rain');
  moveRain();
}

let waveAmplitude = 18;
let waveLength = 0.015;
let waveSpeed = 0.02;
let waveOffset = 0;

function drawWave() {
  waveCtx.clearRect(0, 0, waveW, waveH);
  waveCtx.beginPath();
  for (let x = 0; x <= waveW; x++) {
    let y = waveAmplitude * Math.sin((x * waveLength) + waveOffset) + waveH / 2;
    if (x === 0) {
      waveCtx.moveTo(x, y);
    } else {
      waveCtx.lineTo(x, y);
    }
  }
  waveCtx.lineTo(waveW, waveH);
  waveCtx.lineTo(0, waveH);
  waveCtx.closePath();
  waveCtx.fillStyle = "#3b82f6";
  waveCtx.globalAlpha = 0.7;
  waveCtx.fill();
  waveCtx.globalAlpha = 1;
  drawSplats(waveCtx, 'wave');
}

function animateWave() {
  waveOffset += waveSpeed;
  drawWave();
  requestAnimationFrame(animateWave);
}
animateWave();

function moveRain() {
  const tops = getBoxTops();
  const borderRadius = 16;
  for(let i = 0; i < mp; i++) {
    let p = particles[i];
    p.x += p.xs;
    p.y += p.ys;

    let hit = false;
    for (const box of tops) {
      if (
        p.y + p.l * p.ys / 10 >= box.top &&
        p.x >= box.left + borderRadius &&
        p.x <= box.right - borderRadius
      ) {
        splats.push({
          x: p.x,
          y: box.top,
          radius: 12,
          life: 20,
          maxLife: 20,
          on: 'rain'
        });
        p.x = Math.random()*W;
        p.y = -20;
        hit = true;
        break;
      }
    }

    const waveCanvasTop = window.innerHeight - waveH;
    const waveY = getWaveYAtX(p.x);
    const waveSurfaceY = waveCanvasTop + waveY;

    if (!hit && p.y + p.l * p.ys / 10 >= waveSurfaceY) {
      splats.push({
        x: p.x,
        y: waveY,
        radius: 12,
        life: 20,
        maxLife: 20,
        on: 'wave'
      });
      p.x = Math.random()*W;
      p.y = -20;
    } else if (!hit && (p.x > W || p.y > H)) {
      p.x = Math.random()*W;
      p.y = -20;
    }
  }
}

let rainAnimation;
function animateRain() {
  if (rainActive) {
    drawRain();
    rainAnimation = requestAnimationFrame(animateRain);
  } else {
    ctx.clearRect(0, 0, W, H);
    cancelAnimationFrame(rainAnimation);
  }
}
animateRain();

document.getElementById('toggle-rain').addEventListener('click', function() {
  rainActive = !rainActive;
  if (rainActive) animateRain();
  else ctx.clearRect(0, 0, W, H);
});