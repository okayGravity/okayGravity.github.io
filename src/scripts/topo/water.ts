// Damped 2D wave simulation on a grid, using the classic two-buffer ripple method.
export class Water {
  readonly cols: number;
  readonly rows: number;
  private cur: Float32Array;
  private prev: Float32Array;

  // damping^frames = remaining amplitude. 0.9^30 ≈ 0.04, so ripples fade in ~1s at 30fps.
  constructor(cols: number, rows: number, private damping = 0.9) {
    this.cols = cols;
    this.rows = rows;
    this.cur = new Float32Array(cols * rows);
    this.prev = new Float32Array(cols * rows);
  }

  get heights(): Float32Array {
    return this.cur;
  }

  // Push the surface down in a soft circle around (cx, cy), in grid units.
  disturb(cx: number, cy: number, strength: number, radius = 2) {
    const { cols, rows } = this;
    const r = Math.ceil(radius);
    for (let y = Math.floor(cy) - r; y <= Math.floor(cy) + r; y++) {
      if (y < 1 || y >= rows - 1) continue;
      for (let x = Math.floor(cx) - r; x <= Math.floor(cx) + r; x++) {
        if (x < 1 || x >= cols - 1) continue;
        const d = Math.hypot(x - cx, y - cy) / radius;
        if (d < 1) this.cur[y * cols + x] -= strength * (1 - d * d);
      }
    }
  }

  step() {
    const { cols, rows, cur, prev, damping } = this;
    // Borders are skipped and stay 0, which keeps every neighbor lookup in bounds.
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        const i = y * cols + x;
        const neighbors = cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols];
        // New height = neighbor average pulled forward, minus where we were last step.
        prev[i] = (neighbors / 2 - prev[i]) * damping;
      }
    }
    // The buffer we just wrote becomes "current"; the old current becomes "previous".
    this.prev = cur;
    this.cur = prev;
  }
}
