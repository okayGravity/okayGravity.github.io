// Marching squares: for each grid cell, decide where the contour line crosses its edges.

interface PathSink {
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
}

// Edges: 0 = top, 1 = right, 2 = bottom, 3 = left. Each pair of entries is one line segment.
// Index bits: top-left = 8, top-right = 4, bottom-right = 2, bottom-left = 1 (bit set = above level).
// Cases 5 and 10 are ambiguous "saddles"; we pick one resolution, which is fine for decoration.
const SEGMENTS: readonly number[][] = [
  [], [3, 2], [2, 1], [3, 1],
  [0, 1], [3, 0, 2, 1], [0, 2], [3, 0],
  [3, 0], [0, 2], [0, 1, 3, 2], [0, 1],
  [3, 1], [2, 1], [3, 2], [],
];

export function traceContours(
  out: PathSink,
  field: Float32Array,
  cols: number,
  rows: number,
  cellSize: number,
  level: number,
) {
  // Where between a and b does the value equal `level`? 0 = at a, 1 = at b.
  const t = (a: number, b: number) => (level - a) / (b - a);

  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols - 1; x++) {
      const i = y * cols + x;
      const tl = field[i];
      const tr = field[i + 1];
      const br = field[i + cols + 1];
      const bl = field[i + cols];

      const index =
        (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
      const segs = SEGMENTS[index];
      if (segs.length === 0) continue;

      // Interpolated crossing point on each edge, in pixels.
      const px = x * cellSize;
      const py = y * cellSize;
      const edgePoint = (edge: number): [number, number] => {
        switch (edge) {
          case 0: return [px + t(tl, tr) * cellSize, py];
          case 1: return [px + cellSize, py + t(tr, br) * cellSize];
          case 2: return [px + t(bl, br) * cellSize, py + cellSize];
          default: return [px, py + t(tl, bl) * cellSize];
        }
      };

      for (let s = 0; s < segs.length; s += 2) {
        const [ax, ay] = edgePoint(segs[s]);
        const [bx, by] = edgePoint(segs[s + 1]);
        out.moveTo(ax, ay);
        out.lineTo(bx, by);
      }
    }
  }
}
