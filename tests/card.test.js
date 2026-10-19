import test from "node:test";
import assert from "node:assert/strict";
import { boot, fakeHass, makeCard, st, $, $$, wait } from "./helpers.js";

const LIGHT_ON = st("on", { rgb_color: [255, 0, 128], brightness: 255, friendly_name: "Sofa LED" });
const BASE = { name: "Living room", icon: "mdi:sofa", image: "/local/room.jpg", light: "light.sofa" };

test("a light's colour and brightness, warm white when it has no colour", async () => {
  const { lightLook } = await boot();
  assert.deepEqual(lightLook(LIGHT_ON), { on: true, rgb: [255, 0, 128], pct: 1 });
  assert.deepEqual(lightLook(st("on", { brightness: 51 })), { on: true, rgb: [255, 196, 140], pct: 0.2 });
  assert.deepEqual(lightLook(st("off", {})), { on: false, rgb: [255, 196, 140], pct: 0 });
  assert.equal(lightLook(st("on", {})).pct, 1, "a switch has no brightness: on means full");
});

test("night veil: 0.82 with the light off, lifted to 0.30 at full brightness", async () => {
  const { shade, lightLook } = await boot();
  assert.match(shade(lightLook(st("off")), true), /rgba\(4,7,16,0\.82\) 0%/);
  assert.match(shade(lightLook(LIGHT_ON), true), /rgba\(4,7,16,0\.3\) 0%/);
  assert.match(shade(lightLook(LIGHT_ON), true, { dim: 0.5 }), /rgba\(4,7,16,0\.183\) 0%/);
});

test("by day only the bottom fade; the tint follows colour and brightness, or goes away", async () => {
  const { shade, lightLook } = await boot();
  const day = shade(lightLook(LIGHT_ON), false);
  assert.doesNotMatch(day, /4,7,16/);
  assert.match(day, /rgba\(255,0,128,0\.17\)/);
  assert.doesNotMatch(shade(lightLook(LIGHT_ON), false, { glow: false }), /255,0,128/);
  assert.match(shade(lightLook(LIGHT_ON), false, { strength: 0.3 }), /rgba\(255,0,128,0\.33\)/);
});

test("the border takes the light's colour only while it is on", async () => {
  const { edge, lightLook } = await boot();
  assert.match(edge(lightLook(LIGHT_ON)), /rgba\(255,0,128,0\.45\)/);
  assert.match(edge(lightLook(st("off"))), /255,255,255,0\.07/);
  assert.match(edge(lightLook(LIGHT_ON), false), /255,255,255,0\.07/);
});

test("pill position: presets, x% y%, and a sane default", async () => {
  const { place } = await boot();
  assert.equal(place("80% 50%"), "left:80%;top:50%;transform:translate(-50%,-50%)");
  assert.equal(place("20 75"), "left:20%;top:75%;transform:translate(-50%,-50%)");
  assert.match(place("top-left"), /left:4%;top:8%;transform:translate\(0%,0%\)/);
  assert.match(place("bottom-right"), /translate\(-100%,-100%\)/);
  assert.match(place("nonsense"), /left:80%;top:50%/);
});

test("indicator presets fill in what the config leaves out", async () => {
  const { indicator } = await boot();
  const rec = indicator({ preset: "recording", entity: "switch.cam" });
  assert.equal(rec.icon, "mdi:circle");
  assert.equal(rec.blink, true);
  assert.equal(rec.hide_off, true);
  assert.equal(rec.position, "top-right");
  const m = indicator({ preset: "motion", entity: "binary_sensor.m", color: "red", position: "nowhere" });
  assert.equal(m.color, "red");
  assert.equal(m.icon_off, "mdi:motion-sensor-off");
  assert.equal(m.position, "top-right");
  assert.equal(indicator("binary_sensor.x").entity, "binary_sensor.x");
});

test("what counts as on", async () => {
  const { isActive } = await boot();
  assert.ok(isActive(st("open")));
  assert.ok(!isActive(st("closed")));
  assert.ok(isActive(st("triggered"), ["triggered", "pending"]));
  assert.ok(isActive(st("heat"), "heat, cool"));
  assert.ok(!isActive(undefined));
});

test("values: Home Assistant's own formatting, or decimals and unit when asked", async () => {
  const { value } = await boot();
  const hass = { ...fakeHass({ "sensor.t": st("21.456", { unit_of_measurement: "°C" }), "sensor.h": st("48", { unit_of_measurement: "%" }), "light.l": st("on", { brightness: 128 }) }), formatEntityState: (s) => `${s.state} formatted` };
  assert.equal(value(hass, { entity: "sensor.t" }), "21.456 formatted");
  assert.equal(value(hass, { entity: "sensor.t", decimals: 1 }), "21.5°C");
  assert.equal(value(hass, { entity: "sensor.h", decimals: 0 }), "48%");
  assert.equal(value(hass, { entity: "light.l", attribute: "brightness", unit: "" }), "128");
  assert.equal(value(hass, { entity: "sensor.missing" }), "—");
});

test("renders photo, pill, values and indicators where they belong", async () => {
  const hass = fakeHass({
    "light.sofa": LIGHT_ON,
    "sun.sun": st("above_horizon"),
    "sensor.t": st("21", { unit_of_measurement: "°C" }),
    "sensor.h": st("48", { unit_of_measurement: "%" }),
    "binary_sensor.motion": st("on"),
    "switch.cam": st("on")
  });
  const el = await makeCard({
    ...BASE,
    sensors: ["sensor.t", { entity: "sensor.h" }],
    indicators: [{ preset: "motion", entity: "binary_sensor.motion" }, { preset: "recording", entity: "switch.cam" }]
  }, hass);
  assert.match($(el, ".bg").getAttribute("style"), /url\('\/local\/room\.jpg'\)/);
  assert.equal($(el, ".pn").textContent, "Living room");
  assert.equal($(el, ".ps").textContent, "On");
  assert.equal($$(el, ".corner.bottom-right .val").length, 2);
  assert.equal($$(el, ".corner.bottom-left .ind").length, 1);
  assert.ok($(el, ".corner.top-right .ind.blink"));
  assert.match($(el, "ha-card").getAttribute("style"), /255,0,128,0\.45/);
});

test("night follows sun.sun, or another entity, or is forced", async () => {
  const states = { "light.sofa": st("off"), "sun.sun": st("below_horizon"), "input_boolean.dark": st("on") };
  const auto = await makeCard(BASE, fakeHass(states));
  assert.match($(auto, ".shade").getAttribute("style"), /4,7,16,0\.82/);
  const other = await makeCard({ ...BASE, night_entity: "input_boolean.dark", night_state: "off" }, fakeHass(states));
  assert.doesNotMatch($(other, ".shade").getAttribute("style"), /4,7,16,0\.82/);
  const never = await makeCard({ ...BASE, night: "never" }, fakeHass(states));
  assert.doesNotMatch($(never, ".shade").getAttribute("style"), /4,7,16/);
});

test("recording camera off: no dot at all", async () => {
  const el = await makeCard({ ...BASE, indicators: [{ preset: "recording", entity: "switch.cam" }] }, fakeHass({ "switch.cam": st("off") }));
  assert.equal($$(el, ".ind").length, 0);
});

test("state texts: configured, then the user's language", async () => {
  const it = await makeCard(BASE, fakeHass({ "light.sofa": st("off") }, "it"));
  assert.equal($(it, ".ps").textContent, "Spento");
  const custom = await makeCard({ ...BASE, state_off: "Dark" }, fakeHass({ "light.sofa": st("off") }));
  assert.equal($(custom, ".ps").textContent, "Dark");
  const hidden = await makeCard({ ...BASE, show_state: false }, fakeHass({ "light.sofa": st("off") }));
  assert.equal($(hidden, ".ps"), null);
});

test("no image: a neutral gradient; image_entity uses the entity's picture", async () => {
  const none = await makeCard({ name: "Hall" }, fakeHass({}));
  assert.ok($(none, ".bg.none"));
  const cam = await makeCard({ name: "Hall", image_entity: "camera.hall" }, fakeHass({ "camera.hall": st("idle", { entity_picture: "/api/camera_proxy/camera.hall?token=x" }) }));
  assert.match($(cam, ".bg").getAttribute("style"), /http:\/\/ha\/api\/camera_proxy\/camera\.hall/);
});

test("media-source images are resolved to a signed URL", async () => {
  const hass = { ...fakeHass({}), callWS: async (m) => ({ url: `/media/local/${m.media_content_id.split("/").pop()}?authSig=x` }) };
  const el = await makeCard({ name: "Hall", image: "media-source://media_source/local/hall.jpg" }, hass);
  await wait(10);
  assert.match($(el, ".bg").getAttribute("style"), /http:\/\/ha\/media\/local\/hall\.jpg\?authSig=x/);
});

test("redraws only when an entity it uses changes", async () => {
  const states = { "light.sofa": st("off") };
  const el = await makeCard(BASE, fakeHass(states));
  const card = $(el, "ha-card");
  el.hass = fakeHass({ ...states, "sensor.unrelated": st("1") });
  assert.equal($(el, "ha-card"), card);
  el.hass = fakeHass({ "light.sofa": LIGHT_ON });
  assert.notEqual($(el, "ha-card"), card);
});

test("taps become standard Home Assistant actions", async () => {
  const el = await makeCard({ ...BASE, sensors: ["sensor.t"] }, fakeHass({ "light.sofa": st("off"), "sensor.t": st("20") }));
  const got = [];
  el.addEventListener("hass-action", (e) => got.push(e.detail));
  const press = (node) => {
    node.dispatchEvent(new globalThis.window.PointerEvent("pointerdown", { bubbles: true }));
    node.dispatchEvent(new globalThis.window.PointerEvent("pointerup", { bubbles: true }));
  };
  press($(el, ".pi"));
  press($(el, ".pill"));
  press($(el, ".val"));
  assert.deepEqual(got.map((d) => [d.action, d.config.tap_action.action, d.config.entity]), [
    ["tap", "toggle", "light.sofa"],
    ["tap", "more-info", "light.sofa"],
    ["tap", "more-info", "sensor.t"]
  ]);
});

test("hold fires the hold action", async () => {
  const el = await makeCard({ ...BASE, hold_action: { action: "navigate", navigation_path: "/x" } }, fakeHass({ "light.sofa": st("off") }));
  const got = [];
  el.addEventListener("hass-action", (e) => got.push(e.detail.action));
  $(el, ".pill").dispatchEvent(new globalThis.window.PointerEvent("pointerdown", { bubbles: true }));
  await wait(560);
  $(el, ".pill").dispatchEvent(new globalThis.window.PointerEvent("pointerup", { bubbles: true }));
  assert.deepEqual(got, ["hold"]);
});

test("height drives the size in sections", async () => {
  const el = await makeCard({ ...BASE, height: 300 });
  assert.deepEqual(el.getGridOptions(), { columns: 12, rows: 5, min_columns: 4, min_rows: 2 });
});

test("bad lists are rejected clearly", async () => {
  const { normalise } = await boot();
  assert.throws(() => normalise({ sensors: "sensor.t" }), /sensors must be a list/);
});
