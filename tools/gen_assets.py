# -*- coding: utf-8 -*-
"""Generator aset pixel-art untuk JELAJAH PERANG PADRI.
Membuat: karakter (PNG transparan), icon, dan background scene.
Semua digambar pada resolusi rendah lalu di-upscale NEAREST agar
tampilannya benar-benar "pixel game".
"""
import os
import math
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
A_CHARS = os.path.join(ROOT, "assets", "characters")
A_ICONS = os.path.join(ROOT, "assets", "icons")
A_BGS = os.path.join(ROOT, "assets", "backgrounds")
SHEET = os.path.join(ROOT, "assets", "_preview.png")
for _d in (A_CHARS, A_ICONS, A_BGS):
    os.makedirs(_d, exist_ok=True)

# ---------------------------------------------------------------- palet dasar
P = {
    ".": None,
    "o": (43, 30, 22),          # outline
    "S": (244, 201, 158),       # kulit
    "s": (214, 163, 118),       # kulit bayang
    "E": (38, 36, 48),          # mata
    "M": (150, 92, 70),         # mulut / kumis
    "H": (74, 50, 34),          # rambut / tutup kepala
    "h": (54, 36, 24),          # rambut bayang
    "B": (238, 234, 224),       # jenggot
    "C": (74, 138, 86),         # baju
    "c": (54, 104, 64),         # baju bayang
    "A": (146, 96, 52),         # sabuk / aksen
    "L": (58, 74, 110),         # celana
    "K": (48, 38, 32),          # sepatu
    "W": (247, 245, 238),       # putih
    "w": (214, 210, 200),       # putih bayang
    "G": (226, 184, 70),        # emas
    "R": (196, 74, 66),         # merah
    "N": (44, 58, 92),          # biru tua
}


def grid_img(rows, pal=None, scale=6):
    """Render string-grid -> PNG transparan."""
    pal = dict(P if pal is None else pal)
    w = len(rows[0])
    for i, r in enumerate(rows):
        if len(r) != w:
            raise ValueError("baris %d salah lebar (%d != %d): %r" % (i, len(r), w, r))
    img = Image.new("RGBA", (w, len(rows)), (0, 0, 0, 0))
    px = img.load()
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            c = pal.get(ch)
            if c is not None:
                px[x, y] = tuple(c) + (255,)
    return img.resize((w * scale, len(rows) * scale), Image.NEAREST)


# --------------------------------------------------------- template karakter
# 16 x 24 piksel
BASE = [
    ".....oooooo.....",   # 0
    "....oHHHHHHo....",   # 1
    "...oHHHHHHHHo...",   # 2
    "...oHHHHHHHHo...",   # 3
    "...oSSSSSSSSo...",   # 4
    "...oSESSSSESo...",   # 5  (mata)
    "...oSSSSSSSSo...",   # 6
    "....oSSSSSSo....",   # 7  (dagu)
    ".....oooooo.....",   # 8
    ".......SS.......",   # 9  (leher)
    "..oCCCCCCCCCCo..",   # 10 (bahu)
    ".oSSCCCCCCCCSSo.",   # 11 (lengan)
    ".oSSCCCCCCCCSSo.",   # 12
    "..oCCAAAAAACCo..",   # 13 (sabuk)
    "..oCCCCCCCCCCo..",   # 14
    "..oCCCCCCCCCCo..",   # 15
    "...oCCCCCCCCo...",   # 16
    "...oLLLLLLLLo...",   # 17
    "...oLLLooLLLo...",   # 18
    "...oLLLooLLLo...",   # 19
    "...oLLLooLLLo...",   # 20
    "...oLLLooLLLo...",   # 21
    "...oKKKooKKKo...",   # 22 (sepatu)
    "....oooooooo....",   # 23
]

ROBE = {
    17: "...oCCCCCCCCo...",
    18: "..oCCCCCCCCCCo..",
    19: "..oCCCCCCCCCCo..",
    20: "..oCCCCCCCCCCo..",
    21: "..oCCCCCCCCCCo..",
}

TURBAN = {   # sorban / peci tebal
    0: "..oWWWWWWWWWWo..",
    1: ".oWWWWWWWWWWWWo.",
    2: ".oWWWwWWWWWwWWo.",
    3: "..oWWWWWWWWWWo..",
}

PECI = {     # peci/kopiah hitam
    0: ".....HHHHHH.....",
    1: "....oHHHHHHo....",
    2: "...ohhhhhhhho...",
    3: "...ohhhhhhhho...",
}

CAP = {      # tutup kepala prajurit (dengan pinggiran)
    0: ".....HHHHHH.....",
    1: "....oHHHHHHo....",
    2: "....oHHHHHHo....",
    3: "..ohhhhhhhhhho..",
}

HAT = {      # topi lebar ala Eropa
    0: "......KKKK......",
    1: ".....oKKKKo.....",
    2: "...oKKKKKKKKo...",
    3: "..oKKKKKKKKKKo..",
}

SCARF = {    # kerudung
    0: ".....HHHHHH.....",
    1: "....oHHHHHHo....",
    2: "...oHHHHHHHHo...",
    3: "...oHHHHHHHHo...",
    4: "...oHHSSSSHHo...",
    7: "....oHHHHHHo....",
}

BEARD = {
    6: "...oBBSSSSBBo...",
    7: "....oBBBBBBo....",
}
BEARD_LONG = dict(list(BEARD.items()) + [
    (8, "....oBBBBBBo...."),
    (9, ".......BB......."),
])
MUSTACHE = {6: "...oSSMMMMSSo..."}


def merge(*dicts):
    out = {}
    for dd in dicts:
        out.update(dd)
    return out


def build(over=None, pal=None):
    rows = list(BASE)
    for i, r in (over or {}).items():
        rows[i] = r
    p = dict(P)
    for k, v in (pal or {}).items():
        p[k] = v
    return rows, p


CHARS = {}


def char(name, over=None, pal=None):
    rows, p = build(over, pal)
    CHARS[name] = (rows, p)


# --- PEMAIN : pemuda petualang, baju hijau, celana biru, rambut cokelat
char("pemain", pal={
    "H": (92, 60, 36), "h": (66, 42, 26),
    "C": (76, 146, 92), "c": (52, 106, 64),
    "A": (148, 96, 52), "L": (56, 78, 120),
})

# --- WARGA : warga nagari, baju tenun kecokelatan
char("warga", over={7: "....oSSSSSSo...."}, pal={
    "H": (38, 32, 30), "h": (26, 22, 20),
    "C": (176, 116, 74), "c": (136, 86, 54),
    "A": (92, 62, 40), "L": (128, 92, 62),
})

# --- WARGA 2 : perempuan berkerudung
char("warga2", over=SCARF, pal={
    "H": (74, 96, 140), "h": (54, 72, 108),
    "C": (196, 122, 130), "c": (154, 92, 100),
    "A": (120, 78, 54), "L": (150, 104, 70),
})

# --- TUANKU NAN TUO : sesepih berjubah krem, peci putih, jenggot putih
char("nan-tuo", over=merge(PECI, BEARD_LONG), pal={
    "H": (236, 232, 224), "h": (198, 194, 186),
    "C": (232, 216, 178), "c": (196, 176, 140),
    "A": (150, 116, 74), "L": (214, 196, 158),
})

# --- TUANKU NAN RENCEH : ulama muda, jenggot hitam, jubah hijau tua
char("nan-renceh", over=merge(PECI, BEARD), pal={
    "H": (34, 30, 30), "h": (24, 20, 20),
    "C": (54, 116, 96), "c": (38, 84, 70),
    "A": (180, 150, 84), "L": (48, 92, 80),
})

# --- TUANKU IMAM BONJOL : sorban putih, jenggot panjang, jubah putih
char("imam-bonjol", over=merge(TURBAN, BEARD_LONG, ROBE), pal={
    "H": (247, 245, 238), "h": (210, 206, 196),
    "C": (244, 240, 230), "c": (206, 202, 192),
    "A": (58, 132, 96), "L": (230, 226, 216),
    "B": (228, 224, 214),
})

# --- PRAJURIT : seragam perang, tutup kepala
char("prajurit", over=CAP, pal={
    "H": (74, 92, 62), "h": (54, 70, 46),
    "C": (96, 108, 78), "c": (70, 82, 58),
    "A": (60, 52, 44), "L": (64, 74, 56),
})

# --- SULTAN : jubah ungu, sorban emas
char("sultan", over=merge(TURBAN, MUSTACHE, ROBE), pal={
    "H": (226, 184, 70), "h": (186, 146, 46),
    "W": (232, 194, 82), "w": (186, 146, 46),
    "C": (126, 78, 158), "c": (96, 56, 124),
    "A": (232, 196, 92), "L": (110, 70, 142),
})

# --- JENDERAL DE KOCK : topi lebar, jas biru, kumis
char("dekock", over=merge(HAT, MUSTACHE), pal={
    "C": (58, 78, 130), "c": (42, 58, 100),
    "G": (226, 184, 70), "A": (226, 184, 70),
    "L": (48, 58, 92), "H": (64, 48, 36),
})

# --- BELANDA : tentara kolonial
char("belanda", over=CAP, pal={
    "H": (60, 68, 92), "h": (44, 50, 70),
    "C": (74, 96, 148), "c": (54, 72, 116),
    "A": (168, 142, 72), "L": (62, 74, 104),
})


# ------------------------------------------------------------- icon (16x16)
ICONS = {}


def icon(name, rows, pal=None):
    p = dict(P)
    for k, v in (pal or {}).items():
        p[k] = v
    ICONS[name] = (rows, p)


icon("home", [
    "................",
    ".......oo.......",
    "......oRRo......",
    ".....oRRRRo.....",
    "....oRRRRRRo....",
    "...oRRRRRRRRo...",
    "..oRRRRRRRRRRo..",
    ".oRRRRRRRRRRRRo.",
    ".oCCCCCCCCCCCCo.",
    ".oCCoCCCCCCoCCo.",
    ".oCCoCCCCCCoCCo.",
    ".oCCoooooCCCco..",
    ".oCCoKKKoCCCco..",
    ".oCCoKKKoCCCco..",
    ".oCCCCCCCCCCCCo.",
    ".oooooooooooooo.",
], {"C": (226, 196, 150), "R": (176, 74, 62)})

icon("surau", [
    "................",
    ".......GG.......",
    "......oWWo......",
    ".....oWWWWo.....",
    "....oWWWWWWo....",
    "..ooWWWWWWWWoo..",
    ".oCCCCCCCCCCCCo.",
    ".oCCoooooCCCCCo.",
    ".oCCoWWWoCCCCCo.",
    ".oCCoWWWoCCCCCo.",
    ".oCCoWWWoCCCCCo.",
    ".oCCoKKKoCCCCCo.",
    ".oCCoKKKoCCCCCo.",
    ".oCCoKKKoCCCCCo.",
    ".oCCCCCCCCCCCCo.",
    ".oooooooooooooo.",
], {"C": (214, 204, 178), "W": (238, 236, 228)})

icon("gunung", [
    "................",
    "................",
    ".......WW.......",
    "......WWWW......",
    ".....oWWWWo.....",
    "....oWoooWo.....",
    "...oWWooooWo....",
    "..oWWooooooWo...",
    ".oWWooooooooWo..",
    "oWWooooooooooWo.",
    "oWoooooooooooWo.",
    "ooooooooooooooo.",
    "ooNNNNNNNNNNNoo.",
    ".oNNNNNNNNNNNo..",
    "..ooNNNNNNNoo...",
    ".....ooooo......",
], {"N": (74, 112, 88), "W": (244, 246, 250)})

icon("bendera", [
    ".....KK.........",
    ".....KK.........",
    ".....KKRRRRRRRo.",
    ".....KKRRRRRRRo.",
    ".....KKRRRRRRRo.",
    ".....KKNNNNNNNo.",
    ".....KKNNNNNNNo.",
    ".....KKNNNNNNNo.",
    ".....KKoooooooo.",
    ".....KK.........",
    ".....KK.........",
    ".....KK.........",
    ".....KK.........",
    ".....KK.........",
    "....oKKo........",
    "................",
], {"R": (206, 76, 68), "N": (66, 110, 178), "K": (74, 62, 52)})

icon("benteng", [
    "................",
    ".oo.oo.oo.oo.oo.",
    ".oKKoKKoKKoKKo..",
    ".oKKKKKKKKKKKo..",
    ".oKKoooooooKKo..",
    ".oKKoRRRRRoKKo..",
    ".oKKoRRRRRoKKo..",
    ".oKKoRRRRRoKKo..",
    ".oKKoRRRRRoKKo..",
    ".oKKoRRRRRoKKo..",
    ".oKKoKKKKKoKKo..",
    ".oKKoKKKKKoKKo..",
    ".oKKoooooooKKo..",
    ".oKKKKKKKKKKKo..",
    ".ooooooooooooo..",
    "................",
], {"KK": None, "K": (128, 122, 116), "R": (78, 66, 58)})

icon("scroll", [
    "................",
    "..ooooooooooo...",
    ".oWWWWWWWWWWWo..",
    ".oWoKKKKKKKKWo..",
    ".oWoKKKKKKKKWo..",
    ".oWWWWWWWWWWo...",
    ".oWoKKKKKKKWo...",
    ".oWoKKKKKKKWo...",
    ".oWoKKKKWoKKo...",
    ".oWoKKKKWoKKo...",
    ".oWoKKKKKKKWo...",
    ".oWWWWWWWWWWo...",
    ".oWoKKKKKKKKWo..",
    ".oWWWWWWWWWWo...",
    "..ooooooooooo...",
    "................",
], {"W": (242, 230, 198), "K": (150, 126, 96)})

icon("book", [
    "................",
    "................",
    ".oooooooooooooo.",
    ".oWWWWWWWWWWWwo.",
    ".oWKKKKKKKKKWwo.",
    ".oWKKKKKKKKKWwo.",
    ".oWKKKKKKKKKWwo.",
    ".oWWWWWWWWWWWwo.",
    ".oWWWWWWWWWWWwo.",
    ".oWKKKKKKKKKWwo.",
    ".oWKKKKKKKKKWwo.",
    ".oWKKKKKKKKKWwo.",
    ".oWKKKKKKKKKWwo.",
    ".oWWWWWWWWWWWwo.",
    ".oooooooooooooo.",
    "................",
], {"W": (226, 206, 158), "w": (176, 152, 106), "K": (120, 98, 70)})

icon("people", [
    "................",
    "....oooo..oooo..",
    "...oSSSSooSSSSo.",
    "...oSSSSooSSSSo.",
    "...ooSSooooSSoo.",
    "....oooo..oooo..",
    "..ooCCCCooCCCCoo",
    ".oSSCCCCoCCCCSSo",
    ".oSSCCCCoCCCCSSo",
    ".oSCCCCCoCCCCCSo",
    ".oSCCCCCoCCCCCSo",
    "..oCCCCCCoCCCCCo",
    "...oLLLLo.oLLLLo",
    "...oLLLLo.oLLLLo",
    "...oKKKKo.oKKKKo",
    "....oooo...oooo.",
], {"C": (176, 116, 74), "L": (74, 92, 130)})

icon("sound", [
    "................",
    "........oo......",
    ".......oWWo.....",
    "..ooooo.oWWo....",
    ".oWWWWWo.oWWo...",
    ".oWWWWWWooooo...",
    ".oWWWWWWWWWWo...",
    ".oWWWWWWWWWWo...",
    ".oWWWWWWWWWWo...",
    ".oWWWWWWWWWWo...",
    ".oWWWWWWWWWWo...",
    ".oWWWWWWooooo...",
    ".oWWWWWo.oWWo...",
    "..ooooo.oWWo....",
    ".......oWWo.....",
    "........oo......",
], {"W": (86, 96, 120)})

icon("muted", [
    "................",
    "........oo......",
    ".......oWWo.....",
    "..ooooo.oWWo....",
    ".oWWWWWo.oWWo...",
    ".oWWWWWWooooo...",
    ".oWWWWWWWWWWo...",
    ".oRRWWWWWWWWo...",
    ".oWWRRWWWWWWo...",
    ".oWWWRRWWWWWo...",
    ".oWWWWRRWWWWo...",
    ".oWWWWWRRWWWo...",
    ".oWWWWWWRRRoo...",
    ".oWWWWWWWWWWo...",
    "..ooooooooooo...",
    "................",
], {"W": (86, 96, 120), "R": (214, 72, 64)})

icon("map", [
    "................",
    ".oooooooooooooo.",
    ".oWWKKKWoWWKKKWo",
    ".oWKWWKWoKWWKKWo",
    ".oKWWKKWoWWWKKWo",
    ".oWWWKKWoWWKKWWo",
    ".oWWKKWWoKKWWWWo",
    ".oWKKWWWoWWWWKWo",
    ".oKKWWWWoKWWWWWo",
    ".oKWWKWWoWWWKWWo",
    ".oWWKKWWoWWKKWWo",
    ".oWWWKWWoKKWWWWo",
    ".oWWWWKKoWWKKKWo",
    ".oooooooooooooo.",
    "................",
    "................",
], {"W": (226, 214, 176), "K": (154, 136, 102)})

icon("back", [
    "................",
    "................",
    "............oRo.",
    "..........oRRRo.",
    "........oRRRRRo.",
    "......oRRRRRRRo.",
    "....oRRRRRRRRRo.",
    "..oRRRRRRRRRRRo.",
    "..oRRRRRRRRRRRo.",
    "....oRRRRRRRRRo.",
    "......oRRRRRRRo.",
    "........oRRRRRo.",
    "..........oRRRo.",
    "............oRo.",
    "................",
    "................",
], {"R": (66, 118, 178)})

icon("star", [
    "................",
    ".......GG.......",
    ".......GG.......",
    "......GGGG......",
    "......GGGG......",
    "oGGGGGGGGGGGGGGo",
    ".oGGGGGGGGGGGGo.",
    "..oGGGGGGGGGGo..",
    "...oGGGGGGGGo...",
    "...oGGGGGGGGo...",
    "..oGGGo..oGGGo..",
    "..oGGo....oGGo..",
    ".oGGGo....oGGGo.",
    ".oGGo......oGGo.",
    "................",
    "................",
], {"G": (244, 196, 74)})

icon("lock", [
    "................",
    "....oooo.oooo...",
    "...oWWWWoWWWWo..",
    "..oWWo..o..oWWo.",
    "..oWWo..o..oWWo.",
    "..oWWooooooWWo..",
    "...oWWWWWWWWo...",
    "..ooKKKKKKKKoo..",
    ".oKKKKKKKKKKKKo.",
    ".oKKKKKGGKKKKo..",
    ".oKKKKKGGKKKKo..",
    ".oKKKKKooKKKKo..",
    ".oKKKKKKKKKKKo..",
    "..oooooooooooo..",
    "................",
    "................",
], {"W": (176, 186, 202), "K": (72, 86, 112)})

icon("check", [
    "................",
    ".....oooooo.....",
    "....oGGGGGGo....",
    "...oGGGGGGGGo...",
    "..oGGGGGGGGGGo..",
    "..oGGGo.oGGGGo..",
    "..oGGGo..oGGGGo.",
    "..oGGGo...oGGGo.",
    "..oGGGo....oGo..",
    "..oGGGo......o..",
    "..oGGooooooo....",
    "...oGGGGGGoo....",
    "....oGGGGGo.....",
    ".....oooooo.....",
    "................",
    "................",
], {"G": (72, 176, 110)})

icon("lock_small", [
    "................",
    "................",
    ".....ooooo......",
    "....oWWWWWo.....",
    "...oWWo.oWWo....",
    "...oWWo.oWWo....",
    "...oWWooooWWo...",
    "....oWWWWWWo....",
    "..ooKKKKKKKoo...",
    ".oKKKKKKKKKKKo..",
    ".oKKKKKoKKKKKo..",
    ".oKKKKKoKKKKKo..",
    ".oKKKKKKKKKKKo..",
    "..ooooooooooo...",
    "................",
    "................",
], {"W": (176, 186, 202), "K": (96, 106, 126)})

icon("quest", [
    "................",
    "......oooo......",
    ".....oRRRRo.....",
    "....oRRRRRRo....",
    "....oRRoRRRo....",
    "....oRRoRRRo....",
    "....oRRRRRRo....",
    "....oRRRRRoo....",
    "....oRRRRo......",
    ".....oRRo.......",
    "......oo........",
    "................",
    "......oooo......",
    ".....oGGGGo.....",
    ".....oGGGGo.....",
    "......oooo......",
], {"R": (226, 88, 72), "G": (244, 196, 74)})

icon("talk", [
    "................",
    "..oooooooooooo..",
    ".oWWWWWWWWWWWWo.",
    ".oWKKKKKKKKKKWo.",
    ".oWKKKKKKKKKKWo.",
    ".oWKKKKKKKKKKWo.",
    ".oWWWWWWWWWWWWo.",
    ".oWWWWWWWWWWWWo.",
    "..ooooooooooWWo.",
    ".........oWWWWo.",
    "........oWWWWo..",
    ".......oWWWWo...",
    "................",
    "................",
    "................",
    "................",
], {"W": (246, 242, 230), "K": (120, 110, 96)})

icon("crown", [
    "................",
    ".o..o....o..o...",
    ".oGoGo..oGoGo...",
    ".oGGGGGGGGGGo...",
    ".oGGGGGGGGGGo...",
    ".oGGGGGGGGGGo...",
    ".oGWWWWWWWWGo...",
    ".oGGGGGGGGGGo...",
    ".oGGGGGGGGGGo...",
    ".oooooooooooo...",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
], {"G": (232, 190, 76), "W": (226, 96, 84)})

icon("sword", [
    "..o...........o.",
    "..oWooooooo...o.",
    "..oWWWWWWWWo..o.",
    "...oWWWWWWWo.o..",
    "...oWWWWWWWo.o..",
    "....oWWWWWWoo...",
    "....oWWWWWWo....",
    ".....oWWWWo.....",
    ".....oWWWWo.....",
    "......oWWo......",
    ".....oWWWWo.....",
    "....oGGooGGo....",
    "...oAAAAAAAAo...",
    "..oKKoAAAAoKKo..",
    "..oooooKKooooo..",
    "......oKKo......",
], {"W": (206, 214, 226), "G": (226, 184, 70), "K": (86, 66, 48)})

icon("shield", [
    "................",
    "..oooooooooooo..",
    ".oRRRRRRRRRRRRo.",
    ".oRRRRRRRRRRRRo.",
    ".oRRRRGGGGRRRRo.",
    ".oRRRGGGGGGRRRo.",
    ".oRRGGGGGGGGRRo.",
    ".oRGGGGWWGGGGRo.",
    "..oGGGWWWWGGGo..",
    "..oGGWWWWWWGGo..",
    "...oGWWWWWWGo...",
    "...oGWWWWWWGo...",
    "....oWWWWWWo....",
    ".....oWWWWo.....",
    "......oWWo......",
    ".......oo.......",
], {"R": (74, 96, 148), "G": (226, 184, 70)})

icon("compass", [
    "................",
    ".....oooooo.....",
    "....oWWWWWWo....",
    "...oWWWWWWWWo...",
    "..oWWWWWWWWWWo..",
    "..oWWWWRRWWWWo..",
    ".oWWWWRRRRWWWWo.",
    ".oWWWWRRRRWWWWo.",
    "..oWWWWRRWWWWo..",
    "..oWWWWWWWWWWo..",
    "...oWWWWWWWWo...",
    "....oWWWWWWo....",
    ".....oooooo.....",
    "................",
    "................",
    "................",
], {"W": (234, 226, 202), "R": (198, 74, 66), "o": (52, 64, 92)})

icon("coin", [
    "................",
    ".....oooooo.....",
    "....oGGGGGGo....",
    "...oGGWWWWGGo...",
    "..oGGWWooWWGGo..",
    "..oGGWo..oWGGo..",
    "..oGGWo..oWGGo..",
    "..oGGWWooWWGGo..",
    "...oGGWWWWGGo...",
    "....oGGGGGGo....",
    ".....oooooo.....",
    "................",
    "................",
    "................",
    "................",
    "................",
], {"G": (240, 196, 74), "W": (186, 142, 46)})

icon("anchor", [
    "......oooo......",
      ".....oWWWWo.....",
    "......oWWo......",
    "..oooooWWooooo..",
    "..oWo..oWWo..Wo.",
    "....o.oWWWo.o...",
    "......oWWWo.....",
    "......oWWWo.....",
    "......oWWWo.....",
    "......oWWWo.....",
    ".....oWWWWWo....",
    "....oWWo.oWWo...",
    "...oWWo...oWWo..",
    "..oWWo.....oWWo.",
    "..oo.........oo.",
    "................",
], {"W": (168, 186, 206)})

icon("flag", [
    "....oooo........",
    "....oWWo........",
    "....oWWoooooooo.",
    "....oWWoRRRRRRRo",
    "....oWWoRRRRRRRo",
    "....oWWoRRRRRRRo",
    "....oWWoRRRRRRRo",
    "....oWWoRRRRRRRo",
    "....oWWoRRRRRooo",
    "....oWWoRRo.....",
    "....oWWooo......",
    "....oWWo........",
    "....oWWo........",
    "....oWWo........",
    "....oooo........",
    "................",
], {"W": (226, 222, 210), "R": (198, 74, 66)})

icon("exile", [
    "................",
    "......oooo......",
    ".....oWWWWo.....",
    "....oWWWWWWo....",
    "...oWWWWWWWWo...",
    "...oWWWWWWWWo...",
    "...oWWWWWWWWo...",
    "...ooWWWWWWoo...",
    "..oKKKKKKKKKKo..",
    ".oKKKKKKKKKKKKo.",
    "oKKoKKoKKoKKoKKo",
    "oooooooooooooooo",
    "................",
    "..oo..oo..oo..o.",
    ".oWWooWWooWWooWW",
    "oooooooooooooo..",
], {"W": (238, 234, 222), "K": (96, 72, 54)})

icon("info", [
    ".....oooooo.....",
    "...oWWWWWWWWo...",
    "..oWWWWWWWWWWo..",
    "..oWWWWooWWWWo..",
    "..oWWWWooWWWWo..",
    "..oWWWWooWWWWo..",
    "..oWWWWooooWWo..",
    "..oWWWWooooWWo..",
    "..oWWWWWWWWWWo..",
    "..oWWWWWWWWWWo..",
    "..oWWWWWWWWWWo..",
    "...oWWWWWWWWo...",
    ".....oooooo.....",
    "................",
    "................",
    "................",
], {"W": (96, 156, 208)})

icon("sword_flag", [
    "..oo........oo..",
    "..oWWoooooooGGo.",
    "..oWWWWWWWWOGGo.",
    "...oWWWWWWWOGo..",
    "...oWWWWWWWOGo..",
    "....oWWWWWooGo..",
    "....oWWWWWoOGo..",
    ".....oWWWOoGG...",
    ".....oWWWOoG....",
    "......oWOoG.....",
    ".....oWWOoGG....",
    "....oAAooAAo....",
    "...oAAAAAAAAo...",
    "..oKKoAAAAoKKo..",
    "..oooooKKooooo..",
    "......oKKo......",
], {"W": (206, 214, 226), "G": (226, 184, 70), "O": (74, 96, 148), "A": (146, 96, 52)})


# -------------------------------------------------------------- background
def dither_band(d, y, h, w, c1, c2):
    d.rectangle([0, y, w, y + h - 1], fill=c1)
    for yy in range(y, y + h):
        for x in range((yy - y) & 1, w, 2):
            d.point((x, yy), fill=c2)


def sky(d, w, h, colors, horizon):
    n = len(colors)
    step = max(1, horizon // n)
    for i, c in enumerate(colors):
        y0 = i * step
        y1 = horizon if i == n - 1 else (i + 1) * step
        d.rectangle([0, y0, w, y1], fill=c)
        if i:
            for x in range((i & 1), w, 2):
                for yy in range(max(0, y0 - 2), y0):
                    d.point((x, yy), fill=c)
    d.rectangle([0, horizon, w, h], fill=colors[-1])


def hill(d, cx, peak, half, base, color):
    """gunungan segitiga tanpa anti-alias"""
    for i in range(peak, base):
        t = (i - peak) / max(1, (base - peak))
        hw = int(t * half)
        if hw <= 0:
            continue
        d.line([(cx - hw, i), (cx + hw, i)], fill=color)


def band_ground(d, w, h, top, colors):
    n = len(colors)
    hh = h - top
    step = max(1, hh // n)
    for i, c in enumerate(colors):
        y0 = top + i * step
        y1 = h if i == n - 1 else top + (i + 1) * step
        d.rectangle([0, y0, w, y1], fill=c)


def blob(d, x, y, w, h, color):
    d.rectangle([x, y, x + w, y + h], fill=color)


def tree(d, x, y, s, leaf=(52, 108, 70), leaf2=(38, 84, 56), trunk=(96, 70, 46)):
    d.rectangle([x + s, y + int(s * 2.4), x + s * 2, y + s * 4], fill=trunk)
    d.ellipse([x, y + s, x + s * 3, y + s * 3.4], fill=leaf)
    d.ellipse([x + s * 0.6, y + s * 0.4, x + s * 2.4, y + s * 2.2], fill=leaf2)


def gadang(d, x, y, w, h, wall=(232, 206, 164), roof=(186, 74, 62), dark=(120, 46, 38)):
    """rumah gadang: badan + atap gonjong bertanduk melengkung ke atas"""
    d.rectangle([x, y, x + w, y + h], fill=wall)            # badan
    d.rectangle([x, y + h - 4, x + w, y + h], fill=(150, 112, 78))
    # atap: tepi atas menjulang tinggi di kedua ujung (gonjong)
    A = max(8, int(h * 0.55))
    R0 = max(5, int(h * 0.20))
    for xi in range(x - 3, x + w + 3):
        t = abs((xi - (x + w / 2.0)) / (w / 2.0))
        yy = y - (R0 + (A - R0) * (t ** 2.4))
        yy = int(round(yy))
        d.line([(xi, yy), (xi, y)], fill=roof)
        if t > 0.86:   # garis gelap pada tanduk
            d.point((xi, yy), fill=dark)
    # jendela
    for k in range(3):
        wx = x + 5 + k * ((w - 12) // 3)
        d.rectangle([wx, y + 6, wx + 6, y + 13], fill=(94, 154, 196))


def surau(d, x, y, w, h, wall=(226, 214, 186)):
    d.rectangle([x, y, x + w, y + h], fill=wall)
    d.rectangle([x, y + h - 5, x + w, y + h], fill=(150, 136, 110))
    cx = x + w // 2
    dome = (74, 140, 118)
    # kubah: lebar di dasar, meruncing ke atas
    dh = int(h * 0.42)
    for i in range(dh):
        t = i / float(dh)
        hw = max(1, int((w * 0.36) * math.cos(t * 1.5708)))
        d.line([(cx - hw, y - i - 1), (cx + hw, y - i - 1)], fill=dome)
    top = y - dh - 1
    d.rectangle([cx - 2, top - 3, cx + 2, top + 3], fill=dome)
    d.rectangle([cx - 1, top - 7, cx + 1, top - 3], fill=(226, 184, 70))
    # menara
    mx = x + w - 11
    mt = y - int(h * 0.45)
    d.rectangle([mx, mt, mx + 8, y + h], fill=(214, 202, 176))
    d.rectangle([mx - 1, mt - 5, mx + 9, mt], fill=dome)
    d.rectangle([mx + 2, mt - 8, mx + 6, mt - 5], fill=(226, 184, 70))
    # pintu & jendela
    d.rectangle([cx - 7, y + h - 17, cx + 7, y + h - 5], fill=(96, 72, 54))
    d.rectangle([x + 6, y + 7, x + 14, y + 15], fill=(94, 154, 196))
    d.rectangle([x + w - 22, y + 7, x + w - 14, y + 15], fill=(94, 154, 196))


def fort(d, x, y, w, h, stone=(150, 142, 132), dark=(112, 106, 98)):
    d.rectangle([x, y, x + w, y + h], fill=stone)
    # gerbang
    gw = max(10, w // 5)
    gx = x + w // 2 - gw // 2
    d.rectangle([gx, y + h - 22, gx + gw, y + h], fill=(60, 52, 48))
    d.rectangle([gx + 2, y + h - 20, gx + gw - 2, y + h], fill=(34, 30, 28))
    # merlon
    step = 12
    for i in range(0, w, step):
        d.rectangle([x + i, y - 8, x + i + 7, y], fill=stone)
    # bendera
    d.rectangle([x + w // 2, y - 26, x + w // 2 + 2, y - 8], fill=(90, 70, 54))
    d.rectangle([x + w // 2 + 2, y - 26, x + w // 2 + 14, y - 18], fill=(206, 74, 66))
    # jendela batu
    for i in range(3):
        wx = x + 8 + i * (w - 20) // 3
        d.rectangle([wx, y + 8, wx + 6, y + 15], fill=dark)
    d.rectangle([x, y + 6, x + w, y + 10], fill=dark)


def hall(d, x, y, w, h, roof=(120, 96, 150), wall=(226, 214, 186)):
    """pendopo / joglo bertingkat"""
    light = tuple(min(255, c + 30) for c in roof)
    for lw, y0, y1 in ((w, 0, 6), (int(w * 0.74), 6, 11), (int(w * 0.46), 11, 15)):
        lx = x + (w - lw) // 2
        d.rectangle([lx, y - y1, lx + lw, y - y0], fill=roof)
        d.rectangle([lx, y - y1, lx + lw, y - y1 + 2], fill=light)
    d.rectangle([x + w // 2 - 2, y - 18, x + w // 2 + 2, y - 15], fill=(226, 184, 70))
    d.rectangle([x, y, x + w, y + h], fill=wall)
    d.rectangle([x, y + h - 6, x + w, y + h], fill=(150, 136, 110))
    for i in range(4):
        px = x + 6 + i * (w - 14) // 3
        d.rectangle([px, y, px + 4, y + h - 6], fill=(176, 150, 112))
    d.rectangle([x + w // 2 - 7, y + h - 20, x + w // 2 + 7, y + h - 6], fill=(96, 72, 54))


def ship(d, x, y, w, hull=(96, 72, 54), sail=(238, 234, 222)):
    # lambung
    for i in range(14):
        hw = int((w / 2) * (1 - (i / 14) * 0.45))
        d.line([(x + w // 2 - hw, y + i), (x + w // 2 + hw, y + i)], fill=hull)
    d.rectangle([x + w // 2 - 2, y - 42, x + w // 2 + 2, y], fill=(74, 56, 42))
    # layar
    for i in range(30):
        hw = int(20 * (1 - abs(i - 15) / 18.0))
        if hw <= 0:
            continue
        d.line([(x + w // 2 - hw - 3, y - 40 + i * 1), (x + w // 2 + hw - 3, y - 40 + i)], fill=sail)
    d.rectangle([x + w // 2 - 24, y - 44, x + w // 2 + 6, y - 41], fill=(206, 74, 66))


def make_bg(kind, w=240, h=80, horizon=54):
    img = Image.new("RGB", (w, h), (150, 200, 238))
    d = ImageDraw.Draw(img)
    if kind == "dawn":
        sky(d, w, h, [(74, 96, 158), (150, 128, 178), (236, 168, 130), (250, 214, 156)], horizon)
        d.ellipse([w - 78, 26, w - 46, 58], fill=(255, 236, 190))
        hill(d, 40, 34, 70, horizon, (94, 124, 132))
        hill(d, 170, 30, 90, horizon, (78, 108, 122))
        band_ground(d, w, h, horizon, [(96, 156, 92), (76, 134, 76), (60, 112, 64)])
        for x in (18, 62, 128, 196, 224):
            tree(d, x, horizon - 14, 5)
    elif kind == "nagari":
        sky(d, w, h, [(116, 178, 226), (146, 200, 236), (178, 220, 244), (206, 236, 250)], horizon)
        for cx, cy, r in ((46, 16, 9), (120, 10, 7), (196, 20, 11)):
            d.ellipse([cx - r, cy - r // 2, cx + r, cy + r // 2], fill=(255, 255, 255))
        hill(d, 30, 38, 74, horizon, (108, 148, 140))
        hill(d, 200, 34, 80, horizon, (92, 132, 128))
        band_ground(d, w, h, horizon, [(104, 166, 96), (86, 146, 82), (70, 124, 70)])
        gadang(d, 18, horizon - 34, 76, 34)
        gadang(d, 132, horizon - 28, 60, 28)
        tree(d, 98, horizon - 16, 5)
        tree(d, 210, horizon - 14, 5)
        tree(d, 6, horizon - 12, 4)
    elif kind == "surau":
        sky(d, w, h, [(104, 168, 222), (140, 196, 234), (176, 218, 242), (208, 236, 250)], horizon)
        for cx, cy, r in ((60, 14, 8), (168, 18, 10)):
            d.ellipse([cx - r, cy - r // 2, cx + r, cy + r // 2], fill=(255, 255, 255))
        hill(d, 220, 40, 70, horizon, (104, 144, 138))
        band_ground(d, w, h, horizon, [(100, 160, 92), (84, 142, 80), (68, 120, 68)])
        surau(d, 78, horizon - 32, 74, 32)
        tree(d, 24, horizon - 16, 5)
        tree(d, 196, horizon - 14, 5)
    elif kind == "road":
        sky(d, w, h, [(126, 186, 228), (158, 208, 238), (190, 226, 246), (216, 240, 250)], horizon)
        hill(d, 60, 36, 80, horizon, (140, 158, 130))
        hill(d, 190, 40, 76, horizon, (124, 146, 124))
        band_ground(d, w, h, horizon, [(186, 172, 126), (168, 152, 110), (150, 134, 98)])
        # jalan setapak menyempit
        for i in range(horizon, h):
            t = (i - horizon) / (h - horizon)
            hw = int(8 + t * 46)
            col = (206, 190, 146) if (i + (i // 2)) % 3 else (194, 178, 136)
            d.line([(w // 2 - hw, i), (w // 2 + hw, i)], fill=col)
        tree(d, 16, horizon - 14, 5)
        tree(d, 214, horizon - 12, 5)
    elif kind in ("meeting", "council"):
        sky(d, w, h, [(112, 176, 226), (148, 202, 236), (182, 222, 244), (210, 238, 250)], horizon)
        for cx, cy, r in ((44, 12, 8), (186, 16, 9)):
            d.ellipse([cx - r, cy - r // 2, cx + r, cy + r // 2], fill=(255, 255, 255))
        hill(d, 210, 36, 84, horizon, (104, 146, 140))
        band_ground(d, w, h, horizon, [(104, 164, 94), (88, 144, 82), (72, 124, 70)])
        hall(d, 62, horizon - 36, 96, 36)
        tree(d, 16, horizon - 16, 5)
        tree(d, 200, horizon - 14, 5)
    elif kind == "fort":
        sky(d, w, h, [(168, 196, 216), (190, 212, 228), (212, 228, 238), (230, 240, 246)], horizon)
        hill(d, 40, 40, 74, horizon, (150, 158, 152))
        hill(d, 200, 36, 82, horizon, (136, 146, 142))
        band_ground(d, w, h, horizon, [(172, 164, 130), (154, 146, 116), (136, 128, 102)])
        fort(d, 54, horizon - 40, 112, 40)
        tree(d, 16, horizon - 14, 5)
        tree(d, 214, horizon - 12, 5)
    elif kind == "exile":
        sky(d, w, h, [(74, 96, 158), (142, 122, 170), (226, 158, 128), (250, 200, 146)], horizon - 8)
        d.ellipse([40, 16, 66, 42], fill=(255, 226, 176))
        band_ground(d, w, h, horizon - 8, [(54, 106, 156), (44, 92, 140), (36, 78, 124), (30, 68, 112)])
        # gelombang
        for i in range(horizon - 6, h, 4):
            for x in range(0, w, 14):
                xo = x + (i * 3) % 14
                d.rectangle([xo, i, xo + 6, i + 1], fill=(126, 176, 214))
        ship(d, 132, horizon - 4, 54)
        # pulau kecil di kejauhan
        d.ellipse([10, horizon - 16, 62, horizon - 6], fill=(86, 118, 120))
    elif kind == "night":
        sky(d, w, h, [(18, 26, 58), (26, 38, 76), (36, 52, 96), (50, 70, 116)], horizon)
        for x, y in ((20, 10), (56, 22), (90, 8), (130, 18), (168, 6), (204, 24), (228, 12),
                     (74, 34), (150, 32), (190, 40), (110, 28), (36, 40)):
            d.rectangle([x, y, x + 1, y + 1], fill=(255, 250, 220))
        d.ellipse([178, 8, 202, 32], fill=(246, 240, 210))
        d.ellipse([172, 6, 194, 28], fill=(34, 48, 88))
        hill(d, 50, 40, 84, horizon, (30, 44, 76))
        hill(d, 196, 36, 84, horizon, (24, 36, 66))
        band_ground(d, w, h, horizon, [(44, 66, 62), (36, 56, 54), (30, 46, 46)])
        tree(d, 24, horizon - 14, 5, leaf=(34, 58, 56), leaf2=(26, 46, 46), trunk=(46, 40, 40))
        tree(d, 212, horizon - 12, 5, leaf=(34, 58, 56), leaf2=(26, 46, 46), trunk=(46, 40, 40))
    else:
        raise ValueError(kind)
    return img


# ------------------------------------------------------------------ output
def main():
    os.makedirs(A_CHARS, exist_ok=True)
    for name, (rows, p) in CHARS.items():
        grid_img(rows, p, 6).save(os.path.join(A_CHARS, name + ".png"))
    for name, (rows, p) in ICONS.items():
        grid_img(rows, p, 6).save(os.path.join(A_ICONS, name + ".png"))
    for kind in ("dawn", "nagari", "surau", "road", "meeting", "council", "fort", "exile", "night"):
        bg = make_bg(kind)
        bg = bg.resize((bg.width * 4, bg.height * 4), Image.NEAREST)
        bg.save(os.path.join(A_BGS, kind + ".png"))

    # preview sheet
    cols = 10
    cell = 110
    items = []
    for name, (rows, p) in CHARS.items():
        items.append((name, grid_img(rows, p, 5)))
    for name, (rows, p) in ICONS.items():
        items.append((name, grid_img(rows, p, 5)))
    rows_n = (len(items) + cols - 1) // cols
    sheet = Image.new("RGBA", (cols * cell, rows_n * cell), (46, 60, 78, 255))
    dr = ImageDraw.Draw(sheet)
    for i, (name, im) in enumerate(items):
        cx = (i % cols) * cell
        cy = (i // cols) * cell
        sheet.alpha_composite(im, (cx + (cell - im.width) // 2, cy + 4))
        dr.text((cx + 6, cy + cell - 14), name, fill=(235, 240, 248, 255))
    sheet.save(SHEET)
    # preview background
    bgs = [make_bg(k) for k in ("dawn", "nagari", "surau", "road", "fort", "exile")]
    bw = 480
    strip = Image.new("RGB", (bw, len(bgs) * 60), (0, 0, 0))
    for i, b in enumerate(bgs):
        b = b.resize((bw, 60), Image.NEAREST)
        strip.paste(b, (0, i * 60))
    strip.save(os.path.join(ROOT, "assets", "_preview_bg.png"))
    print("OK -> %d karakter, %d icon, 9 background" % (len(CHARS), len(ICONS)))


if __name__ == "__main__":
    main()
