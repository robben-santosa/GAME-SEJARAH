/* =============================================================
   JELAJAH PERANG PADRI — script.js
   Game edukasi 2D: state, scene, dialog, pilihan, quiz, skor,
   peta, fakta sejarah, dan ending.
   ============================================================= */
"use strict";

/* =============================================================
   1. DATA PEMBICARA & AVATAR
   ============================================================= */
const SPEAKERS = {
  NARATOR: { sprite: "scroll", icon: true, tint: "t-narator" },
  PEMAIN: { sprite: "pemain", tint: "t-pemain" },
  WARGA: { sprite: "warga", tint: "t-warga" },
  "TUANKU NAN TUO": { sprite: "nan-tuo", tint: "t-tuo" },
  "TUANKU NAN RENCEH": { sprite: "nan-renceh", tint: "t-renceh" },
  "TUANKU IMAM BONJOL": { sprite: "imam-bonjol", tint: "t-imam" },
  PRAJURIT: { sprite: "prajurit", tint: "t-prajurit" },
  "SULTAN TANGKAL ALAM BAGAGAR": { sprite: "sultan", tint: "t-sultan" },
  "JENDERAL DE KOCK": { sprite: "dekock", tint: "t-dekock" },
  PERTANYAAN: { sprite: "quest", icon: true, tint: "t-quiz" }
};

function charList(names) {
  return names.map(function (n) { return { name: n }; });
}

/* =============================================================
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

const SCENES = {

  /* ---------- PROLOG ---------- */
  prologue: {
    id: "prologue",
    kind: "prologue",
    hud: "PROLOG • TANAH YANG TERBELAH",
    title: "TANAH YANG TERBELAH",
    sub: "PROLOG",
    place: "Pegunungan Minangkabau • Pagi hari",
    bg: "dawn",
    cast: charList(["PEMAIN"]),
    steps: [
      { type: "dialog", speaker: "NARATOR", text: "Awal abad ke-19. Di tanah Minangkabau, adat dan agama menjadi bagian penting dalam kehidupan masyarakat." },
      { type: "dialog", speaker: "NARATOR", text: "Namun, muncul perbedaan pandangan mengenai bagaimana masyarakat seharusnya menjalankan kehidupan mereka." },
      { type: "dialog", speaker: "PEMAIN", text: "Sepertinya ada sesuatu yang sedang terjadi." },
      { type: "card", kicker: `${ico("scroll")}MEMULAI PERJALANAN`, title: "PERANG PADRI", sub: "1821 – 1837", label: "MULAI PERJALANAN →", hint: "Siap? Buka peta perjalanan." }
    ],
    next: "map"
  },

  /* ---------- LEVEL 1 ---------- */
  level1: {
    id: "level1",
    kind: "level",
    order: 1,
    hud: "LEVEL 1/6 • TANAH YANG TERBELAH",
    title: "TANAH YANG TERBELAH",
    sub: "LEVEL 1 / 6",
    place: "Nagari Minangkabau",
    bg: "nagari",
    cast: charList(["PEMAIN", "WARGA"]),
    steps: [
      { type: "dialog", speaker: "PEMAIN", text: "Suasananya berbeda dari yang kubayangkan. Orang-orang ramai berbicara di depan rumah gadang." },
      { type: "dialog", speaker: "WARGA", text: "Semua orang sedang membicarakan Kaum Padri." },
      { type: "dialog", speaker: "PEMAIN", text: "Apa yang sebenarnya terjadi?" },
      {
        type: "dialog", speaker: "WARGA",
        text: "Sebagian ingin melakukan perubahan dalam kehidupan beragama dan masyarakat. Sebagian lainnya mempertahankan adat yang telah lama mereka jalankan."
      },
      {
        type: "quiz",
        speaker: "PERTANYAAN",
        question: "Apa yang terjadi pada tahap awal peristiwa di Minangkabau?",
        options: [
          "Konflik antara Kaum Padri dan Kaum Adat",
          "Belanda langsung menguasai seluruh Minangkabau",
          "Perang melawan Jepang"
        ],
        answer: 0,
        correctText: "Pada awalnya, Perang Padri merupakan konflik antara Kaum Padri dan Kaum Adat.",
        wrongText: "Pada tahap awal, konflik terjadi antara Kaum Padri dan Kaum Adat, bukan serangan Belanda atau perang melawan Jepang."
      }
    ],
    fact: {
      no: 1,
      period: "1821–1825",
      title: "Konflik Padri dan Adat",
      text: "Konflik antara Kaum Padri dan Kaum Adat serta awal keterlibatan Belanda."
    },
    next: "map"
  },

  /* ---------- LEVEL 2 ---------- */
  level2: {
    id: "level2",
    kind: "level",
    order: 2,
    hud: "LEVEL 2/6 • TOKOH DAN PERUBAHAN",
    title: "TOKOH DAN PERUBAHAN",
    sub: "LEVEL 2 / 6",
    place: "Surau",
    bg: "surau",
    cast: charList(["PEMAIN", "TUANKU NAN TUO", "TUANKU NAN RENCEH"]),
    steps: [
      { type: "dialog", speaker: "TUANKU NAN TUO", text: "Perubahan tidak dapat dilakukan hanya dengan kemarahan." },
      { type: "dialog", speaker: "TUANKU NAN RENCEH", text: "Tapi sampai kapan kita membiarkan kebiasaan yang menurut kita tidak sesuai dengan ajaran agama?" },
      { type: "dialog", speaker: "TUANKU NAN TUO", text: "Sampaikan ajaran dengan ilmu. Dakwah dan pendidikan akan mengubah masyarakat perlahan." },
      {
        type: "quiz",
        speaker: "PERTANYAAN",
        question: "Apa pendekatan yang ditekankan Tuanku Nan Tuo?",
        options: [
          "Pendidikan dan dakwah",
          "Perang",
          "Menghindari masyarakat"
        ],
        answer: 0,
        correctText: "Tuanku Nan Tuo menekankan pendidikan dan dakwah sebagai cara menyampaikan perubahan.",
        wrongText: "Pendekatan Tuanku Nan Tuo adalah pendidikan dan dakwah, bukan perang dan bukan dengan menghindari masyarakat."
      },
      {
        type: "dialog",
        speaker: "TUANKU IMAM BONJOL",
        cast: ["PEMAIN", "TUANKU NAN TUO", "TUANKU IMAM BONJOL"],
        text: "Masyarakat kita sedang menghadapi masa yang sulit. Perbedaan cara pandang harus diselesaikan dengan bijak."
      }
    ],
    fact: {
      no: 2,
      period: "Awal abad ke-19",
      title: "Tokoh Awal Kaum Padri",
      text: "Tokoh-tokoh awal Kaum Padri termasuk Tuanku Nan Tuo dan Tuanku Nan Renceh dengan pendekatan dan peran yang berbeda."
    },
    next: "map"
  },

  /* ---------- LEVEL 3 ---------- */
  level3: {
    id: "level3",
    kind: "level",
    order: 3,
    hud: "LEVEL 3/6 • ORANG ASING DI TANAH MINANG",
    title: "ORANG ASING DI TANAH MINANG",
    sub: "LEVEL 3 / 6",
    place: "Jalan menuju Minangkabau",
    bg: "road",
    cast: charList(["PEMAIN", "SULTAN TANGKAL ALAM BAGAGAR"]),
    steps: [
      { type: "dialog", speaker: "NARATOR", text: "Konflik internal tersebut menarik perhatian pemerintah kolonial Belanda." },
      { type: "dialog", speaker: "NARATOR", text: "Dari kejauhan, pasukan Belanda mulai bergerak masuk ke tanah Minangkabau." },
      {
        type: "dialog", speaker: "SULTAN TANGKAL ALAM BAGAGAR",
        text: "Mereka memanfaatkan perpecahan di antara kita. Kita harus lebih waspada terhadap niat mereka."
      },
      { type: "dialog", speaker: "PEMAIN", text: "Pasukan itu terus bergerak semakin dekat. Situasi berubah dengan cepat." },
      {
        type: "quiz",
        speaker: "PERTANYAAN",
        question: "Apa yang berubah setelah Belanda semakin terlibat?",
        options: [
          "Konflik menjadi semakin luas",
          "Semua konflik langsung berakhir",
          "Belanda langsung meninggalkan Minangkabau"
        ],
        answer: 0,
        correctText: "Keterlibatan Belanda membuat konflik menjadi semakin luas dan rumit.",
        wrongText: "Keterlibatan Belanda justru membuat konflik menjadi semakin luas, bukan berakhir atau ditinggalkan."
      }
    ],
    fact: {
      no: 3,
      period: "1820–1830",
      title: "Belanda Semakin Terlibat",
      text: "Belanda semakin terlibat dalam konflik Minangkabau."
    },
    next: "map"
  },

  /* ---------- LEVEL 4 ---------- */
  level4: {
    id: "level4",
    kind: "level",
    order: 4,
    hud: "LEVEL 4/6 • MUSUH YANG SAMA",
    title: "MUSUH YANG SAMA",
    sub: "LEVEL 4 / 6",
    place: "Tempat Pertemuan",
    bg: "meeting",
    cast: charList(["PEMAIN", "TUANKU IMAM BONJOL", "WARGA"]),
    steps: [
      { type: "dialog", speaker: "NARATOR", text: "Memasuki tahun 1830-an, keadaan berubah." },
      {
        type: "dialog", speaker: "NARATOR", fx: "alliance",
        text: "Ancaman Belanda membuat kedua kelompok semakin menyadari bahwa mereka memiliki kepentingan yang sama dalam mempertahankan tanah Minangkabau."
      },
      { type: "dialog", speaker: "TUANKU IMAM BONJOL", text: "Kita mungkin memiliki perbedaan." },
      { type: "dialog", speaker: "TUANKU IMAM BONJOL", text: "Tetapi tanah yang kita pertahankan adalah tanah yang sama." },
      {
        type: "quiz",
        speaker: "PERTANYAAN",
        question: "Apa perubahan penting pada fase ini?",
        options: [
          "Padri dan Adat semakin bersatu menghadapi Belanda",
          "Padri dan Adat semakin memperluas konflik satu sama lain",
          "Belanda meninggalkan Minangkabau"
        ],
        answer: 0,
        correctText: "Ancaman Belanda membuat Padri dan Adat semakin bersatu mempertahankan tanah Minangkabau.",
        wrongText: "Pada fase ini Padri dan Adat justru semakin bersatu menghadapi Belanda, bukan memperluas konflik."
      }
    ],
    fact: {
      no: 4,
      period: "Awal 1830-an",
      title: "Perbedaan Bergeser",
      text: "Pada fase berikutnya, perbedaan Padri dan Adat mulai bergeser karena adanya ancaman Belanda."
    },
    next: "map"
  },

  /* ---------- LEVEL 5 ---------- */
  level5: {
    id: "level5",
    kind: "level",
    order: 5,
    hud: "LEVEL 5/6 • BENTENG BONJOL",
    title: "BENTENG BONJOL",
    sub: "LEVEL 5 / 6",
    place: "Benteng Bonjol",
    bg: "fort",
    cast: charList(["PEMAIN", "PRAJURIT", "TUANKU IMAM BONJOL"]),
    steps: [
      { type: "dialog", speaker: "PRAJURIT", text: "Tuanku! Pasukan Belanda semakin mendekat." },
      { type: "dialog", speaker: "TUANKU IMAM BONJOL", text: "Perkuat pertahanan. Jaga setiap sisi benteng." },
      { type: "dialog", speaker: "PEMAIN", text: "Apakah kita bisa menang?" },
      { type: "dialog", speaker: "TUANKU IMAM BONJOL", text: "Yang bisa kita lakukan adalah terus berjuang." },
      {
        type: "quiz",
        speaker: "PERTANYAAN",
        question: "Apa yang menjadi salah satu pusat penting perlawanan?",
        options: ["Benteng Bonjol", "Batavia", "Surabaya"],
        answer: 0,
        correctText: "Benteng Bonjol menjadi salah satu pusat penting perlawanan.",
        wrongText: "Benteng Bonjol adalah pusat penting perlawanan, bukan Batavia maupun Surabaya."
      },
      {
        type: "dialog", speaker: "NARATOR", fx: "siege",
        text: "Pertahanan Bonjol semakin terdesak. Serangan datang dari berbagai arah."
      }
    ],
    fact: {
      no: 5,
      period: "1830-an",
      title: "Benteng Bonjol",
      text: "Benteng Bonjol menjadi salah satu pusat penting perlawanan."
    },
    next: "map"
  },

  /* ---------- LEVEL 6 ---------- */
  level6: {
    id: "level6",
    kind: "level",
    order: 6,
    hud: "LEVEL 6/6 • AKHIR PERLAWANAN",
    title: "AKHIR PERLAWANAN",
    sub: "LEVEL 6 / 6",
    place: "Tempat Pertemuan",
    bg: "council",
    cast: charList(["PEMAIN", "JENDERAL DE KOCK", "TUANKU IMAM BONJOL"]),
    steps: [
      { type: "dialog", speaker: "JENDERAL DE KOCK", text: "Tuanku Imam Bonjol. Perlawanan harus berakhir." },
      { type: "dialog", speaker: "TUANKU IMAM BONJOL", text: "Tanah ini akan tetap mengingat apa yang telah terjadi." },
      { type: "dialog", speaker: "NARATOR", text: "Pada Oktober 1837, Tuanku Imam Bonjol menyerah kepada Belanda." },
      {
        type: "quiz",
        speaker: "PERTANYAAN",
        question: "Kapan Tuanku Imam Bonjol menyerah kepada Belanda?",
        options: ["Oktober 1837", "Tahun 1821", "Tahun 1830"],
        answer: 0,
        correctText: "Tuanku Imam Bonjol menyerah kepada Belanda pada Oktober 1837.",
        wrongText: "Penyerahan terjadi pada Oktober 1837, bukan tahun 1821 atau 1830."
      },
      {
        type: "card",
        kicker: `${ico("flag")}AKHIR PERLAWANAN`,
        title: "1837",
        sub: "BONJOL JATUH",
        label: "LANJUT →",
        hint: "Lanjut menuju adegan pengasingan."
      },
      {
        type: "dialog",
        speaker: "NARATOR",
        bg: "exile",
        place: "Lautan — Perjalanan Pengasingan",
        cast: [],
        text: "Tuanku Imam Bonjol kemudian diasingkan oleh pemerintah kolonial Belanda."
      },
      { type: "dialog", speaker: "PEMAIN", cast: [], text: "Perjalanan yang panjang akhirnya berakhir... sejarah ini akan terus diingat." }
    ],
    fact: {
      no: 6,
      period: "Oktober 1837",
      title: "Bonjol Jatuh",
      text: "Bonjol jatuh pada 1837 dan Tuanku Imam Bonjol menyerah kepada Belanda pada Oktober 1837."
    },
    next: "epilog"
  },

  /* ---------- EPILOG ---------- */
  epilog: {
    id: "epilog",
    kind: "epilog",
    hud: "EPILOG • API YANG TERTINGGAL",
    title: "API YANG TERTINGGAL",
    sub: "EPILOG",
    place: "Tanah Minangkabau",
    bg: "night",
    hideTitle: true,
    visual: "timeline",
    cast: [],
    steps: [
      { type: "dialog", speaker: "NARATOR", text: "Perang Padri bukanlah satu konflik yang bentuknya selalu sama." },
      { type: "dialog", speaker: "NARATOR", text: "Dari konflik internal, perang berkembang menjadi perjuangan menghadapi kekuasaan kolonial." },
      { type: "dialog", speaker: "NARATOR", text: "Dan dari tanah yang pernah terpecah, lahirlah sebuah bagian penting dari sejarah Minangkabau." }
    ],
    next: "final"
  }
};

const LEVEL_IDS = ["level1", "level2", "level3", "level4", "level5", "level6"];
const FACT_LIST = LEVEL_IDS.map(function (id) { return SCENES[id].fact; });

/* =============================================================
   5. DATA PETA PERJALANAN
   ============================================================= */
const MAP_NODES = [
  { icon: "home", name: "NAGARI", scene: "level1", desc: "Nagari Minangkabau — tahap awal konflik" },
  { icon: "surau", name: "SURAU", scene: "level2", desc: "Tokoh dan arah perubahan" },
  { icon: "gunung", name: "MINANGKABAU", scene: "level3", desc: "Orang asing di tanah Minang" },
  { icon: "people", name: "PERUNDINGAN", scene: "level4", desc: "Musuh yang sama" },
  { icon: "benteng", name: "BENTENG BONJOL", scene: "level5", desc: "Pusat perlawanan" },
  { icon: "scroll", name: "ENDING", scene: "level6", desc: "Akhir perlawanan" }
];

const MAX_SCORE = 6;
const MAX_LEVELS = 6;

/* =============================================================
   6. GAME STATE
   ============================================================= */
const gameState = {
  screen: "home",
  currentScene: null,
  currentLevel: 0,
  score: 0,
  factsUnlocked: [],
  completedScenes: [],
  scoredScenes: [],
  selectedChoice: null,
  answered: false,
  stepIndex: 0,
  scene: null,
  inLevel: false,
  returnScreen: null,
  /* ---- RPG: pemain berjalan & ngobrol ---- */
  playerX: 26,     /* posisi pemain dalam % lebar panggung */
  walkTarget: null,/* tujuan otomatis (%) */
  autoTalk: false, /* berjalan dulu, baru mulai bicara */
  moveDir: 0       /* -1 kiri, 1 kanan, 0 diam */
};

/* =============================================================
   7. DOM
   ============================================================= */
function el(id) { return document.getElementById(id); }

const dom = {
  shell: el("shell"),
  homeScene: el("home-scene"),
  hudLevel: el("hud-level"),
  hudScore: el("hud-score"),
  hudProgress: el("hud-progress"),
  hudMeter: el("hud-meter"),
  stage: el("stage"),
  stageVisual: el("stage-visual"),
  stagePlace: el("stage-place"),
  stageTitle: el("stage-title"),
  stageCast: el("stage-cast"),
  stagePlayer: el("stage-player"),
  stageToast: el("stage-toast"),
  stageDark: el("stage-dark"),
  dialog: el("dialog"),
  dialogHead: el("dialog-head"),
  dialogAvatar: el("dialog-avatar"),
  dialogSpeaker: el("dialog-speaker"),
  dialogTag: el("dialog-tag"),
  dialogBubble: el("dialog-bubble"),
  dialogText: el("dialog-text"),
  cardSlot: el("card-slot"),
  choices: el("choices"),
  feedback: el("feedback"),
  hint: el("dialog-hint"),
  btnNext: el("btn-next"),
  mapPath: el("map-path"),
  mapSub: el("map-sub"),
  mapCanvas: el("map-canvas"),
  ringFg: el("ring-fg"),
  ringVal: el("ring-val"),
  btnMapBack: el("btn-map-back"),
  finalContent: el("final-content"),
  overlay: el("overlay"),
  modal: el("modal")
};

/* =============================================================
   8. AUDIO (opsional — tidak error bila tidak tersedia)
   ============================================================= */
const Sound = {
  on: true,
  ctx: null,
  init: function () {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { this.ctx = null; return; }
      this.ctx = new AC();
    } catch (e) { this.ctx = null; }
  },
  resume: function () {
    try {
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    } catch (e) { /* abaikan */ }
  },
  tone: function (freq, delay, dur, type, vol) {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol || 0.06, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  },
  play: function (name) {
    if (!this.on || !this.ctx) return;
    try {
      switch (name) {
        case "click": this.tone(540, 0, 0.07, "triangle", 0.045); break;
        case "correct":
          this.tone(660, 0, 0.12, "triangle", 0.07);
          this.tone(880, 0.1, 0.12, "triangle", 0.07);
          this.tone(1180, 0.2, 0.18, "triangle", 0.07);
          break;
        case "wrong":
          this.tone(320, 0, 0.14, "sawtooth", 0.05);
          this.tone(200, 0.12, 0.2, "sawtooth", 0.05);
          break;
        case "unlock":
          this.tone(784, 0, 0.1, "triangle", 0.06);
          this.tone(1046, 0.09, 0.2, "triangle", 0.06);
          break;
        case "boom":
          this.tone(90, 0, 0.5, "sawtooth", 0.09);
          this.tone(60, 0.05, 0.6, "square", 0.05);
          break;
        case "map": this.tone(494, 0, 0.1, "triangle", 0.05); this.tone(659, 0.09, 0.16, "triangle", 0.05); break;
        case "perfect":
          [523, 659, 784, 1046, 1318].forEach((f, i) => this.tone(f, i * 0.11, 0.24, "triangle", 0.07));
          break;
        case "fail": this.tone(300, 0, 0.2, "sine", 0.05); break;
      }
    } catch (e) { /* audio bersifat opsional */ }
  }
};

function playSfx(name) { Sound.play(name); }

function syncSoundLabels() {
  const b1 = el("btn-sound");
  const b2 = el("btn-sound-home");
  const icon = Sound.on ? "sound" : "muted";
  if (b1) { b1.innerHTML = ico(icon) + (Sound.on ? "SOUND" : "MUTED"); b1.setAttribute("aria-pressed", String(Sound.on)); }
  if (b2) b2.innerHTML = ico(icon) + (Sound.on ? "SOUND: ON" : "SOUND: OFF");
}

function toggleSound() {
  Sound.on = !Sound.on;
  syncSoundLabels();
  if (Sound.on) playSfx("click");
}

/* =============================================================
   9. SCREEN & MODAL
   ============================================================= */
const SCREEN_IDS = {
  home: "screen-home",
  game: "screen-game",
  map: "screen-map",
  final: "screen-final"
};

function showScreen(name) {
  gameState.screen = name;
  Object.keys(SCREEN_IDS).forEach(function (key) {
    const node = el(SCREEN_IDS[key]);
    node.classList.toggle("is-active", key === name);
  });
  dom.shell.hidden = (name === "home");
}

let modalOpts = {};

function openModal(html, opts) {
  modalOpts = opts || {};
  dom.modal.innerHTML = html;
  dom.overlay.hidden = false;
  const first = dom.modal.querySelector("button");
  if (first) setTimeout(function () { first.focus(); }, 40);
}

function closeModal() {
  dom.overlay.hidden = true;
  dom.modal.innerHTML = "";
  modalOpts = {};
}

function modalShell(title, bodyHtml, footHtml, showClose) {
  return `
    <div class="modal__head">
      <h3 class="modal__title">${title}</h3>
      ${showClose === false ? "" : `<button type="button" class="btn modal__close" data-close>✕ KEMBALI</button>`}
    </div>
    ${bodyHtml}
    ${footHtml ? `<div class="modal__foot">${footHtml}</div>` : ""}`;
}

function openInfo(kind) {
  let html = "";
  if (kind === "howto") {
    html = modalShell(ico("book") + "CARA BERMAIN", `
      <p class="modal__lead">Ikuti enam langkah ini untuk menyelesaikan seluruh perjalanan.</p>
      <ul class="steps">
        <li><span class="step-ico">${ico("map")}</span><span><b class="step-t">1. Jelajahi lokasi</b><span class="step-d">Pilih node yang terbuka pada peta perjalanan.</span></span></li>
        <li><span class="step-ico">${ico("talk")}</span><span><b class="step-t">2. Baca dialog</b><span class="step-d">Dekati tokoh lalu tekan SPASI atau LANJUT untuk berbicara.</span></span></li>
        <li><span class="step-ico">${ico("check")}</span><span><b class="step-t">3. Pilih jawaban</b><span class="step-d">Tentukan pilihan A, B, atau C — urutannya diacak tiap main.</span></span></li>
        <li><span class="step-ico">${ico("star")}</span><span><b class="step-t">4. Jawaban benar mendapatkan poin</b><span class="step-d">Setiap level bernilai 1 poin, skor maksimal 6.</span></span></li>
        <li><span class="step-ico">${ico("scroll")}</span><span><b class="step-t">5. Buka fakta sejarah</b><span class="step-d">Selesaikan tiap level untuk membuka kartu fakta.</span></span></li>
        <li><span class="step-ico">${ico("flag")}</span><span><b class="step-t">6. Selesaikan seluruh perjalanan</b><span class="step-d">Dari prolog hingga epilog dan lihat skor akhir.</span></span></li>
        <li><span class="step-ico">${ico("quest")}</span><span><b class="step-t">Tips</b><span class="step-d">Gunakan ◀ ▶ (keyboard/tombol layar) untuk berjalan menghampiri tokoh.</span></span></li>
      </ul>`,
      `<button type="button" class="btn btn--primary" data-close>${ico("back")}KEMBALI</button>`);
  } else if (kind === "tokoh") {
    html = modalShell(ico("people") + "TOKOH", `
      <p class="modal__lead">Tokoh sejarah yang akan kamu temui, plus karakter fiktif sebagai saksi perjalanan.</p>
      <div class="cards">
        <div class="tokoh-card is-player">
          <div class="tokoh-face"><img src="assets/characters/pemain.png" alt="Pemain"></div><h4>PEMAIN</h4>
          <p>Karakter fiktif. Bukan tokoh sejarah — hanya saksi perjalanan yang mengamati peristiwa.</p>
          <span class="tokoh-role">KARAKTER FIKTIF</span>
        </div>
        <div class="tokoh-card">
          <div class="tokoh-face"><img src="assets/characters/nan-tuo.png" alt="Tuanku Nan Tuo"></div><h4>TUANKU NAN TUO</h4>
          <p>Tokoh awal Kaum Padri yang menekankan pendidikan dan dakwah.</p>
          <span class="tokoh-role">KAUM PADRI</span>
        </div>
        <div class="tokoh-card">
          <div class="tokoh-face"><img src="assets/characters/nan-renceh.png" alt="Tuanku Nan Renceh"></div><h4>TUANKU NAN RENCEH</h4>
          <p>Tokoh awal Kaum Padri dengan peran dan pendekatan yang berbeda.</p>
          <span class="tokoh-role">KAUM PADRI</span>
        </div>
        <div class="tokoh-card">
          <div class="tokoh-face"><img src="assets/characters/imam-bonjol.png" alt="Tuanku Imam Bonjol"></div><h4>TUANKU IMAM BONJOL</h4>
          <p>Pemimpin perlawanan di Benteng Bonjol. Menyerah kepada Belanda pada Oktober 1837.</p>
          <span class="tokoh-role">PEMIMPIN PERLAWANAN</span>
        </div>
        <div class="tokoh-card">
          <div class="tokoh-face"><img src="assets/characters/sultan.png" alt="Sultan Tangkal Alam Bagagar"></div><h4>SULTAN TANGKAL ALAM BAGAGAR</h4>
          <p>Tokoh Minangkabau yang berdialog dengan pemain saat Belanda masuk.</p>
          <span class="tokoh-role">TOKOH MINANGKABAU</span>
        </div>
        <div class="tokoh-card">
          <div class="tokoh-face"><img src="assets/characters/dekock.png" alt="Jenderal de Kock"></div><h4>JENDERAL HENDRIK MERKUS DE KOCK</h4>
          <p>Jenderal Belanda yang menuntut berakhirnya perlawanan.</p>
          <span class="tokoh-role">PIHAK BELANDA</span>
        </div>
      </div>`,
      `<button type="button" class="btn btn--primary" data-close>${ico("back")}KEMBALI</button>`);
  } else if (kind === "fakta") {
    const items = FACT_LIST.map(function (f, i) {
      const unlocked = gameState.factsUnlocked.includes(LEVEL_IDS[i]);
      return unlocked
        ? `<div class="fact-mini"><span class="fact-mini__ico">${ico("scroll")}</span><div>
             <span class="fact-mini__no">FACT ${f.no}</span>
             <div class="fact-mini__period">${f.period} — ${f.title}</div>
             <div class="fact-mini__text">${f.text}</div></div></div>`
        : `<div class="fact-mini is-locked"><span class="fact-mini__ico">${ico("lock_small")}</span><div>
             <span class="fact-mini__no">FACT ${f.no}</span>
             <div class="fact-mini__period">Terkunci</div>
             <div class="fact-mini__text">Selesaikan perjalanan untuk membuka fakta ini.</div></div></div>`;
    }).join("");
    html = modalShell(ico("scroll") + "FAKTA SEJARAH", `
      <p class="modal__lead">Terbuka otomatis setiap kali kamu menyelesaikan satu level. Terbuka: ${gameState.factsUnlocked.length}/6</p>
      <div class="fact-grid">${items}</div>`,
      `<button type="button" class="btn btn--primary" data-close>${ico("back")}KEMBALI</button>`);
  } else if (kind === "timeline") {
    html = modalShell(ico("compass") + "TIMELINE PERANG PADRI", `
      <p class="modal__lead">Ringkasan empat fase utama Perang Padri 1821–1837.</p>
      <div class="timeline--modal">${timelineHtml()}</div>`,
      `<button type="button" class="btn btn--primary" data-close>${ico("back")}KEMBALI</button>`);
  }
  openModal(html, {});
}

/* =============================================================
   10. TIMELINE
   ============================================================= */
function timelineHtml() {
  const items = [
    { y: "1821–1825", t: "PADRI VS ADAT" },
    { y: "1825–1830", t: "PERUNDINGAN" },
    { y: "1830–1837", t: "PADRI + ADAT VS BELANDA" },
    { y: "1837", t: "BONJOL JATUH" }
  ];
  let html = '<ol class="timeline">';
  items.forEach(function (it, i) {
    html += `<li class="tl-item" style="animation-delay:${(i * 0.18).toFixed(2)}s">
      <span class="tl-year">${it.y}</span><span class="tl-sep">•</span><span class="tl-label">${it.t}</span></li>`;
    if (i < items.length - 1) {
      html += `<li class="tl-arrow" style="animation-delay:${((i * 0.18) + 0.1).toFixed(2)}s">↓</li>`;
    }
  });
  return html + "</ol>";
}

/* =============================================================
   11. MESIN SCENE
   ============================================================= */
function startGame() {
  resetGame();
  loadScene("prologue");
}

function resetGame() {
  gameState.currentScene = null;
  gameState.currentLevel = 0;
  gameState.score = 0;
  gameState.factsUnlocked = [];
  gameState.completedScenes = [];
  gameState.scoredScenes = [];
  gameState.selectedChoice = null;
  gameState.answered = false;
  gameState.stepIndex = 0;
  gameState.scene = null;
  gameState.inLevel = false;
  gameState.returnScreen = null;
  dom.stageDark.classList.remove("is-on");
  updateScore(false);
  updateProgress();
}

function restartGame() {
  playSfx("click");
  startGame();
}

function loadScene(id) {
  const scene = SCENES[id];
  if (!scene) {
    console.warn("[Jelajah] Scene tidak ditemukan:", id);
    return;
  }
  gameState.currentScene = id;
  gameState.currentLevel = scene.order || 0;
  gameState.scene = scene;
  gameState.stepIndex = 0;
  gameState.answered = false;
  gameState.selectedChoice = null;
  gameState.inLevel = (scene.kind === "level");
  gameState.returnScreen = null;
  showScreen("game");
  renderScene();
  updateScore(false);
  updateProgress();
  showStep();
}

function renderScene() {
  const scene = gameState.scene;
  setBackground(scene.bg);
  setPlace(scene.place);

  setPlayerX(26);
  gameState.walkTarget = null;
  gameState.autoTalk = false;
  gameState.moveDir = 0;
  hideToast();
  if (dom.stagePlayer) dom.stagePlayer.classList.remove("is-walking");
  if (scene.hideTitle) {
    dom.stageTitle.innerHTML = "";
    dom.stageTitle.className = "stage__title";
  } else {
    dom.stageTitle.className = "stage__title" + (scene.persistentTitle ? " is-persistent" : "");
    dom.stageTitle.innerHTML =
      `<span class="st-main">${scene.title}</span><span class="st-sub">${scene.sub}</span>`;
  }

  dom.stageDark.classList.remove("is-on");
  renderCast(scene.cast || []);
  dom.hudLevel.textContent = scene.hud;

  if (scene.visual === "timeline") {
    dom.stageVisual.insertAdjacentHTML("beforeend",
      `<div class="epilog-title">${scene.title}</div>${timelineHtml()}`);
  }
}

/* posisi NPC pada panggung (% lebar panggung) */
const NPC_X = [60, 76, 91];

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, function (m) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m];
  });
}

function renderCast(list) {
  const npcs = (list || []).filter(function (c) { return c.name !== "PEMAIN"; });
  dom.stageCast.innerHTML = npcs.map(function (c, i) {
    const sp = SPEAKERS[c.name] || { sprite: "warga", tint: "t-narator" };
    const x = NPC_X[i] !== undefined ? NPC_X[i] : (NPC_X[NPC_X.length - 1] + 7);
    return `<div class="char ${sp.tint}" data-name="${escapeHtml(c.name)}" data-x="${x}"
        style="left:${x}%;animation-delay:${(0.06 * i).toFixed(2)}s">
      <span class="char__mark" aria-hidden="true"><img src="assets/icons/quest.png" alt=""></span>
      <img class="char__sprite" src="${spriteSrc(c.name)}" alt="">
      <span class="char__name">${escapeHtml(c.name)}</span>
    </div>`;
  }).join("");
}

function highlightCast(speakerName) {
  const chars = dom.stageCast.querySelectorAll(".char");
  chars.forEach(function (c) {
    const on = !!speakerName && c.getAttribute("data-name") === speakerName;
    c.classList.toggle("is-speaking", on);
    c.classList.toggle("is-target", on);
  });
}

/* =============================================================
   b. PEMAIN BERJALAN & NGOBROL (gaya quest RPG)
   ============================================================= */
const NPC_RANGE = 12;   /* jarak "dekat" dalam % lebar panggung */
const WALK_SPEED = 52;  /* % lebar panggung per detik */

let toastTimer = null;

function toast(msg, warn) {
  if (!dom.stageToast) return;
  dom.stageToast.hidden = false;
  dom.stageToast.textContent = msg;
  dom.stageToast.classList.toggle("is-warn", !!warn);
  dom.stage.classList.add("has-toast");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { dom.stageToast.hidden = true; dom.stage.classList.remove("has-toast"); }, 3000);
}

function hideToast() {
  clearTimeout(toastTimer);
  if (dom.stageToast) dom.stageToast.hidden = true;
  dom.stage.classList.remove("has-toast");
}

function setPlayerX(x) {
  const v = Math.max(5, Math.min(95, x));
  gameState.playerX = v;
  if (dom.stagePlayer) dom.stagePlayer.style.left = v.toFixed(2) + "%";
}

function setWalking(on) {
  if (dom.stagePlayer) dom.stagePlayer.classList.toggle("is-walking", !!on);
}

function currentStepNpc() {
  const step = currentStep();
  if (!step) return null;
  const name = step.speaker;
  if (!name || name === "NARATOR" || name === "PEMAIN" || name === "PERTANYAAN") return null;
  const node = dom.stageCast.querySelector('.char[data-name="' + name.replace(/"/g, "") + '"]');
  if (!node) return null;
  return { name: name, x: parseFloat(node.getAttribute("data-x")) || 60, node: node };
}

function nearNpc() {
  const npc = currentStepNpc();
  if (!npc) return true;
  return Math.abs(gameState.playerX - npc.x) <= NPC_RANGE;
}

function manualMove(dir) {
  gameState.moveDir = dir;
  gameState.walkTarget = null;
  gameState.autoTalk = false;
  if (dir !== 0) hideToast();
}

function talkToNpc(name) {
  const npc = currentStepNpc();
  const node = dom.stageCast.querySelector('.char[data-name="' + String(name).replace(/"/g, "") + '"]');
  if (!node) return;
  const x = parseFloat(node.getAttribute("data-x")) || 60;
  gameState.moveDir = 0;

  if (!npc || npc.name !== name) {
    gameState.walkTarget = x;
    gameState.autoTalk = false;
    toast(npc ? "Giliran berbicara dengan " + npc.name + "." : "Menghampiri " + name + ".", false);
    return;
  }
  gameState.walkTarget = x;
  gameState.autoTalk = true;
  toast("Mendekati " + name + "…", false);
}

function playerArrived() {
  gameState.walkTarget = null;
  setWalking(false);
  if (gameState.autoTalk) {
    gameState.autoTalk = false;
    setTimeout(function () { advanceStep(); }, 90);
  }
}

function movementLoop(ts) {
  requestAnimationFrame(movementLoop);
  if (!movementLoop.last) movementLoop.last = ts;
  const dt = Math.min(0.05, (ts - movementLoop.last) / 1000);
  movementLoop.last = ts;

  if (gameState.screen !== "game" || !dom.overlay.hidden) {
    gameState.moveDir = 0;
    setWalking(false);
    return;
  }

  let dir = gameState.moveDir;
  if (dir === 0 && gameState.walkTarget !== null) {
    const d = gameState.walkTarget - gameState.playerX;
    if (Math.abs(d) <= 1.2) { playerArrived(); return; }
    dir = d > 0 ? 1 : -1;
  }
  if (dir === 0) { setWalking(false); return; }

  const before = gameState.playerX;
  setPlayerX(gameState.playerX + dir * WALK_SPEED * dt);
  setWalking(gameState.playerX !== before);

  if (gameState.walkTarget !== null) {
    const passed = (dir > 0 && gameState.playerX >= gameState.walkTarget - 0.01) ||
                   (dir < 0 && gameState.playerX <= gameState.walkTarget + 0.01);
    if (passed || gameState.playerX === before) playerArrived();
  }
}

function setPlace(text) {
  if (text) dom.stagePlace.innerHTML = ico("flag") + escapeHtml(text);
}

function currentStep() {
  if (!gameState.scene) return null;
  return gameState.scene.steps[gameState.stepIndex] || null;
}

function showStep() {
  const scene = gameState.scene;
  if (!scene) return;
  hideToast();
  if (gameState.stepIndex >= scene.steps.length) { completeScene(); return; }

  const step = scene.steps[gameState.stepIndex];
  if (step.bg) setBackground(step.bg);
  if (step.place) setPlace(step.place);
  if (step.cast) renderCast(step.cast);
  if (step.fx) applyFx(step.fx);
  if (step.sfx) playSfx(step.sfx);

  switch (step.type) {
    case "card": showCard(step); break;
    case "quiz": showDialogue(step); showChoices(step); break;
    default: showDialogue(step);
  }

  if (gameState.stepIndex === 0) {
    const npc = currentStepNpc();
    if (npc) toast("◀ ▶ berjalan, lalu SPASI di dekat " + npc.name, false);
  }
}

function applyFx(fx) {
  if (fx === "alliance") {
    const box = document.getElementById("alliance");
    if (box) box.classList.add("is-shifted");
  } else if (fx === "siege") {
    dom.stage.classList.remove("is-shaking");
    void dom.stage.offsetWidth;
    dom.stage.classList.add("is-shaking");
    setTimeout(function () { dom.stage.classList.remove("is-shaking"); }, 700);
    dom.stageDark.classList.add("is-on");
    playSfx("boom");
  } else if (fx === "dark") {
    dom.stageDark.classList.add("is-on");
  }
}

/* ---------- dialog ---------- */
function setSpeaker(name) {
  const sp = SPEAKERS[name] || { sprite: "scroll", icon: true, tint: "t-narator" };
  dom.dialogSpeaker.textContent = name;
  dom.dialogAvatar.innerHTML = `<img src="${spriteSrc(name)}" alt="">`;
  dom.dialogAvatar.className = "avatar " + sp.tint;
}

function setHint(text) { dom.hint.textContent = text; }

let typeTimer = null;
let typeToken = 0;
let typingActive = false;

function typeText(text) {
  const node = dom.dialogText;
  typeToken += 1;
  const token = typeToken;
  clearInterval(typeTimer);
  typingActive = false;
  node.textContent = "";
  let i = 0;
  typingActive = true;
  typeTimer = setInterval(function () {
    if (token !== typeToken) { clearInterval(typeTimer); return; }
    i += 2;
    node.textContent = text.slice(0, i);
    if (i >= text.length) {
      clearInterval(typeTimer);
      node.textContent = text;
      typingActive = false;
    }
  }, 16);
}

function finishTyping() {
  const step = currentStep();
  clearInterval(typeTimer);
  typingActive = false;
  if (step && step.text) dom.dialogText.textContent = step.text;
}

function showDialogue(step) {
  dom.dialog.classList.remove("is-card-mode");
  dom.cardSlot.hidden = true;
  dom.dialogHead.hidden = false;
  dom.dialogBubble.hidden = false;
  dom.choices.hidden = true;
  dom.choices.innerHTML = "";
  dom.feedback.hidden = true;
  const isQuiz = step.type === "quiz";
  dom.btnNext.hidden = isQuiz; /* tombol LANJUT muncul setelah jawaban dipilih */
  dom.btnNext.textContent = step.nextLabel || "LANJUT →";

  dom.dialogTag.textContent = isQuiz ? "QUIZ" : "DIALOG";
  setSpeaker(step.speaker || "NARATOR");
  highlightCast(isQuiz ? null : step.speaker);
  setHint(isQuiz ? "Pilih satu jawaban untuk melanjutkan." : "Tekan LANJUT untuk melanjutkan percakapan.");
  typeText(isQuiz ? step.question : step.text);
  playSfx("click");
}

/* ---------- kartu reveal ---------- */
function showCard(step) {
  dom.dialog.classList.add("is-card-mode");
  dom.cardSlot.hidden = false;
  dom.cardSlot.innerHTML =
    `<div class="bigcard__kicker">${step.kicker || ico("scroll") + "REVEAL"}</div>` +
    `<span class="bigcard__title">${step.title}</span>` +
    `<div class="bigcard__sub">${step.sub || ""}</div>`;
  dom.btnNext.hidden = false;
  dom.btnNext.textContent = step.label || "LANJUT →";
  setHint(step.hint || "Tekan tombol untuk melanjutkan.");
  playSfx("unlock");
}

/* ---------- pilihan / quiz (urutan diacak supaya tidak selalu A) ---------- */
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function showChoices(step) {
  dom.choices.hidden = false;
  const order = shuffle(step.options.map(function (_, i) { return i; }));
  gameState.choiceOrder = order;
  dom.choices.innerHTML = order.map(function (idx, pos) {
    return `<button type="button" class="choice" data-index="${idx}">
      <span class="choice__key">${String.fromCharCode(65 + pos)}</span>
      <span class="choice__text">${step.options[idx]}</span>
      <span class="choice__mark"></span>
    </button>`;
  }).join("");
}

function handleChoice(index) {
  if (gameState.answered) return;
  const step = currentStep();
  if (!step || step.type !== "quiz") return;

  gameState.answered = true;
  gameState.selectedChoice = index;

  const buttons = Array.prototype.slice.call(dom.choices.querySelectorAll(".choice"));
  const correct = index === step.answer;

  buttons.forEach(function (b, i) {
    b.disabled = true;
    const mark = b.querySelector(".choice__mark");
    if (i === index) b.classList.add("is-selected");
    if (i === step.answer) {
      b.classList.add("is-correct");
      mark.textContent = "✓";
    } else if (i === index) {
      b.classList.add("is-wrong");
      mark.textContent = "✕";
    } else {
      b.classList.add("is-muted");
      mark.textContent = "";
    }
  });

  dom.feedback.hidden = false;
  dom.feedback.className = "feedback " + (correct ? "is-correct" : "is-wrong");
  dom.feedback.innerHTML =
    `<span class="fb-head">${correct ? "✓ Tepat!" : "✕ Belum tepat."}</span>` +
    (correct ? step.correctText : step.wrongText);

  const sceneId = gameState.currentScene;
  if (correct) {
    if (gameState.scoredScenes.indexOf(sceneId) === -1) {
      gameState.scoredScenes.push(sceneId);
      gameState.score = Math.min(gameState.score + 1, MAX_SCORE);
      updateScore(true);
    }
    playSfx("correct");
  } else {
    playSfx("wrong");
  }

  dom.btnNext.hidden = false;
  dom.btnNext.textContent = "LANJUT →";
  setHint(correct ? "Poin bertambah! Tekan LANJUT untuk melanjutkan." : "Tekan LANJUT untuk melanjutkan — penjelasan sudah ditampilkan.");
}

/* ---------- navigasi langkah ---------- */
function advanceStep() {
  if (!dom.overlay.hidden) return;
  if (gameState.screen !== "game") return;
  if (typingActive) { finishTyping(); return; }

  const step = currentStep();
  if (step && step.type === "quiz" && !gameState.answered) return;

  /* harus berada di dekat tokoh yang sedang berbicara */
  const npc = currentStepNpc();
  if (npc && Math.abs(gameState.playerX - npc.x) > NPC_RANGE) {
    gameState.moveDir = 0;
    gameState.walkTarget = npc.x;
    gameState.autoTalk = true;
    toast("Dekati " + npc.name + " dulu — jalan dengan ◀ ▶ atau SPASI.", true);
    playSfx("click");
    return;
  }

  /* jangan sampai sisa perintah jalan memicu langkah ganda */
  gameState.moveDir = 0;
  gameState.walkTarget = null;
  gameState.autoTalk = false;

  gameState.stepIndex += 1;
  showStep();
}

/* ---------- penyelesaian scene ---------- */
function completeScene() {
  const scene = gameState.scene;
  if (!scene) return;

  if (gameState.completedScenes.indexOf(scene.id) === -1) {
    gameState.completedScenes.push(scene.id);
  }
  gameState.inLevel = false;
  gameState.returnScreen = null;
  updateProgress();
  playSfx("unlock");

  if (scene.kind === "level") {
    showFact(scene.id);
  } else if (scene.kind === "prologue") {
    showMap();
  } else {
    showFinalResult();
  }
}

function nextScene() {
  const scene = gameState.scene;
  if (!scene) return;
  const target = scene.next;
  if (target === "map") showMap();
  else if (target === "final") showFinalResult();
  else if (target) loadScene(target);
}

/* ---------- historical fact ---------- */
function showFact(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene || !scene.fact) { nextScene(); return; }
  const f = scene.fact;

  if (gameState.factsUnlocked.indexOf(sceneId) === -1) {
    gameState.factsUnlocked.push(sceneId);
  }

  const html = `
    <div class="fact-card">
      <div class="fact-card__head">${ico("scroll")}HISTORICAL FACT UNLOCKED</div>
      <div class="fact-card__period">${f.period}</div>
      <h4 class="fact-card__title">${f.title}</h4>
      <p class="fact-card__text">${f.text}</p>
      <span class="fact-card__no">FACT ${f.no} / 6</span>
    </div>
    <div class="modal__foot">
      <button type="button" class="btn btn--primary" data-primary>LANJUTKAN →</button>
    </div>`;

  openModal(html, {
    closable: false,
    onPrimary: function () {
      closeModal();
      nextScene();
    }
  });
}

/* =============================================================
   12. SKOR & PROGRES
   ============================================================= */
function updateScore(animate) {
  dom.hudScore.textContent = String(gameState.score);
  if (animate) {
    dom.hudScore.classList.remove("is-bump");
    void dom.hudScore.offsetWidth;
    dom.hudScore.classList.add("is-bump");
  }
}

function updateProgress() {
  const done = completedLevels();
  const pct = Math.round((done / MAX_LEVELS) * 100);
  const C = 201; /* keliling lingkaran ring (r=32) */

  dom.hudProgress.textContent = String(done);
  dom.hudMeter.style.width = pct + "%";
  dom.ringFg.style.strokeDashoffset = String(C * (1 - pct / 100));
  dom.ringVal.textContent = pct + "%";
}

function completedLevels() {
  return MAP_NODES.filter(function (n) {
    return gameState.completedScenes.indexOf(n.scene) !== -1;
  }).length;
}

/* =============================================================
   13. PETA
   ============================================================= */
function showMap(returnTo) {
  gameState.returnScreen = returnTo || null;
  showScreen("map");
  renderMap();
  playSfx("map");
}

/* ---- data lapisan peta Nusantara ---- */
const MAP_ROUTES = [
  "M -10 88 C 30 112, 76 132, 128 146",
  "M 300 266 C 380 262, 470 252, 540 234 C 566 228, 584 214, 604 200",
  "M 250 258 C 226 252, 206 244, 186 226 C 160 204, 140 180, 132 166 C 128 158, 126 152, 130 148"
];

const MAP_PINS = {
  belanda: [
    { x: 136, y: 150, lx: 46,  ly: 172, t: "PADANG" },
    { x: 185, y: 200, lx: 248, ly: 224, t: "PALEMBANG" },
    { x: 266, y: 272, lx: 352, ly: 230, t: "BATAVIA" },
    { x: 606, y: 194, lx: 672, ly: 232, t: "MAKASSAR" }
  ],
  nusantara: [
    { x: 34,  y: 36,  lx: 86,  ly: 22,  t: "ACEH" },
    { x: 72,  y: 80,  lx: 186, ly: 70,  t: "BATAK" },
    { x: 122, y: 131, lx: 232, ly: 120, t: "MINANGKABAU / BONJOL" },
    { x: 341, y: 280, lx: 368, ly: 314, t: "JAWA" },
    { x: 614, y: 186, lx: 690, ly: 176, t: "BUGIS" },
    { x: 450, y: 300, lx: 450, ly: 334, t: "BALI" },
    { x: 714, y: 118, lx: 676, ly: 70,  t: "TERNATE" },
    { x: 900, y: 210, lx: 906, ly: 272, t: "PAPUA" }
  ]
};

/* pulau-pulau bergaya (bukan skala akurat) */
const MAP_ISLES_POLY = [
  "28,28 60,55 100,95 140,140 180,185 218,228 238,255 224,262 202,238 172,205 138,166 104,126 70,86 40,52 24,40",
  "246,264 285,268 330,274 375,280 415,286 436,292 434,304 410,302 372,297 330,292 286,286 248,278",
  "446,72 470,58 505,58 538,74 556,100 556,132 536,158 505,172 470,168 446,148 434,116 436,90",
  "590,96 606,74 622,66 632,84 634,110 646,140 664,176 656,192 642,164 630,132 620,152 616,190 602,206 598,168 604,132 592,118",
  "826,196 858,178 896,168 934,172 968,186 986,204 978,224 950,238 912,244 874,238 842,226 828,214"
];

const MAP_ISLES_ELL = [
  [400, 272, 16, 5, ""],  [450, 300, 9, 7, ""],   [470, 303, 8, 7, ""],
  [512, 304, 22, 7, ""],  [576, 318, 20, 6, ""],  [648, 326, 26, 7, ""],
  [250, 172, 7, 12, ""],  [284, 188, 8, 6, ""],   [736, 186, 20, 6, ""],
  [800, 170, 10, 6, ""],  [786, 198, 8, 5, ""],
  [100, 156, 5, 17, ' transform="rotate(-40 100 156)"'],
  [76, 108, 4, 13, ' transform="rotate(-40 76 108)"']
];

const MAP_ISLES_EXTRA = [
  "700,96 712,86 722,100 724,124 714,142 704,134 706,112"
];

const MAP_WAVES = [
  "M 300 352 q 26 -9 52 0 t 52 0",
  "M 60 240 q 24 -9 48 0 t 48 0",
  "M 760 326 q 26 -9 52 0 t 52 0",
  "M 300 60 q 26 -9 52 0 t 52 0",
  "M 860 120 q 26 -9 52 0 t 52 0"
];

const mapLayers = { belanda: true, nusantara: true, arah: true };

function mapChip(lx, ly, text) {
  const w = Math.round(text.length * 8.2 + 24);
  return `<rect class="mk-label-bg" x="${lx - w / 2}" y="${ly - 13}" width="${w}" height="26" rx="13"/>` +
         `<text class="mk-label-tx" x="${lx}" y="${ly + 4.5}">${text}</text>`;
}

function mapPin(p, cls, r) {
  return `<circle class="${cls}" cx="${p.x}" cy="${p.y}" r="${r}"/>` +
         `<circle cx="${p.x}" cy="${p.y}" r="${(r / 3).toFixed(1)}" fill="#ffffff" opacity=".92"/>`;
}

function mapPinGroup(list, cls, r, glow) {
  return list.map(function (p) {
    const g = glow ? `<circle class="${glow}" cx="${p.x}" cy="${p.y}" r="${glow === "glow-padri" ? 38 : 26}"/>` : "";
    return g + mapPin(p, cls, r);
  }).join("");
}

function mapLeads(list) {
  return list.map(function (p) {
    return `<line class="mk-lead" x1="${p.x}" y1="${p.y}" x2="${p.lx}" y2="${p.ly}"/>`;
  }).join("");
}

function mapChips(list) {
  return list.map(function (p) { return mapChip(p.lx, p.ly, p.t); }).join("");
}

function buildMapSvg() {
  const isles =
    MAP_ISLES_POLY.map(function (pts) { return `<polygon class="isle isle--big" points="${pts}"/>`; }).join("") +
    MAP_ISLES_EXTRA.map(function (pts) { return `<polygon class="isle" points="${pts}"/>`; }).join("") +
    MAP_ISLES_ELL.map(function (e) {
      return `<ellipse class="isle" cx="${e[0]}" cy="${e[1]}" rx="${e[2]}" ry="${e[3]}"${e[4]}/>`;
    }).join("");

  const waves = MAP_WAVES.map(function (d) { return `<path class="sea-line" d="${d}"/>`; }).join("");

  const routes = MAP_ROUTES.map(function (d) {
    return `<path class="route" d="${d}" marker-end="url(#mapArrow)"/>`;
  }).join("");

  const nusantara =
    `<g id="layer-nusantara">
       <circle class="glow-padri" cx="122" cy="131" r="38"/>
       <circle class="padri-ring" cx="122" cy="131" r="46"/>
       ${mapPinGroup(MAP_PINS.nusantara, "pin-nusantara", 9, null)}
       ${mapLeads(MAP_PINS.nusantara)}
       ${mapChips(MAP_PINS.nusantara)}
       <path class="mk-lead" d="M 204 152 L 168 141" fill="none"/>
       ${mapChip(300, 152, "WILAYAH PERANG PADRI")}
     </g>`;

  const belanda =
    `<g id="layer-belanda">
       ${MAP_PINS.belanda.map(function (p) {
          return `<circle class="glow-belanda" cx="${p.x}" cy="${p.y}" r="26"/>`;
        }).join("")}
       ${routes}
       ${mapPinGroup(MAP_PINS.belanda, "pin-belanda", 9, null)}
       ${mapLeads(MAP_PINS.belanda)}
       ${mapChips(MAP_PINS.belanda)}
     </g>`;

  const arah =
    `<g id="layer-arah">
       <path class="arah-arrow" d="M 152 158 C 250 186, 350 196, 424 192" marker-end="url(#mapArrow2)"/>
       <g transform="translate(450,190)">
         <path class="star" d="M0,-16 L4.7,-4.9 L16.6,-4.9 L7.1,2 L10.5,13.4 L0,6.6 L-10.5,13.4 L-7.1,2 L-16.6,-4.9 L-4.7,-4.9 Z"/>
       </g>
       ${mapChip(450, 226, "INDONESIA")}
       <g transform="translate(60,300)">
         <circle cx="0" cy="0" r="32" fill="rgba(255,255,255,.94)" stroke="#2b6ea8" stroke-width="3"/>
         <path d="M0,-22 L7,0 L0,6 L-7,0 Z" fill="#e2574c" stroke="#ffffff" stroke-width="1.5"/>
         <path d="M0,22 L7,0 L0,-6 L-7,0 Z" fill="#ffffff" stroke="#2b6ea8" stroke-width="1.5"/>
         <text class="compass-tx" x="0" y="-38">U</text>
         <text class="compass-tx" x="0" y="50">S</text>
         <text class="compass-tx" x="46" y="6">T</text>
         <text class="compass-tx" x="-46" y="6">B</text>
       </g>
       <g transform="translate(620,356)">
         <rect class="banner-bg" x="-100" y="-14" width="200" height="28" rx="14"/>
         <text class="banner-tx" x="0" y="5">ARAH MENUJU INDONESIA</text>
       </g>
     </g>`;

  return `<svg viewBox="0 0 1000 380" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="Peta bergaya Nusantara: penyebaran Belanda, persebaran masyarakat Nusantara, dan arah menuju Indonesia">
    <defs>
      <marker id="mapArrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#e2574c"/>
      </marker>
      <marker id="mapArrow2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#2e9e6b"/>
      </marker>
    </defs>
    ${waves}
    <g>${isles}</g>
    <text class="map-label" x="640" y="300">NUSANTARA</text>
    <text class="sea-label" x="200" y="354">SAMUDRA HINDIA</text>
    ${nusantara}
    ${belanda}
    ${arah}
  </svg>`;
}

function renderMapCanvas() {
  dom.mapCanvas.innerHTML = buildMapSvg();
  applyMapLayers();
}

function applyMapLayers() {
  const c = dom.mapCanvas;
  c.classList.toggle("no-belanda", !mapLayers.belanda);
  c.classList.toggle("no-nusantara", !mapLayers.nusantara);
  c.classList.toggle("no-arah", !mapLayers.arah);
}

function renderMap() {
  renderMapCanvas();

  const firstOpen = MAP_NODES.findIndex(function (n) {
    return gameState.completedScenes.indexOf(n.scene) === -1;
  });

  let html = "";
  MAP_NODES.forEach(function (node, i) {
    const done = gameState.completedScenes.indexOf(node.scene) !== -1;
    const current = i === firstOpen;
    const locked = !done && !current;
    const stateLabel = done ? ico("check") + "SELESAI" : (current ? "▶ TERBUKA" : ico("lock_small") + "TERKUNCI");
    const cls = done ? "is-done" : (current ? "is-current" : "is-locked");

    html += `<button type="button" class="map-node ${cls}" data-node="${i}"
        style="animation-delay:${(i * 0.07).toFixed(2)}s" ${locked ? 'aria-disabled="true"' : ""}>
      <span class="map-node__icon">${ico(node.icon)}</span>
      <span class="map-node__body">
        <span class="map-node__name">${node.name}</span>
        <span class="map-node__desc">${node.desc}</span>
      </span>
      <span class="map-node__state">${stateLabel}</span>
    </button>`;
  });

  dom.mapPath.innerHTML = html;

  if (firstOpen === -1) {
    dom.mapSub.textContent = "Semua lokasi selesai. Pilih lokasi untuk mengulang.";
  } else {
    dom.mapSub.textContent = "Klik lokasi ▶ untuk lanjut • ✓ = selesai.";
    const cur = dom.mapPath.querySelector(".map-node.is-current");
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest" });
  }

  const showBack = !!gameState.returnScreen;
  dom.btnMapBack.hidden = !showBack;
}

function onMapNode(index) {
  const node = MAP_NODES[index];
  if (!node) return;

  const shakeNode = function () {
    const btn = dom.mapPath.querySelector('[data-node="' + index + '"]');
    if (btn) {
      btn.classList.add("is-shake");
      setTimeout(function () { btn.classList.remove("is-shake"); }, 500);
    }
    playSfx("wrong");
  };

  /* prolog belum selesai -> peta belum boleh dipakai */
  if (gameState.completedScenes.indexOf("prologue") === -1) {
    dom.mapSub.textContent = "Selesaikan prolog terlebih dahulu sebelum memulai perjalanan.";
    shakeNode();
    return;
  }

  const done = gameState.completedScenes.indexOf(node.scene) !== -1;
  const firstOpen = MAP_NODES.findIndex(function (n) {
    return gameState.completedScenes.indexOf(n.scene) === -1;
  });
  const locked = !done && index !== firstOpen;

  if (locked) {
    shakeNode();
    return;
  }

  /* klik node yang sedang dimainkan -> kembali ke permainan */
  if (gameState.inLevel && node.scene === gameState.currentScene) {
    showScreen("game");
    return;
  }

  gameState.returnScreen = null;
  loadScene(node.scene);
}

/* =============================================================
   14. HASIL AKHIR
   ============================================================= */
function showFinalResult() {
  const perfect = gameState.score >= MAX_SCORE;
  const factCount = gameState.factsUnlocked.length;

  dom.finalContent.innerHTML = `
    <div class="final">
      <div class="final__badge"><img src="assets/icons/${perfect ? "crown" : "star"}.png" alt=""></div>
      <h2 class="final__title">PERJALANAN SELESAI!</h2>
      <p class="final__lead">Kamu telah menyelesaikan <b>Jelajah Perang Padri</b> — dari Nagari hingga jatuhnya Bonjol.</p>
      <div class="final__banner ${perfect ? "is-perfect" : "is-normal"}">
        ${perfect ? ico("crown") + "PERJALANAN SEJARAH SEMPURNA!" : "Coba lagi untuk mendapatkan skor sempurna."}
      </div>
      <div class="final__stats">
        <div class="stat"><span class="stat__num">${gameState.score} / ${MAX_SCORE}</span><span class="stat__label">${ico("star")}SCORE</span></div>
        <div class="stat"><span class="stat__num">${factCount} / 6</span><span class="stat__label">${ico("scroll")}HISTORICAL FACTS</span></div>
        <div class="stat"><span class="stat__num">${completedLevels()} / ${MAX_LEVELS}</span><span class="stat__label">${ico("map")}LOKASI SELESAI</span></div>
      </div>
      <div class="final__buttons">
        <button type="button" class="btn" data-act="facts">${ico("scroll")}LIHAT FAKTA</button>
        <button type="button" class="btn" data-act="timeline">${ico("compass")}LIHAT TIMELINE</button>
        <button type="button" class="btn btn--primary" data-act="restart">${ico("flag")}MAIN LAGI</button>
      </div>
    </div>`;

  gameState.inLevel = false;
  showScreen("final");
  updateScore(false);
  updateProgress();
  playSfx(perfect ? "perfect" : "unlock");
}

/* =============================================================
   15. EVENT & INIT
   ============================================================= */
function bindEvents() {
  /* --- HOME --- */
  el("btn-start").addEventListener("click", function () {
    Sound.resume();
    playSfx("click");
    startGame();
  });
  el("btn-howto").addEventListener("click", function () { playSfx("click"); openInfo("howto"); });
  el("btn-tokoh").addEventListener("click", function () { playSfx("click"); openInfo("tokoh"); });
  el("btn-fakta-home").addEventListener("click", function () { playSfx("click"); openInfo("fakta"); });
  el("btn-sound-home").addEventListener("click", function () { Sound.resume(); toggleSound(); });

  /* --- HUD --- */
  el("btn-open-map").addEventListener("click", function () {
    if (gameState.screen !== "map") {
      showMap(gameState.screen);
    }
  });
  el("btn-sound").addEventListener("click", function () { Sound.resume(); toggleSound(); });

  /* --- LANJUT --- */
  dom.btnNext.addEventListener("click", function () {
    Sound.resume();
    advanceStep();
  });

  /* --- PILIHAN JAWABAN --- */
  dom.choices.addEventListener("click", function (e) {
    const btn = e.target.closest(".choice");
    if (!btn || btn.disabled) return;
    Sound.resume();
    handleChoice(Number(btn.getAttribute("data-index")));
  });

  /* --- MAP --- */
  dom.mapPath.addEventListener("click", function (e) {
    const btn = e.target.closest(".map-node");
    if (!btn) return;
    Sound.resume();
    onMapNode(Number(btn.getAttribute("data-node")));
  });
  dom.btnMapBack.addEventListener("click", function () {
    playSfx("click");
    if (gameState.returnScreen) showScreen(gameState.returnScreen);
    else renderMap();
  });

  /* --- LAPISAN PETA (chips) --- */
  el("layer-chips").addEventListener("click", function (e) {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const key = chip.getAttribute("data-layer");
    if (!key || !(key in mapLayers)) return;
    mapLayers[key] = !mapLayers[key];
    chip.classList.toggle("is-on", mapLayers[key]);
    chip.setAttribute("aria-pressed", String(mapLayers[key]));
    applyMapLayers();
    playSfx(mapLayers[key] ? "click" : "wrong");
  });

  /* --- OVERLAY --- */
  dom.overlay.addEventListener("click", function (e) {
    if (e.target === dom.overlay) {
      if (modalOpts.closable !== false) closeModal();
      return;
    }
    if (e.target.closest("[data-close]")) { playSfx("click"); closeModal(); return; }
    if (e.target.closest("[data-primary]")) { playSfx("click"); if (modalOpts.onPrimary) modalOpts.onPrimary(); }
  });

  /* --- FINAL --- */
  dom.finalContent.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.getAttribute("data-act");
    playSfx("click");
    if (act === "facts") openInfo("fakta");
    else if (act === "timeline") openInfo("timeline");
    else if (act === "restart") restartGame();
  });

  /* --- KEYBOARD --- */
  document.addEventListener("keydown", function (e) {
    const overlayOpen = !dom.overlay.hidden;

    if (e.key === "Escape") {
      if (overlayOpen && modalOpts.closable !== false) { closeModal(); e.preventDefault(); }
      return;
    }

    /* --- gerak pemain (gaya RPG) --- */
    if (gameState.screen === "game" && !overlayOpen) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        manualMove(-1); e.preventDefault(); return;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        manualMove(1); e.preventDefault(); return;
      }
      if (e.key === " " || e.key === "Spacebar" || e.key === "e" || e.key === "E") {
        const focused = document.activeElement;
        if (focused && focused.tagName === "BUTTON") return; /* biarkan tombol bekerja */
        e.preventDefault();
        playSfx("click");
        advanceStep();
        return;
      }
    }

    if (e.key === "Enter") {
      const active = document.activeElement;
      if (overlayOpen) {
        if (active && active.tagName === "BUTTON") return; /* biarkan tombol bekerja */
        e.preventDefault();
        const primary = dom.modal.querySelector("[data-primary]") || dom.modal.querySelector("button");
        if (primary) primary.click();
        return;
      }
      if (gameState.screen === "game") {
        if (active && active.tagName === "BUTTON") return;
        e.preventDefault();
        advanceStep();
      }
    }
  });

  document.addEventListener("keyup", function (e) {
    if (gameState.moveDir !== 0 &&
        (e.key === "ArrowLeft" || e.key === "ArrowRight" ||
         e.key === "a" || e.key === "A" || e.key === "d" || e.key === "D")) {
      gameState.moveDir = 0;
    }
  });

  window.addEventListener("blur", function () { gameState.moveDir = 0; });

  /* --- D-PAD (sentuh / mouse) --- */
  const dpad = document.getElementById("stage-dpad");
  if (dpad) {
    dpad.addEventListener("pointerdown", function (e) {
      const btn = e.target.closest(".dpad");
      if (!btn) return;
      e.preventDefault();
      Sound.resume();
      const move = btn.getAttribute("data-move");
      if (move) {
        btn.classList.add("is-hold");
        manualMove(parseInt(move, 10));
        if (btn.setPointerCapture) { try { btn.setPointerCapture(e.pointerId); } catch (err) {} }
      } else {
        playSfx("click");
        advanceStep();
      }
    });
    const release = function () {
      dpad.querySelectorAll(".dpad").forEach(function (b) { b.classList.remove("is-hold"); });
      gameState.moveDir = 0;
    };
    dpad.addEventListener("pointerup", release);
    dpad.addEventListener("pointercancel", release);
    dpad.addEventListener("pointerleave", release);
  }

  /* --- klik NPC: menghampiri lalu ngobrol --- */
  dom.stageCast.addEventListener("click", function (e) {
    const node = e.target.closest(".char");
    if (!node) return;
    e.preventDefault();
    Sound.resume();
    playSfx("click");
    talkToNpc(node.getAttribute("data-name"));
  });
}

function init() {
  Sound.init();
  bindEvents();

  /* ilustrasi latar pada layar home */
  dom.homeScene.innerHTML = sceneBgHtml("nagari");

  /* loop gerakan pemain */
  requestAnimationFrame(movementLoop);

  updateScore(false);
  updateProgress();
  Sound.on = true;
  syncSoundLabels();

  showScreen("home");
  console.log("%cJELAJAH PERANG PADRI", "font-size:18px;font-weight:bold;color:#c0392b");
  console.log("Game siap. Klik MULAI PERJALANAN untuk memulai.");
}

document.addEventListener("DOMContentLoaded", init);
