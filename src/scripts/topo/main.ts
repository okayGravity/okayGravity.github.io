import { swell } from './noise';
import { Water } from './water';
import { traceContours } from './contours';

const CELL = 12; // grid spacing in CSS pixels
const FPS = 30;
const NOISE_SCALE = 1 / 250; // larger divisor = broader swells
const SWELL_SPEED = 0.025; // noise units per second; lines drift ~1/3 of a contour gap per second
const RIPPLE_GAIN = 0.00095; // ripple peaks ~12 → ~0.18 height, about 3 contour levels
const LEVELS = Array.from({ length: 13 }, (_, i) => 0.14 + i * 0.06);

export function startTopoWater(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const color = getComputedStyle(document.documentElement).getPropertyValue('--red').trim();

  let cols = 0;
  let rows = 0;
  let field = new Float32Array(0);
  let water = new Water(1, 1);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Backing store at device resolution keeps lines crisp; CSS size stays at w × h.
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.ceil(w / CELL) + 2;
    rows = Math.ceil(h / CELL) + 2;
    field = new Float32Array(cols * rows);
    water = new Water(cols, rows);
  }

  function draw(seconds: number) {
    const t = seconds * SWELL_SPEED;
    const ripples = water.heights;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        field[i] = swell(x * CELL * NOISE_SCALE, y * CELL * NOISE_SCALE, t) + ripples[i] * RIPPLE_GAIN;
      }
    }

    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.beginPath();
    for (const level of LEVELS) traceContours(ctx!, field, cols, rows, CELL, level);
    ctx!.strokeStyle = color;
    ctx!.lineWidth = 1;
    ctx!.stroke();
  }

  // --- Pointer input: track position; the sim step turns movement into ripples. ---
  let pointer: { x: number; y: number } | null = null;
  let lastPointer: { x: number; y: number } | null = null;

  function onMove(e: PointerEvent) {
    pointer = { x: e.clientX, y: e.clientY };
  }

  function onTap(e: PointerEvent) {
    if (e.pointerType !== 'touch') return;
    water.disturb(e.clientX / CELL, e.clientY / CELL, 40, 2.5);
  }

  function applyPointer() {
    if (!pointer) return;
    if (lastPointer) {
      const dx = pointer.x - lastPointer.x;
      const dy = pointer.y - lastPointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.5) {
        // Stamp along the path so fast moves leave a continuous wake, not dots.
        const steps = Math.max(1, Math.ceil(dist / CELL));
        const strength = Math.min(dist, 120) * 0.25 / steps;
        for (let s = 1; s <= steps; s++) {
          const f = s / steps;
          water.disturb(
            (lastPointer.x + dx * f) / CELL,
            (lastPointer.y + dy * f) / CELL,
            strength,
          );
        }
      }
    }
    lastPointer = pointer;
  }

  // --- Animation loop, capped at FPS. ---
  let rafId = 0;
  let lastFrame = 0;
  const frameMs = 1000 / FPS;

  function frame(now: number) {
    rafId = requestAnimationFrame(frame);
    if (now - lastFrame < frameMs) return;
    lastFrame = now;
    applyPointer();
    water.step();
    draw(now / 1000);
  }

  function play() {
    if (rafId === 0) rafId = requestAnimationFrame(frame);
  }

  function pause() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    lastPointer = null;
  }

  function applyMotionPreference() {
    if (reduceMotion.matches) {
      pause();
      draw(0);
    } else {
      play();
    }
  }

  resize();
  draw(0);

  let resizeQueued = false;
  window.addEventListener('resize', () => {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      resize();
      draw(performance.now() / 1000);
    });
  });

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onTap, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else applyMotionPreference();
  });
  reduceMotion.addEventListener('change', applyMotionPreference);

  applyMotionPreference();
}
