# -*- coding: utf-8 -*-
"""Preview ASCII dari background pixel-art supaya bisa diverifikasi bentuknya."""
import os, sys, importlib.util
ROOT = r"C:\Users\Robben\Desktop\GAME SEJARAH"
spec = importlib.util.spec_from_file_location("ga", os.path.join(ROOT, "tools", "gen_assets.py"))
ga = importlib.util.module_from_spec(spec)
sys.modules["ga"] = ga
spec.loader.exec_module(ga)

# bucket warna -> karakter
BUCKETS = [
    ((186, 74, 62), "R"),    # atap merah
    ((120, 46, 38), "r"),
    ((232, 206, 164), "c"),  # dinding krem
    ((226, 214, 186), "c"),
    ((150, 112, 78), "b"),   # pondasi
    ((94, 154, 196), "w"),   # jendela biru
    ((74, 140, 118), "d"),   # kubah hijau
    ((226, 184, 70), "G"),   # emas
    ((60, 52, 48), "#"),     # pintu
    ((96, 72, 54), "#"),
    ((48, 38, 32), "#"),
    ((255, 255, 255), "C"),  # awan
    ((52, 108, 70), "T"),    # pohon
    ((38, 84, 56), "t"),
    ((96, 70, 46), "I"),     # batang
    ((104, 166, 96), "g"),
    ((86, 146, 82), "g"),
    ((70, 124, 70), "G"),
    ((100, 160, 92), "g"),
    ((84, 142, 80), "g"),
    ((68, 120, 68), "G"),
    ((108, 148, 140), "m"),  # gunung
    ((92, 132, 128), "m"),
    ((116, 178, 226), "."),  # langit
    ((146, 200, 236), "."),
    ((178, 220, 244), ","),
    ((206, 236, 250), ","),
    ((104, 168, 222), "."),
    ((140, 196, 234), "."),
    ((176, 218, 242), ","),
    ((208, 236, 250), ","),
    ((18, 26, 58), "."),     # malam
    ((26, 38, 76), "."),
    ((36, 52, 96), ","),
    ((50, 70, 116), ","),
    ((44, 66, 62), "G"),
    ((36, 56, 54), "G"),
    ((30, 46, 46), "G"),
    ((30, 44, 76), "m"),
    ((24, 36, 66), "m"),
    ((150, 200, 238), "."),  # default langit
]


def bucket(c):
    best, bd = "?", 1 << 30
    for col, ch in BUCKETS:
        d = sum((a - b) * (a - b) for a, b in zip(c, col))
        if d < bd:
            bd, best = d, ch
    return best


def show(key, cols=118, rows=40):
    im = ga.make_bg(key)
    im = im.resize((cols, rows), 0)  # NEAREST
    px = im.load()
    print("=== %s (%dx%d) ===" % (key, cols, rows))
    for y in range(rows):
        print("".join(bucket(px[x, y]) for x in range(cols)))


if __name__ == "__main__":
    for k in sys.argv[1:]:
        show(k)
