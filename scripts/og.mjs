// Renders public/og.png (1200×630 social card) from code-drawn SVG. Run: npm run og
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const GOLD = '#C9A24B';
const petal = (r0, r1, w) => {
  const h = r1 - r0;
  return `M0,${-r0} C${w / 2},${-(r0 + h * 0.25)} ${w / 2},${-(r0 + h * 0.75)} 0,${-r1} C${-w / 2},${-(r0 + h * 0.75)} ${-w / 2},${-(r0 + h * 0.25)} 0,${-r0}Z`;
};
const around = (n, fn, off = 0) => Array.from({ length: n }, (_, i) => fn(off + (i * 360) / n)).join('');
const tri = (r, up, dy) => {
  const s = up ? -1 : 1;
  return `M0,${s * r + dy} L${r * 0.866},${-s * r * 0.5 + dy} L${-r * 0.866},${-s * r * 0.5 + dy}Z`;
};

const yantra = `
<g transform="translate(960 315)" fill="none" stroke="${GOLD}" stroke-width="1.2" opacity=".85">
  <rect x="-280" y="-280" width="560" height="560"/>
  <circle r="250"/><circle r="242"/>
  ${around(16, (a) => `<path d="${petal(170, 238, 54)}" transform="rotate(${a})"/>`)}
  ${around(16, (a) => `<path d="${petal(184, 224, 18)}" transform="rotate(${a})"/>`)}
  <circle r="166"/>
  ${around(8, (a) => `<path d="${petal(116, 162, 66)}" transform="rotate(${a})"/>`, 22.5)}
  <circle r="112"/>
  <path d="${tri(104, true, 6)}"/><path d="${tri(104, false, -6)}"/>
  <path d="${tri(70, true, -10)}"/><path d="${tri(70, false, 10)}"/>
  <circle r="15"/><circle r="4" fill="${GOLD}" stroke="none"/>
</g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><radialGradient id="bg" cx="80%" cy="50%" r="75%"><stop offset="0" stop-color="#5a1220"/><stop offset="1" stop-color="#320811"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  ${yantra}
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${GOLD}" stroke-opacity=".4"/>
  <text x="80" y="110" font-family="Helvetica, Arial, sans-serif" font-size="18" letter-spacing="5" fill="${GOLD}">GEOPOLITICS · TECHNOLOGY · CULTURE</text>
  <text x="74" y="350" font-family="Georgia, serif" font-size="138" fill="#F3E7D3">mido<tspan font-style="italic" fill="${GOLD}">reigh</tspan></text>
  <line x1="80" y1="400" x2="620" y2="400" stroke="${GOLD}" stroke-opacity=".5"/>
  <text x="80" y="450" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#F3E7D3" fill-opacity=".85">A journal of long-form essays and notes</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/og.png', import.meta.url), png);
console.log('wrote public/og.png', png.length, 'bytes');
