import test from "node:test";
import assert from "node:assert/strict";
import { boot } from "./helpers.js";

async function makeEditor(config, language = "en") {
  await boot();
  const ed = globalThis.document.createElement("room-hero-card-editor");
  ed.hass = { states: {}, locale: { language }, language };
  ed.setConfig({ type: "custom:room-hero-card", ...config });
  ed.addEventListener("config-changed", (e) => { ed.last = e.detail.config; });
  return ed;
}
const main = (ed) => ed.querySelector("ha-form");
const rows = (ed, key) => Array.from(ed.querySelectorAll(`.list.${key} .row`));
const change = (form, value) => form.dispatchEvent(new globalThis.CustomEvent("value-changed", { detail: { value } }));

test("the card offers its editor", async () => {
  await boot();
  assert.equal(globalThis.customElements.get("room-hero-card").getConfigElement().tagName.toLowerCase(), "room-hero-card-editor");
});

test("every option is in the form, grouped in sections", async () => {
  const ed = await makeEditor({ name: "Hall" });
  const s = JSON.stringify(main(ed).schema);
  for (const k of ["name", "icon", "image", "image_entity", "height", "radius", "image_position", "light", "glow", "border",
    "glow_strength", "state_on", "state_off", "show_state", "pill_position", "pill_style", "values_position",
    "night", "night_entity", "night_state", "dim", "tap_action", "hold_action", "double_tap_action", "icon_tap_action", "icon_hold_action", "card_tap_action", "card_hold_action", "card_double_tap_action"]) {
    assert.match(s, new RegExp(`"name":"${k}"`), k);
  }
  assert.equal((s.match(/"type":"expandable"/g) || []).length, 4);
});

test("defaults are shown in the form but never written back", async () => {
  const ed = await makeEditor({ name: "Hall" });
  assert.equal(main(ed).data.height, 200);
  change(main(ed), { ...main(ed).data, name: "Hallway" });
  assert.deepEqual(ed.last, { type: "custom:room-hero-card", name: "Hallway" });
});

test("values and indicators: add, edit, move, remove", async () => {
  const ed = await makeEditor({ name: "Hall", sensors: ["sensor.t"] });
  assert.equal(rows(ed, "sensors").length, 1);
  ed.querySelector(".list.sensors .add").click();
  assert.equal(rows(ed, "sensors").length, 2);
  change(rows(ed, "sensors")[1].querySelector("ha-form"), { entity: "sensor.h", decimals: 0 });
  rows(ed, "sensors")[1].querySelector(".up").click();
  assert.deepEqual(ed.last.sensors, [{ entity: "sensor.h", decimals: 0 }, { entity: "sensor.t" }]);
  ed.querySelector(".list.indicators .add").click();
  assert.deepEqual(ed.last.indicators, [{ preset: "motion" }]);
  rows(ed, "indicators")[0].querySelector(".remove").click();
  assert.equal(ed.last.indicators, undefined);
});

test("typing in a row does not redraw it", async () => {
  const ed = await makeEditor({ name: "Hall", indicators: [{ preset: "motion", entity: "binary_sensor.m" }] });
  const form = rows(ed, "indicators")[0].querySelector("ha-form");
  change(form, { preset: "motion", entity: "binary_sensor.motion_hall" });
  ed.setConfig(ed.last);
  assert.equal(rows(ed, "indicators")[0].querySelector("ha-form"), form);
});

test("labels and section titles follow the language", async () => {
  const ed = await makeEditor({}, "it");
  assert.equal(main(ed).computeLabel({ name: "dim" }), "Buio della notte");
  assert.match(JSON.stringify(main(ed).schema), /"title":"Luce e pillola"/);
  assert.match(ed.textContent, /Aggiungi indicatore/);
});
