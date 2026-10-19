/**
 * Drawn rooms for the demo and the README screenshots: no real photo of anyone's home is ever used.
 * Every room is a handful of SVG shapes, lit like a daytime photo.
 */
const W = 1920;
const H = 1080;


/** Day palette, and the washed-out greys of an infrared camera at night. */
const PALETTE = {
  day: {
    wall: "#d9cdb8", wall2: "#cbbda5", floor: "#8a6a4f", floor2: "#6f533c",
    sky: "#9cc7e6", sky2: "#d8ecf7", wood: "#7a5434", fabric: "#4f6d8f", fabric2: "#3f5874",
    accent: "#c96f4a", leaf: "#3f7a4a", metal: "#5a5f66", screen: "#1d2733", light: "#fff3c4"
  },
  night: {
    wall: "#7d847e", wall2: "#6e756f", floor: "#4b514c", floor2: "#3d423e",
    sky: "#1f2420", sky2: "#2c322d", wood: "#4a504b", fabric: "#5b625c", fabric2: "#4d544e",
    accent: "#6a716b", leaf: "#555c56", metal: "#5d645e", screen: "#9fb5a3", light: "#b9c4ba"
  }
};


const window_ = (x, y, w, h, p, curtains) => `
  <rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" fill="${p.wall2}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#sky)"/>
  <rect x="${x + w / 2 - 6}" y="${y}" width="12" height="${h}" fill="${p.wall2}"/>
  <rect x="${x}" y="${y + h / 2 - 6}" width="${w}" height="12" fill="${p.wall2}"/>
  ${curtains ? `<path d="M${x - 40} ${y - 30} h120 q-30 ${h / 2} 10 ${h + 60} h-130 Z" fill="${p.accent}" opacity=".85"/>
  <path d="M${x + w + 40} ${y - 30} h-120 q30 ${h / 2} -10 ${h + 60} h130 Z" fill="${p.accent}" opacity=".85"/>` : ""}`;

const ROOMS = {
  living_room: (p, night) => `
    ${window_(260, 170, 520, 380, p, false)}
    <rect x="1290" y="190" width="300" height="640" fill="${p.wood}"/>
    <rect x="1310" y="210" width="260" height="620" fill="${night ? "#2a2f2b" : "#3b2c22"}"/>
    <ellipse cx="900" cy="930" rx="560" ry="90" fill="${p.accent}" opacity=".55"/>
    <rect x="420" y="600" width="760" height="190" rx="40" fill="${p.fabric}"/>
    <rect x="420" y="520" width="760" height="140" rx="50" fill="${p.fabric2}"/>
    <rect x="380" y="600" width="90" height="230" rx="35" fill="${p.fabric2}"/>
    <rect x="1130" y="600" width="90" height="230" rx="35" fill="${p.fabric2}"/>
    <rect x="600" y="840" width="420" height="40" rx="8" fill="${p.wood}"/>
    <rect x="630" y="880" width="18" height="70" fill="${p.wood}"/><rect x="972" y="880" width="18" height="70" fill="${p.wood}"/>
    <rect x="1700" y="300" width="14" height="560" fill="${p.metal}"/>
    <path d="M1640 300 h134 l-30 -110 h-74 Z" fill="${p.light}"/>
    <rect x="150" y="760" width="110" height="140" rx="12" fill="${p.wood}"/>
    <path d="M205 770 q-90 -120 -40 -260 q30 120 40 260 q10 -170 70 -250 q20 140 -70 250 Z" fill="${p.leaf}"/>`,
  bedroom: (p, night) => `
    ${window_(1260, 190, 420, 340, p, true)}
    <rect x="160" y="250" width="300" height="640" fill="${p.wood}"/>
    <line x1="310" y1="260" x2="310" y2="880" stroke="${p.wall2}" stroke-width="6"/>
    <rect x="560" y="420" width="640" height="210" rx="18" fill="${p.wood}"/>
    <rect x="520" y="600" width="720" height="250" rx="24" fill="${p.fabric}"/>
    <rect x="600" y="560" width="230" height="90" rx="30" fill="${night ? "#8c938d" : "#eef0f2"}"/>
    <rect x="930" y="560" width="230" height="90" rx="30" fill="${night ? "#8c938d" : "#eef0f2"}"/>
    <path d="M520 690 h720 v160 a24 24 0 0 1 -24 24 h-672 a24 24 0 0 1 -24 -24 Z" fill="${p.fabric2}"/>
    <rect x="1290" y="700" width="170" height="160" rx="10" fill="${p.wood}"/>
    <rect x="1350" y="610" width="12" height="90" fill="${p.metal}"/>
    <path d="M1310 610 h92 l-18 -70 h-56 Z" fill="${p.light}"/>`,
  bathroom: (p) => `
    ${window_(1380, 170, 300, 260, p, false)}
    <rect x="200" y="230" width="360" height="280" rx="14" fill="#c9d6dc"/>
    <rect x="230" y="260" width="300" height="220" rx="10" fill="#e8f1f5"/>
    <rect x="260" y="560" width="260" height="60" rx="14" fill="#f4f6f7"/>
    <rect x="330" y="620" width="120" height="200" fill="#e9ecee"/>
    <rect x="760" y="560" width="760" height="260" rx="60" fill="#f4f6f7"/>
    <rect x="790" y="590" width="700" height="150" rx="50" fill="#dce8ee"/>
    <rect x="1440" y="420" width="16" height="170" fill="${p.metal}"/>
    <circle cx="1448" cy="410" r="28" fill="${p.metal}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${640 + i * 120}" y="150" width="110" height="110" fill="#d7e3e8" opacity=".6"/>`).join("")}`,
  office: (p, night) => `
    ${window_(1350, 160, 380, 420, p, false)}
    <rect x="180" y="200" width="420" height="40" fill="${p.wood}"/>
    <rect x="180" y="330" width="420" height="40" fill="${p.wood}"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${200 + i * 40}" y="${130 + (i % 3) * 8}" width="30" height="${70 - (i % 3) * 8}" fill="${i % 2 ? p.accent : p.fabric}"/>`).join("")}
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${220 + i * 46}" y="${262 + (i % 2) * 10}" width="34" height="${68 - (i % 2) * 10}" fill="${i % 2 ? p.leaf : p.accent}"/>`).join("")}
    <rect x="560" y="640" width="900" height="44" rx="6" fill="${p.wood}"/>
    <rect x="600" y="684" width="24" height="230" fill="${p.wood}"/><rect x="1396" y="684" width="24" height="230" fill="${p.wood}"/>
    <rect x="800" y="380" width="420" height="250" rx="14" fill="${p.metal}"/>
    <rect x="820" y="398" width="380" height="212" rx="6" fill="${p.screen}"/>
    <rect x="990" y="630" width="40" height="14" fill="${p.metal}"/>
    <rect x="840" y="760" width="300" height="60" rx="20" fill="${p.fabric2}"/>
    <rect x="880" y="560" width="220" height="210" rx="30" fill="${p.fabric}" opacity=".95"/>
    <rect x="980" y="820" width="20" height="90" fill="${p.metal}"/>`
};


/** One room as an SVG document. */
export function room(name) {
  const p = PALETTE.day;
  const draw = ROOMS[name] || ROOMS.living_room;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky}"/><stop offset="1" stop-color="${p.sky2}"/></linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.floor}"/><stop offset="1" stop-color="${p.floor2}"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="1.4"/></filter>
  </defs>
  <g filter="url(#soft)">
    <rect width="${W}" height="${H}" fill="${p.wall}"/>
    <rect y="820" width="${W}" height="${H - 820}" fill="url(#floor)"/>
    <rect y="812" width="${W}" height="14" fill="${p.wall2}"/>
    ${draw(p, false)}
  </g>
</svg>`;
}

export const dataUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
