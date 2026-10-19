/**
 * The card running outside Home Assistant, on drawn rooms and made-up states.
 * Used to take the README screenshots; open it with `npm run demo`.
 *
 * Query string: theme=dark|light, lang=en|it, width=<px>, cols=<n>, scene=rooms|styles.
 */
import * as mdi from "/node_modules/@mdi/js/mdi.js";
import { dataUri, room } from "./rooms.js";

const q = new URLSearchParams(location.search);
const lang = q.get("lang") || "en";
document.documentElement.dataset.theme = q.get("theme") || "dark";
const stage = document.getElementById("stage");
stage.style.maxWidth = `${q.get("width") || 1040}px`;
stage.style.setProperty("--cols", q.get("cols") || 2);

/** Stand-ins for the two Home Assistant elements the card uses: mdi:foo-bar → mdiFooBar. */
const path = (name) => mdi[`mdi${String(name).replace(/^mdi:/, "").split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("")}`] || "";
customElements.define("ha-icon", class extends HTMLElement {
  static get observedAttributes() { return ["icon"]; }
  attributeChangedCallback() { this.connectedCallback(); }
  connectedCallback() {
    this.style.cssText += "display:inline-flex;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)";
    this.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="${path(this.getAttribute("icon"))}"/></svg>`;
  }
});
customElements.define("ha-card", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block}</style><slot></slot>";
  }
});

await import("../dist/room-hero-card.js");

const s = (state, attributes = {}) => ({ state, attributes });
const states = {
  "sun.sun": s("above_horizon"),
  "light.living_room": s("on", { rgb_color: [168, 85, 247], brightness: 205 }),
  "light.bedroom": s("off"),
  "light.office": s("on", { brightness: 160 }),
  "light.bathroom": s("off"),
  "sensor.living_room_temperature": s("21.4", { unit_of_measurement: "°C" }),
  "sensor.living_room_humidity": s("48", { unit_of_measurement: "%" }),
  "sensor.bedroom_temperature": s("19.8", { unit_of_measurement: "°C" }),
  "sensor.bedroom_humidity": s("52", { unit_of_measurement: "%" }),
  "sensor.office_temperature": s("23.1", { unit_of_measurement: "°C" }),
  "sensor.bathroom_illuminance": s("312", { unit_of_measurement: "lx" }),
  "binary_sensor.living_room_motion": s("on"),
  "binary_sensor.bedroom_motion": s("off"),
  "binary_sensor.office_door": s("on"),
  "binary_sensor.bathroom_window": s("on"),
  "switch.living_room_camera": s("on")
};
const fmt = (st) => {
  const u = st.attributes.unit_of_measurement;
  return u ? `${st.state}${u === "%" ? "" : " "}${u}` : st.state;
};
const hass = { states, language: lang, locale: { language: lang }, hassUrl: (p) => p, formatEntityState: fmt };

const it = lang === "it";
const ROOMS = [
  {
    name: it ? "Soggiorno" : "Living room", icon: "mdi:sofa", image: dataUri(room("living_room")), light: "light.living_room", night: "always",
    sensors: ["sensor.living_room_temperature", "sensor.living_room_humidity"],
    indicators: [{ preset: "motion", entity: "binary_sensor.living_room_motion" }, { preset: "recording", entity: "switch.living_room_camera" }]
  },
  {
    name: it ? "Camera" : "Bedroom", icon: "mdi:bed-king", image: dataUri(room("bedroom")), light: "light.bedroom", night: "always",
    sensors: ["sensor.bedroom_temperature", "sensor.bedroom_humidity"],
    indicators: [{ preset: "motion", entity: "binary_sensor.bedroom_motion" }]
  },
  {
    name: it ? "Studio" : "Office", icon: "mdi:desk", image: dataUri(room("office")), light: "light.office", night: "never",
    sensors: ["sensor.office_temperature"],
    indicators: [{ preset: "door", entity: "binary_sensor.office_door" }]
  },
  {
    name: it ? "Bagno" : "Bathroom", icon: "mdi:shower", image: dataUri(room("bathroom")), light: "light.bathroom", night: "never",
    sensors: [{ entity: "sensor.bathroom_illuminance", icon: "mdi:brightness-5" }],
    indicators: [{ preset: "window", entity: "binary_sensor.bathroom_window" }]
  }
];
const STYLES = [
  { ...ROOMS[0], name: "Glass", night: "never", pill_style: "glass", pill_position: "center" },
  { ...ROOMS[0], name: "Solid", night: "never", pill_style: "solid", pill_position: "top-left" },
  { ...ROOMS[0], name: "Text only", night: "never", pill_style: "none", pill_position: "bottom-left", indicators: [] }
];

const scene = q.get("scene") || "rooms";
const cards = (scene === "styles" ? STYLES : ROOMS).map((cfg) => {
  const c = document.createElement("room-hero-card");
  c.setConfig(cfg);
  c.hass = hass;
  stage.appendChild(c);
  return c;
});
window.__cards = cards;
