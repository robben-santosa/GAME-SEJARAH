# -*- coding: utf-8 -*-
import io

P = r"C:\Users\Robben\Desktop\GAME SEJARAH\script.js"
s = io.open(P, encoding="utf-8").read()

START = "/* =============================================================\n   2. SVG ILLUSTRATION"
END = "const SCENES = {"

i = s.find(START)
j = s.find(END)
assert i != -1, "START tidak ditemukan"
assert j != -1 and j > i, "END tidak ditemukan"

NEW = r'''/* =============================================================
   2. IKON & SPRITE PIXEL
   ============================================================= */
function ico(name, cls) {
  return `<img class="ico${cls ? " " + cls : ""}" src="assets/icons/${name}.png" alt="">`;
}

function spriteSrc(name) {
  const sp = SPEAKERS[name];
  if (!sp) return "assets/characters/warga.png";
  return (sp.icon ? "assets/icons/" : "assets/characters/") + sp.sprite + ".png";
}

/* =============================================================
   3. LATAR SCENE (pixel art dari assets/backgrounds)
   ============================================================= */
function sceneBgHtml(key) {
  return `<div class="scene-bg" style="background-image:url('assets/backgrounds/${key}.png')"></div>`;
}

const ALLIANCE_HTML = `
<div class="alliance" id="alliance">
  <div class="alliance__row">
    <span class="team team--padri">PADRI</span>
    <span class="versus"><span class="v-war">${ico("sword")}</span><span class="v-peace">${ico("people")}</span></span>
    <span class="team team--adat">ADAT</span>
  </div>
  <div class="alliance__arrow">&darr;</div>
  <div class="alliance__foe">BELANDA</div>
</div>`;

const SCENE_EXTRA = {
  road: function () {
    return `
    <div class="layer troops">
      <div class="troop-group">
        <span class="troop-label">Pasukan Belanda</span>
        <img class="troop-flag" src="assets/icons/bendera.png" alt="">
        <img class="troop-img" src="assets/characters/belanda.png" alt="">
        <img class="troop-img" src="assets/characters/belanda.png" alt="">
        <img class="troop-img" src="assets/characters/belanda.png" alt="">
        <img class="troop-img" src="assets/characters/belanda.png" alt="">
      </div>
    </div>`;
  },
  meeting: function () { return ALLIANCE_HTML; }
};

function setBackground(key) {
  const k = key || "dawn";
  const extra = SCENE_EXTRA[k] ? SCENE_EXTRA[k]() : "";
  dom.stageVisual.innerHTML = sceneBgHtml(k) + extra;
}

'''

s = s[:i] + NEW + s[j:]
io.open(P, "w", encoding="utf-8").write(s)
print("patched, new len", len(s))
