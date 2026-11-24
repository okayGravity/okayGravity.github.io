// 3D value noise: random values at integer lattice points, smoothly blended between.

// Deterministic hash: the same (x, y, z) always gives the same pseudo-random value in [0, 1).
function hash(x: number, y: number, z: number): number {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

// Smoothstep-style easing; flattens the blend at each lattice point so no creases appear.
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function noise3(x: number, y: number, z: number): number {
  const x0 = Math.floor(x), y0 = Math.floor(y), z0 = Math.floor(z);
  const u = fade(x - x0), v = fade(y - y0), w = fade(z - z0);

  // Blend the 8 corners of the surrounding cube: along x, then y, then z.
  const c = (dx: number, dy: number, dz: number) => hash(x0 + dx, y0 + dy, z0 + dz);
  const x00 = lerp(c(0, 0, 0), c(1, 0, 0), u);
  const x10 = lerp(c(0, 1, 0), c(1, 1, 0), u);
  const x01 = lerp(c(0, 0, 1), c(1, 0, 1), u);
  const x11 = lerp(c(0, 1, 1), c(1, 1, 1), u);
  return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w);
}

// Two octaves: broad swells plus finer detail at half the weight. Output is roughly [0, 1].
export function swell(x: number, y: number, t: number): number {
  return (noise3(x, y, t) + 0.5 * noise3(x * 2.1, y * 2.1, t * 1.3 + 17)) / 1.5;
}
