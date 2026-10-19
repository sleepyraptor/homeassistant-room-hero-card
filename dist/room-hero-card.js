/**
 * Room Hero Card
 * A photo of the room that lives with it: it darkens at night, takes the colour and brightness of the
 * room's light, and carries a glass pill to switch it, the room's values and status indicators.
 * Everything is set from the visual editor: no templates, no CSS.
 * https://github.com/sleepyraptor/homeassistant-room-hero-card
 */
const VERSION = "0.2.0";

const I18N = {
  en: {
    on: "On",
    off: "Off",
    sec_room: "Room",
    sec_light: "Light and pill",
    sec_night: "Night",
    sec_actions: "Actions",
    f_name: "Name",
    f_icon: "Icon",
    f_image: "Image",
    h_image: "/local/… , https://… or media-source://… — or pick an entity below",
    f_image_entity: "Image from an entity",
    h_image_entity: "A camera, image or person: its picture becomes the background",
    f_image_position: "Image position",
    h_image_position: "CSS background-position, e.g. center, top, 50% 30%",
    f_height: "Height (px)",
    f_radius: "Corner radius (px)",
    f_light: "Light",
    h_light: "Its colour and brightness tint the photo; the pill switches it",
    f_glow: "Tint the photo with the light",
    f_glow_strength: "Tint strength",
    f_border: "Tinted border when on",
    f_show_state: "Show on/off under the name",
    f_state_on: "Text when on",
    f_state_off: "Text when off",
    f_pill_position: "Pill position",
    h_pill_position: "A preset, or \"x% y%\" for the pill's centre",
    f_pill_style: "Pill style",
    f_night: "Night shade",
    f_night_entity: "Night follows",
    f_night_state: "Night when its state is",
    f_dim: "Night darkness",
    f_tap_action: "Tap on the pill",
    f_hold_action: "Hold on the pill",
    f_double_tap_action: "Double tap on the pill",
    f_icon_tap_action: "Tap on the pill's icon",
    f_icon_hold_action: "Hold on the pill's icon",
    f_card_tap_action: "Tap on the photo",
    f_card_hold_action: "Hold on the photo",
    f_card_double_tap_action: "Double tap on the photo",
    h_card_tap_action: "Anywhere outside the pill, values and indicators — e.g. open the room's page",
    f_values_position: "Values position",
    sensors: "Values",
    h_sensors: "Shown in a corner: temperature, humidity, anything.",
    indicators: "Indicators",
    h_indicators: "Small icons in the corners: motion, recording camera, open door…",
    f_entity: "Entity",
    f_attribute: "Attribute",
    f_unit: "Unit",
    f_decimals: "Decimals",
    f_preset: "Preset",
    f_icon_off: "Icon when off",
    f_color: "Colour when on",
    f_color_off: "Colour when off",
    f_state: "Counts as on when the state is",
    h_state: "Leave empty for on, open, home, detected…",
    f_position: "Position",
    f_size: "Size (px)",
    f_blink: "Blink when on",
    f_hide_off: "Hide when off",
    value_n: "Value {n}",
    indicator_n: "Indicator {n}",
    add_value: "Add value",
    add_indicator: "Add indicator",
    up: "Move up",
    down: "Move down",
    remove: "Remove",
    p_custom: "Custom",
    p_motion: "Motion",
    p_presence: "Presence",
    p_recording: "Recording camera",
    p_door: "Door",
    p_window: "Window",
    p_alarm: "Alarm",
    n_auto: "Follow the entity below",
    n_always: "Always",
    n_never: "Never",
    s_glass: "Glass",
    s_solid: "Solid",
    s_none: "Text only",
    bad_list: "{key} must be a list"
  },
  it: {
    on: "Acceso",
    off: "Spento",
    sec_room: "Stanza",
    sec_light: "Luce e pillola",
    sec_night: "Notte",
    sec_actions: "Azioni",
    f_name: "Nome",
    f_icon: "Icona",
    f_image: "Immagine",
    h_image: "/local/… , https://… o media-source://… — oppure un'entità qui sotto",
    f_image_entity: "Immagine da un'entità",
    h_image_entity: "Una camera, un'immagine o una persona: la sua foto diventa lo sfondo",
    f_image_position: "Posizione dell'immagine",
    h_image_position: "background-position CSS, es. center, top, 50% 30%",
    f_height: "Altezza (px)",
    f_radius: "Raggio degli angoli (px)",
    f_light: "Luce",
    h_light: "Colore e luminosità tingono la foto; la pillola la accende e spegne",
    f_glow: "Tingi la foto con la luce",
    f_glow_strength: "Intensità della tinta",
    f_border: "Bordo colorato quando è accesa",
    f_show_state: "Mostra acceso/spento sotto il nome",
    f_state_on: "Testo quando è accesa",
    f_state_off: "Testo quando è spenta",
    f_pill_position: "Posizione della pillola",
    h_pill_position: "Un preset, oppure \"x% y%\" per il centro della pillola",
    f_pill_style: "Stile della pillola",
    f_night: "Velo notturno",
    f_night_entity: "La notte segue",
    f_night_state: "È notte quando il suo stato è",
    f_dim: "Buio della notte",
    f_tap_action: "Tap sulla pillola",
    f_hold_action: "Pressione lunga sulla pillola",
    f_double_tap_action: "Doppio tap sulla pillola",
    f_icon_tap_action: "Tap sull'icona della pillola",
    f_icon_hold_action: "Pressione lunga sull'icona della pillola",
    f_card_tap_action: "Tap sulla foto",
    f_card_hold_action: "Pressione lunga sulla foto",
    f_card_double_tap_action: "Doppio tap sulla foto",
    h_card_tap_action: "Ovunque fuori da pillola, valori e indicatori — es. apri la pagina della stanza",
    f_values_position: "Posizione dei valori",
    sensors: "Valori",
    h_sensors: "Mostrati in un angolo: temperatura, umidità, qualsiasi cosa.",
    indicators: "Indicatori",
    h_indicators: "Piccole icone negli angoli: movimento, telecamera che registra, porta aperta…",
    f_entity: "Entità",
    f_attribute: "Attributo",
    f_unit: "Unità",
    f_decimals: "Decimali",
    f_preset: "Preset",
    f_icon_off: "Icona da spento",
    f_color: "Colore da acceso",
    f_color_off: "Colore da spento",
    f_state: "Conta come acceso quando lo stato è",
    h_state: "Vuoto per on, open, home, detected…",
    f_position: "Posizione",
    f_size: "Dimensione (px)",
    f_blink: "Lampeggia da acceso",
    f_hide_off: "Nascondi da spento",
    value_n: "Valore {n}",
    indicator_n: "Indicatore {n}",
    add_value: "Aggiungi valore",
    add_indicator: "Aggiungi indicatore",
    up: "Sposta su",
    down: "Sposta giù",
    remove: "Rimuovi",
    p_custom: "Personalizzato",
    p_motion: "Movimento",
    p_presence: "Presenza",
    p_recording: "Telecamera che registra",
    p_door: "Porta",
    p_window: "Finestra",
    p_alarm: "Allarme",
    n_auto: "Segui l'entità qui sotto",
    n_always: "Sempre",
    n_never: "Mai",
    s_glass: "Vetro",
    s_solid: "Pieno",
    s_none: "Solo testo",
    bad_list: "{key} deve essere una lista"
  }
};

export const langOf = (hass) => {
  const l = String((hass && ((hass.locale && hass.locale.language) || hass.language)) || "en").toLowerCase();
  return l.startsWith("it") ? "it" : "en";
};

export const t = (lang, key, vars = {}) =>
  String((I18N[lang] || I18N.en)[key] ?? I18N.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
));

const num = (v, d) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : d;
};

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/** Warm white: what a light without colour looks like. */
const WARM = [255, 196, 140];

/** States that count as "on" for an indicator unless the config says otherwise. */
const ACTIVE = ["on", "open", "opening", "home", "detected", "playing", "unlocked", "triggered", "recording"];

export const PRESETS = {
  motion: { icon: "mdi:motion-sensor", icon_off: "mdi:motion-sensor-off", color: "#4ade80", color_off: "rgba(255,255,255,0.5)", position: "bottom-left" },
  presence: { icon: "mdi:account", icon_off: "mdi:account-outline", color: "#4ade80", color_off: "rgba(255,255,255,0.5)", position: "bottom-left" },
  recording: { icon: "mdi:circle", color: "#ff3b30", blink: true, hide_off: true, position: "top-right", size: 14, halo: true },
  door: { icon: "mdi:door-open", icon_off: "mdi:door-closed", color: "#f59e0b", color_off: "rgba(255,255,255,0.5)", position: "bottom-left" },
  window: { icon: "mdi:window-open-variant", icon_off: "mdi:window-closed-variant", color: "#f59e0b", color_off: "rgba(255,255,255,0.5)", position: "bottom-left" },
  alarm: { icon: "mdi:shield-alert", icon_off: "mdi:shield-check-outline", color: "#ff3b30", color_off: "rgba(255,255,255,0.5)", state: ["triggered", "pending", "arming"], blink: true, position: "top-left" }
};

const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];

/** Named spots for the pill; anything else is read as "x% y%" for its centre. */
const SPOTS = {
  "top-left": { x: 4, y: 8, ax: 0, ay: 0 },
  "top-center": { x: 50, y: 8, ax: -50, ay: 0 },
  "top-right": { x: 96, y: 8, ax: -100, ay: 0 },
  "center-left": { x: 4, y: 50, ax: 0, ay: -50 },
  center: { x: 50, y: 50, ax: -50, ay: -50 },
  "center-right": { x: 96, y: 50, ax: -100, ay: -50 },
  "bottom-left": { x: 4, y: 92, ax: 0, ay: -100 },
  "bottom-center": { x: 50, y: 92, ax: -50, ay: -100 },
  "bottom-right": { x: 96, y: 92, ax: -100, ay: -100 }
};

/** Where the pill goes, as CSS: a preset name or "x% y%" (its centre, like picture-elements). */
export const place = (pos) => {
  const p = SPOTS[String(pos ?? "").trim()];
  if (p) return `left:${p.x}%;top:${p.y}%;transform:translate(${p.ax}%,${p.ay}%)`;
  const m = /^\s*(-?[\d.]+)%?\s+(-?[\d.]+)%?\s*$/.exec(String(pos ?? ""));
  const x = m ? clamp(+m[1], 0, 100) : 80;
  const y = m ? clamp(+m[2], 0, 100) : 50;
  return `left:${x}%;top:${y}%;transform:translate(-50%,-50%)`;
};

/** On or off, colour and brightness of the room's light. Lights without colour glow warm white. */
export const lightLook = (st) => {
  if (!st) return { on: false, rgb: WARM, pct: 0 };
  const on = ["on", "open", "playing", "home"].includes(st.state);
  const a = st.attributes || {};
  const rgb = Array.isArray(a.rgb_color) && a.rgb_color.length === 3 ? a.rgb_color.map((v) => clamp(num(v, 0), 0, 255)) : WARM;
  const b = num(a.brightness, null);
  const pct = on ? (b === null ? 1 : clamp(b / 255, 0, 1)) : 0;
  return { on, rgb, pct };
};

/**
 * The layers over the photo. By day a dark fade at the bottom keeps the text readable; at night a
 * dark veil that the light lifts as it gets brighter. The light's colour tints both.
 */
export const shade = (look, night, { glow = true, strength = 0.14, dim = 0.82 } = {}) => {
  const [r, g, b] = look.rgb;
  const alpha = +(0.03 + strength * look.pct).toFixed(3);
  const tint = glow ? `, linear-gradient(0deg, rgba(${r},${g},${b},${alpha}) 0%, rgba(${r},${g},${b},${alpha}) 100%)` : "";
  if (!night) {
    return `linear-gradient(180deg, rgba(0,0,0,0) 44%, rgba(0,0,0,0.45) 74%, rgba(0,0,0,0.78) 100%)${tint}`;
  }
  const veil = +clamp(dim * (1 - 0.634 * look.pct), 0, 1).toFixed(3);
  return `linear-gradient(180deg, rgba(4,7,16,0) 38%, rgba(4,7,16,0.9) 100%)${tint}, ` +
    `linear-gradient(0deg, rgba(4,7,16,${veil}) 0%, rgba(4,7,16,${veil}) 100%)`;
};

/** A thin border in the light's colour, and a soft glow under the card, while the light is on. */
export const edge = (look, tinted = true) => {
  const [r, g, b] = look.rgb;
  if (tinted && look.on) return `inset 0 0 0 1px rgba(${r},${g},${b},0.45), 0 12px 34px -18px rgba(${r},${g},${b},0.65)`;
  return "inset 0 0 0 1px rgba(255,255,255,0.07)";
};

/** An indicator with its preset filled in under whatever the config sets. */
export const indicator = (cfg) => {
  const c = typeof cfg === "string" ? { entity: cfg } : { ...cfg };
  const base = PRESETS[c.preset] || {};
  const out = { ...base };
  for (const [k, v] of Object.entries(c)) if (v !== undefined && v !== null && v !== "") out[k] = v;
  out.position = CORNERS.includes(out.position) ? out.position : "top-right";
  out.size = num(out.size, 22);
  return out;
};

export const isActive = (st, states) => {
  if (!st) return false;
  const list = Array.isArray(states) ? states : states ? String(states).split(",").map((s) => s.trim()) : ACTIVE;
  return list.includes(st.state);
};

export const value = (hass, s) => {
  const st = hass && hass.states[s.entity];
  if (!st) return "—";
  const raw = s.attribute ? st.attributes[s.attribute] : st.state;
  if (raw === undefined || raw === null || raw === "unavailable" || raw === "unknown") return "—";
  const n = Number(raw);
  const unit = s.unit ?? (s.attribute ? "" : st.attributes.unit_of_measurement || "");
  if (s.decimals !== undefined && s.decimals !== "" && Number.isFinite(n)) {
    return `${n.toFixed(num(s.decimals, 0))}${unit ? (unit === "%" || unit.startsWith("°") ? "" : " ") + unit : ""}`;
  }
  if (!s.attribute && s.unit === undefined && hass.formatEntityState) return hass.formatEntityState(st);
  if (s.attribute && s.unit === undefined && hass.formatEntityAttributeValue) return hass.formatEntityAttributeValue(st, s.attribute);
  return `${raw}${unit ? (unit === "%" || unit.startsWith("°") ? "" : " ") + unit : ""}`;
};

/** What an option is when the config leaves it out; the editor never writes these back. */
export const DEFAULTS = {
  height: 200,
  radius: 20,
  glow: true,
  glow_strength: 0.14,
  border: true,
  show_state: true,
  pill_position: "80% 50%",
  pill_style: "glass",
  night: "auto",
  night_entity: "sun.sun",
  night_state: "below_horizon",
  dim: 0.82,
  values_position: "bottom-right",
  image_position: "center"
};

export const normalise = (config, lang = "en") => {
  const c = { ...(config || {}) };
  for (const key of ["sensors", "indicators"]) {
    if (c[key] !== undefined && !Array.isArray(c[key])) throw new Error(t(lang, "bad_list", { key }));
  }
  return {
    ...DEFAULTS,
    ...c,
    sensors: (c.sensors || []).map((s) => (typeof s === "string" ? { entity: s } : { ...s })).filter((s) => s.entity),
    indicators: (c.indicators || []).map(indicator).filter((i) => i.entity)
  };
};

const CSS = `
:host{display:block}
ha-card{position:relative;overflow:hidden;isolation:isolate;border:none;background:var(--secondary-background-color);
  transition:box-shadow .8s ease-in-out;-webkit-tap-highlight-color:transparent}
.bg{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat}
ha-card.tappable{cursor:pointer}
.bg.none{background:radial-gradient(120% 150% at 30% 0%,rgba(80,92,120,.55) 0%,rgba(10,13,22,1) 70%)}
.shade{position:absolute;inset:0;z-index:1;pointer-events:none;transition:background .8s ease-in-out}
.corner{position:absolute;z-index:2;display:flex;align-items:center;gap:6px;padding:10px 12px}
.corner.top-left{top:0;left:0}.corner.top-right{top:0;right:0;flex-direction:row-reverse}
.corner.bottom-left{bottom:0;left:0}.corner.bottom-right{bottom:0;right:0;flex-direction:row-reverse}
.val{display:flex;align-items:center;gap:4px;height:32px;padding:0 4px;color:#fff;font-size:17px;font-weight:700;
  line-height:1;text-shadow:0 1px 8px rgba(0,0,0,.85);cursor:pointer;white-space:nowrap}
.val ha-icon{--mdc-icon-size:18px;opacity:.9}
.val .lbl{font-size:12px;font-weight:600;opacity:.85}
.ind{display:flex;align-items:center;justify-content:center;width:32px;height:32px;cursor:pointer;line-height:0;
  filter:drop-shadow(0 1px 8px rgba(0,0,0,.9))}
.ind.halo{border-radius:16px}
.ind.blink{animation:blink 1.6s ease-in-out infinite}
@keyframes blink{0%{opacity:1}50%{opacity:.15}100%{opacity:1}}
.pill{position:absolute;z-index:3;display:flex;align-items:center;gap:10px;padding:6px 16px 6px 6px;border-radius:20px;
  max-width:calc(100% - 24px);box-sizing:border-box;cursor:pointer;color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.55)}
.pill.glass{background:rgba(8,11,20,.75);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.16),0 10px 28px -14px rgba(0,0,0,.8)}
.pill.solid{background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color);text-shadow:none;
  box-shadow:0 10px 28px -14px rgba(0,0,0,.8)}
.pill.none{background:none;padding-left:0}
.pi{flex:0 0 auto;display:grid;place-items:center;width:42px;height:42px;border-radius:50%;cursor:pointer;
  transition:background .4s,color .4s}
.pi ha-icon{--mdc-icon-size:24px}
.pt{min-width:0}
.pn{font-size:18px;font-weight:700;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ps{font-size:12px;line-height:1.3;opacity:.85;white-space:nowrap}
.pill.solid .ps{color:var(--secondary-text-color);opacity:1}
`;

/** Tap, hold and double tap, handed to Home Assistant as a standard hass-action. */
const bind = (el, config) => {
  let timer = null;
  let held = false;
  let last = 0;
  let single = null;
  const fire = (action) => el.dispatchEvent(new CustomEvent("hass-action", { bubbles: true, composed: true, detail: { config, action } }));
  el.addEventListener("pointerdown", (ev) => {
    ev.stopPropagation();
    held = false;
    timer = setTimeout(() => { held = true; fire("hold"); }, 500);
  });
  const cancel = () => clearTimeout(timer);
  el.addEventListener("pointerleave", cancel);
  el.addEventListener("pointercancel", cancel);
  el.addEventListener("pointerup", (ev) => {
    ev.stopPropagation();
    cancel();
    if (held) return;
    const dbl = config.double_tap_action && config.double_tap_action.action !== "none";
    if (!dbl) return fire("tap");
    const now = Date.now();
    if (now - last < 250) {
      clearTimeout(single);
      last = 0;
      return fire("double_tap");
    }
    last = now;
    single = setTimeout(() => fire("tap"), 250);
  });
  el.addEventListener("click", (ev) => ev.stopPropagation());
};

class RoomHeroCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._sig = "";
    this._resolved = new Map();
  }

  static getConfigElement() {
    return document.createElement("room-hero-card-editor");
  }

  static getStubConfig(hass) {
    const light = Object.keys((hass && hass.states) || {}).find((e) => e.startsWith("light."));
    return { name: "Living room", icon: "mdi:sofa", ...(light ? { light } : {}) };
  }

  setConfig(config) {
    this._raw = config;
    this._config = normalise(config);
    this._sig = "";
    this._render(true);
  }

  set hass(hass) {
    this._hass = hass;
    this._render(false);
  }

  connectedCallback() {
    // A narrow card (a phone, a small column) must not push the pill out of the photo.
    if (!this._ro && typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver(() => this._fit());
      this._ro.observe(this);
    }
  }

  disconnectedCallback() {
    if (this._ro) this._ro.disconnect();
    this._ro = null;
  }

  /** Slides the pill back inside the card, 12 px from the edge, when its position would cut it. */
  _fit() {
    const card = this.shadowRoot.querySelector("ha-card");
    const pill = this.shadowRoot.querySelector(".pill");
    if (!card || !pill) return;
    pill.style.translate = "";
    const c = card.getBoundingClientRect();
    const p = pill.getBoundingClientRect();
    if (!c.width || !p.width) return;
    const m = 12;
    let dx = 0;
    if (p.right > c.right - m) dx = c.right - m - p.right;
    if (p.left + dx < c.left + m) dx = c.left + m - p.left;
    if (dx) pill.style.translate = `${Math.round(dx)}px 0`;
  }

  getCardSize() {
    return Math.max(2, Math.round(num(this._config && this._config.height, 200) / 56));
  }

  getGridOptions() {
    const rows = Math.max(2, Math.round((num(this._config && this._config.height, 200) + 8) / 64));
    return { columns: 12, rows, min_columns: 4, min_rows: 2 };
  }

  get _lang() {
    return langOf(this._hass);
  }

  /** Everything the card reads; when none of it changed, nothing is redrawn. */
  _entities() {
    const c = this._config;
    return [c.light, c.image_entity, c.night === "auto" ? c.night_entity : null,
      ...c.sensors.map((s) => s.entity), ...c.indicators.map((i) => i.entity)].filter(Boolean);
  }

  _image() {
    const c = this._config;
    const h = this._hass;
    if (c.image_entity && h && h.states[c.image_entity]) {
      const pic = h.states[c.image_entity].attributes.entity_picture;
      if (pic) return h.hassUrl ? h.hassUrl(pic) : pic;
    }
    if (!c.image) return "";
    if (String(c.image).startsWith("media-source://")) {
      if (this._resolved.has(c.image)) return this._resolved.get(c.image);
      if (h && h.callWS) {
        this._resolved.set(c.image, "");
        h.callWS({ type: "media_source/resolve_media", media_content_id: c.image, expires: 86400 })
          .then((r) => {
            this._resolved.set(c.image, h.hassUrl ? h.hassUrl(r.url) : r.url);
            this._sig = "";
            this._render(false);
          })
          .catch(() => {});
      }
      return "";
    }
    return c.image;
  }

  /** The actions of a tap on the photo, or null when it has none. */
  _cardActions() {
    const c = this._config;
    const some = (a) => a && a.action && a.action !== "none";
    if (!some(c.card_tap_action) && !some(c.card_hold_action) && !some(c.card_double_tap_action)) return null;
    return {
      entity: c.light,
      tap_action: c.card_tap_action || { action: "none" },
      hold_action: c.card_hold_action || { action: "none" },
      double_tap_action: c.card_double_tap_action
    };
  }

  _night() {
    const c = this._config;
    if (c.night === "always") return true;
    if (c.night === "never") return false;
    const st = this._hass && this._hass.states[c.night_entity];
    return !!st && String(st.state) === String(c.night_state);
  }

  _render(force) {
    const c = this._config;
    if (!c) return;
    const h = this._hass;
    const states = h ? this._entities().map((e) => h.states[e]) : [];
    const sig = JSON.stringify([this._lang, states.map((s) => s && [s.state, s.attributes]), this._resolved.get(c.image)]);
    if (!force && sig === this._sig) return;
    this._sig = sig;

    const L = this._lang;
    const lightSt = h && c.light ? h.states[c.light] : null;
    const look = lightLook(lightSt);
    const night = this._night();
    const img = this._image();
    const [r, g, b] = look.rgb;
    const iconColor = look.on ? `rgb(${r},${g},${b})` : "rgba(255,255,255,0.55)";
    const iconBg = look.on ? `rgba(${r},${g},${b},0.2)` : "rgba(255,255,255,0.08)";
    const name = c.name ?? (lightSt && lightSt.attributes.friendly_name) ?? "";
    const icon = c.icon || (lightSt && lightSt.attributes.icon) || "mdi:sofa";
    const stateText = look.on ? (c.state_on || t(L, "on")) : (c.state_off || t(L, "off"));

    const corners = Object.fromEntries(CORNERS.map((k) => [k, []]));
    c.indicators.forEach((ind, i) => {
      const st = h && h.states[ind.entity];
      const active = isActive(st, ind.state);
      if (!active && ind.hide_off) return;
      const col = active ? ind.color || "#fff" : ind.color_off || "rgba(255,255,255,0.5)";
      const ic = active ? ind.icon || (st && st.attributes.icon) || "mdi:checkbox-blank-circle" : ind.icon_off || ind.icon || "mdi:checkbox-blank-circle-outline";
      const halo = active && ind.halo ? `filter:drop-shadow(0 0 8px ${col}) drop-shadow(0 1px 4px rgba(0,0,0,.9));` : "";
      corners[ind.position].push(`<div class="ind${active && ind.blink ? " blink" : ""}${ind.halo ? " halo" : ""}" data-ind="${i}"
        style="color:${esc(col)};--mdc-icon-size:${ind.size}px;${halo}"><ha-icon icon="${esc(ic)}"></ha-icon></div>`);
    });
    const vp = CORNERS.includes(c.values_position) ? c.values_position : "bottom-right";
    const vals = c.sensors.map((s, i) => `<div class="val" data-val="${i}">${s.icon ? `<ha-icon icon="${esc(s.icon)}"></ha-icon>` : ""}${s.name ? `<span class="lbl">${esc(s.name)}</span>` : ""}<span>${esc(value(h, s))}</span></div>`);
    // The values sit next to the indicators of the same corner, on the inner side.
    corners[vp] = vp.endsWith("right") ? [...vals.reverse(), ...corners[vp]] : [...corners[vp], ...vals];

    this.shadowRoot.innerHTML = `<style>${CSS}</style>
      <ha-card class="${this._cardActions() ? "tappable" : ""}" style="height:${num(c.height, 200)}px;border-radius:${num(c.radius, 20)}px;box-shadow:${edge(look, c.border)}">
        <div class="bg${img ? "" : " none"}" style="${img ? `background-image:url('${esc(img)}');background-position:${esc(c.image_position)};` : ""}"></div>
        <div class="shade" style="background:${shade(look, night, { glow: c.glow, strength: num(c.glow_strength, 0.14), dim: num(c.dim, 0.82) })}"></div>
        ${CORNERS.map((k) => (corners[k].length ? `<div class="corner ${k}">${corners[k].join("")}</div>` : "")).join("")}
        ${name || icon ? `<div class="pill ${esc(c.pill_style)}" style="${place(c.pill_position)}">
          <div class="pi" style="color:${iconColor};background:${c.pill_style === "none" ? "none" : iconBg}"><ha-icon icon="${esc(icon)}"></ha-icon></div>
          <div class="pt"><div class="pn">${esc(name)}</div>${c.show_state && c.light ? `<div class="ps">${esc(stateText)}</div>` : ""}</div>
        </div>` : ""}
      </ha-card>`;

    const root = this.shadowRoot;
    const actions = this._cardActions();
    // The photo itself: the pill, values and indicators stop their own events, so only the rest reaches it.
    if (actions) bind(root.querySelector("ha-card"), actions);
    const pill = root.querySelector(".pill");
    if (typeof requestAnimationFrame !== "undefined") requestAnimationFrame(() => this._fit());
    if (pill) {
      bind(pill, {
        entity: c.light,
        tap_action: c.tap_action || { action: c.light ? "more-info" : "none" },
        hold_action: c.hold_action || { action: c.light ? "more-info" : "none" },
        double_tap_action: c.double_tap_action
      });
      bind(pill.querySelector(".pi"), {
        entity: c.light,
        tap_action: c.icon_tap_action || { action: c.light ? "toggle" : "none" },
        hold_action: c.icon_hold_action || { action: c.light ? "more-info" : "none" }
      });
    }
    root.querySelectorAll("[data-val]").forEach((el) => {
      const s = c.sensors[+el.dataset.val];
      bind(el, { entity: s.entity, tap_action: s.tap_action || { action: "more-info" }, hold_action: s.hold_action || { action: "more-info" } });
    });
    root.querySelectorAll("[data-ind]").forEach((el) => {
      const s = c.indicators[+el.dataset.ind];
      bind(el, { entity: s.entity, tap_action: s.tap_action || { action: "more-info" }, hold_action: s.hold_action || { action: "more-info" } });
    });
  }
}

/* ------------------------------------------------------------------ editor */

const EDITOR_CSS = `
.list{margin-top:20px}
.list .head{font-weight:500;margin:0 0 4px}
.list .help{font-size:12px;color:var(--secondary-text-color);margin:0 0 10px}
.row{border:1px solid var(--divider-color);border-radius:12px;padding:10px 10px 4px;margin:0 0 10px}
.row .bar{display:flex;align-items:center;gap:4px;margin:0 0 6px;font-size:13px;color:var(--secondary-text-color)}
.row .bar span{flex:1}
.ed-btn{border:1px solid var(--divider-color);background:none;color:var(--primary-color);border-radius:18px;
  padding:6px 14px;font:inherit;font-weight:500;cursor:pointer}
.icon-btn{border:0;background:none;color:var(--secondary-text-color);width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer}
.icon-btn:hover{background:var(--secondary-background-color)}
.icon-btn:disabled{opacity:.3;cursor:default}
`;

const POSITIONS = ["top-left", "top-center", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-center", "bottom-right"];

class RoomHeroCardEditor extends HTMLElement {
  setConfig(config) {
    if (this._built && JSON.stringify(config) === this._sent) {
      this._config = { ...config };
      return;
    }
    const shape = (c) => JSON.stringify([((c && c.sensors) || []).length, ((c && c.indicators) || []).length]);
    const redraw = !this._built || shape(this._config) !== shape(config);
    this._config = { ...config };
    if (redraw) this._render();
    else if (this._main) this._main.data = this._mainData();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) this._render();
    else for (const f of this.querySelectorAll("ha-form")) f.hass = hass;
  }

  get _L() {
    return langOf(this._hass);
  }

  _mainData() {
    const d = normalise(this._config);
    delete d.sensors;
    delete d.indicators;
    return { ...d, ...this._config };
  }

  _mainSchema(L) {
    const opts = (keys, pre) => keys.map((k) => ({ value: k, label: t(L, `${pre}${k}`) }));
    return [
      {
        type: "expandable", name: "", flatten: true, title: t(L, "sec_room"), expanded: true, schema: [
          { type: "grid", name: "", schema: [{ name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }] },
          { name: "image", selector: { text: {} } },
          { name: "image_entity", selector: { entity: { domain: ["camera", "image", "person"] } } },
          {
            type: "grid", name: "", schema: [
              { name: "height", selector: { number: { min: 80, max: 600, step: 10, mode: "box", unit_of_measurement: "px" } } },
              { name: "radius", selector: { number: { min: 0, max: 40, mode: "box", unit_of_measurement: "px" } } }
            ]
          },
          { name: "image_position", selector: { text: {} } }
        ]
      },
      {
        type: "expandable", name: "", flatten: true, title: t(L, "sec_light"), schema: [
          { name: "light", selector: { entity: { domain: ["light", "switch", "fan", "input_boolean", "media_player"] } } },
          { type: "grid", name: "", schema: [{ name: "glow", selector: { boolean: {} } }, { name: "border", selector: { boolean: {} } }] },
          { name: "glow_strength", selector: { number: { min: 0, max: 0.6, step: 0.01, mode: "slider" } } },
          { type: "grid", name: "", schema: [{ name: "state_on", selector: { text: {} } }, { name: "state_off", selector: { text: {} } }] },
          { name: "show_state", selector: { boolean: {} } },
          {
            type: "grid", name: "", schema: [
              { name: "pill_position", selector: { select: { mode: "dropdown", custom_value: true, options: ["80% 50%", ...POSITIONS] } } },
              { name: "pill_style", selector: { select: { mode: "dropdown", options: opts(["glass", "solid", "none"], "s_") } } }
            ]
          },
          { name: "values_position", selector: { select: { mode: "dropdown", options: CORNERS } } }
        ]
      },
      {
        type: "expandable", name: "", flatten: true, title: t(L, "sec_night"), schema: [
          { name: "night", selector: { select: { mode: "dropdown", options: opts(["auto", "always", "never"], "n_") } } },
          { type: "grid", name: "", schema: [{ name: "night_entity", selector: { entity: {} } }, { name: "night_state", selector: { text: {} } }] },
          { name: "dim", selector: { number: { min: 0, max: 1, step: 0.01, mode: "slider" } } }
        ]
      },
      {
        type: "expandable", name: "", flatten: true, title: t(L, "sec_actions"), schema: [
          { name: "tap_action", selector: { ui_action: {} } },
          { name: "hold_action", selector: { ui_action: {} } },
          { name: "double_tap_action", selector: { ui_action: {} } },
          { name: "icon_tap_action", selector: { ui_action: {} } },
          { name: "icon_hold_action", selector: { ui_action: {} } },
          { name: "card_tap_action", selector: { ui_action: {} } },
          { name: "card_hold_action", selector: { ui_action: {} } },
          { name: "card_double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }

  _sensorSchema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { type: "grid", name: "", schema: [{ name: "icon", selector: { icon: {} } }, { name: "name", selector: { text: {} } }] },
      {
        type: "grid", name: "", schema: [
          { name: "attribute", selector: { text: {} } },
          { name: "unit", selector: { text: {} } },
          { name: "decimals", selector: { number: { min: 0, max: 4, mode: "box" } } }
        ]
      }
    ];
  }

  _indicatorSchema(L) {
    return [
      {
        type: "grid", name: "", schema: [
          { name: "preset", selector: { select: { mode: "dropdown", options: ["", ...Object.keys(PRESETS)].map((k) => ({ value: k, label: t(L, `p_${k || "custom"}`) })) } } },
          { name: "entity", required: true, selector: { entity: {} } }
        ]
      },
      { type: "grid", name: "", schema: [{ name: "icon", selector: { icon: {} } }, { name: "icon_off", selector: { icon: {} } }] },
      { type: "grid", name: "", schema: [{ name: "color", selector: { text: {} } }, { name: "color_off", selector: { text: {} } }] },
      {
        type: "grid", name: "", schema: [
          { name: "position", selector: { select: { mode: "dropdown", options: CORNERS } } },
          { name: "size", selector: { number: { min: 8, max: 48, mode: "box", unit_of_measurement: "px" } } }
        ]
      },
      { type: "grid", name: "", schema: [{ name: "blink", selector: { boolean: {} } }, { name: "hide_off", selector: { boolean: {} } }] },
      { name: "state", selector: { text: { multiple: true } } }
    ];
  }

  _form(schema, data, onChange) {
    const L = this._L;
    const f = document.createElement("ha-form");
    f.hass = this._hass;
    f.schema = schema;
    f.data = data;
    f.computeLabel = (s) => (s.name ? t(L, `f_${s.name}`) : "");
    f.computeHelper = (s) => {
      const k = `h_${s.name}`;
      const h = t(L, k);
      return h === k ? undefined : h;
    };
    f.addEventListener("value-changed", (ev) => {
      ev.stopPropagation();
      onChange(ev.detail.value);
    });
    return f;
  }

  _emit(config) {
    const out = { type: "custom:room-hero-card", ...config };
    for (const [k, v] of Object.entries(DEFAULTS)) if (out[k] === v) delete out[k];
    const clean = (o) => {
      for (const k of Object.keys(o)) {
        if (o[k] === "" || o[k] === undefined || o[k] === null || (Array.isArray(o[k]) && !o[k].length && k !== "sensors" && k !== "indicators")) delete o[k];
      }
      return o;
    };
    clean(out);
    for (const key of ["sensors", "indicators"]) {
      if (Array.isArray(out[key])) {
        out[key] = out[key].map((x) => clean({ ...x }));
        if (!out[key].length) delete out[key];
      }
    }
    this._config = out;
    this._sent = JSON.stringify(out);
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: out }, bubbles: true, composed: true }));
  }

  _list(key, schema, labelKey, addKey, helpKey, blank) {
    const L = this._L;
    const box = document.createElement("div");
    box.className = `list ${key}`;
    box.innerHTML = `<div class="head">${esc(t(L, key))}</div><div class="help">${esc(t(L, helpKey))}</div><div class="rows"></div>
      <button class="ed-btn add" type="button">${esc(t(L, addKey))}</button>`;
    const items = () => (Array.isArray(this._config[key]) ? this._config[key] : []).map((x) => (typeof x === "string" ? { entity: x } : x));
    const set = (next, redraw = true) => {
      this._emit({ ...this._config, [key]: next });
      if (redraw) this._render();
    };
    const all = items();
    all.forEach((item, i) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<div class="bar"><span>${esc(t(L, labelKey, { n: i + 1 }))}</span>
        <button class="icon-btn up" type="button" aria-label="${esc(t(L, "up"))}" ${i === 0 ? "disabled" : ""}>↑</button>
        <button class="icon-btn down" type="button" aria-label="${esc(t(L, "down"))}" ${i === all.length - 1 ? "disabled" : ""}>↓</button>
        <button class="icon-btn remove" type="button" aria-label="${esc(t(L, "remove"))}">✕</button></div>`;
      row.appendChild(this._form(schema, item, (v) => {
        const next = items();
        next[i] = v;
        set(next, false);
      }));
      const move = (d) => {
        const next = items();
        [next[i], next[i + d]] = [next[i + d], next[i]];
        set(next);
      };
      row.querySelector(".up").addEventListener("click", () => move(-1));
      row.querySelector(".down").addEventListener("click", () => move(1));
      row.querySelector(".remove").addEventListener("click", () => set(items().filter((_, k) => k !== i)));
      box.querySelector(".rows").appendChild(row);
    });
    box.querySelector(".add").addEventListener("click", () => set([...items(), { ...blank }]));
    return box;
  }

  _render() {
    if (!this._config) return;
    this._built = true;
    const L = this._L;
    this.innerHTML = `<style>${EDITOR_CSS}</style>`;
    this._main = this._form(this._mainSchema(L), this._mainData(), (v) => {
      this._emit({ ...v, sensors: this._config.sensors, indicators: this._config.indicators });
    });
    this.appendChild(this._main);
    this.appendChild(this._list("sensors", this._sensorSchema(), "value_n", "add_value", "h_sensors", { entity: "" }));
    this.appendChild(this._list("indicators", this._indicatorSchema(L), "indicator_n", "add_indicator", "h_indicators", { preset: "motion", entity: "" }));
  }
}

if (!customElements.get("room-hero-card")) {
  customElements.define("room-hero-card", RoomHeroCard);
  customElements.define("room-hero-card-editor", RoomHeroCardEditor);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "room-hero-card",
    name: "Room Hero Card",
    description: "A photo of the room that follows its light and the night, with a pill to switch it, values and indicators",
    preview: true,
    documentationURL: "https://github.com/sleepyraptor/homeassistant-room-hero-card"
  });
  console.info(`%c ROOM-HERO-CARD %c ${VERSION} `, "color:#fff;background:#f59e0b;font-weight:700", "color:#f59e0b");
}
