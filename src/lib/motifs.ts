// Geometry helpers that generate SVG path data for the site's ornaments.
// The yantra and emblems are built from these — no raster images.

const f = (n: number) => +n.toFixed(2);
const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [f(r * Math.cos(a)), f(r * Math.sin(a))] as const;
};

/** A single petal pointing up (negative y), from inner radius r0 to tip r1. */
export function petal(r0: number, r1: number, w: number): string {
  const h = r1 - r0;
  return `M0,${-r0} C${w / 2},${-(r0 + h * 0.25)} ${w / 2},${-(r0 + h * 0.75)} 0,${-r1} C${-w / 2},${-(r0 + h * 0.75)} ${-w / 2},${-(r0 + h * 0.25)} 0,${-r0}Z`;
}

/** A lotus petal with a curled ogee tip. */
export function lotus(r0: number, r1: number, w: number): string {
  const h = r1 - r0;
  return `M0,${-r0} C${w * 0.7},${-(r0 + h * 0.2)} ${w * 0.55},${-(r0 + h * 0.75)} ${w * 0.08},${-(r0 + h * 0.88)} Q0,${-(r0 + h * 0.92)} 0,${-r1} Q0,${-(r0 + h * 0.92)} ${-w * 0.08},${-(r0 + h * 0.88)} C${-w * 0.55},${-(r0 + h * 0.75)} ${-w * 0.7},${-(r0 + h * 0.2)} 0,${-r0}Z`;
}

/** Points evenly spaced on a ring. */
export function ring(r: number, n: number, offset = 0) {
  return Array.from({ length: n }, (_, i) => {
    const [x, y] = polar(r, offset + (i * 360) / n);
    return { x, y, angle: f(offset + (i * 360) / n) };
  });
}
