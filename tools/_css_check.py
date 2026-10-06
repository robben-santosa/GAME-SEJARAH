# -*- coding: utf-8 -*-
import io, os
ROOT = r"C:\Users\Robben\Desktop\GAME SEJARAH"
p = os.path.join(ROOT, "style.css")
raw = io.open(p, "rb").read()
print("bytes:", len(raw))
print("CR count:", raw.count(b"\r"), "| LF:", raw.count(b"\n"), "| FF:", raw.count(b"\x0c"), "| NUL:", raw.count(b"\x00"))
s = raw.decode("utf-8")
lines = s.split("\n")
print("split-lines:", len(lines))
weird = []
for i, l in enumerate(lines, 1):
    for ch in l:
        o = ord(ch)
        if o < 9 or (13 < o < 32) or o == 0x7f:
            weird.append((i, hex(o), l[:70]))
            break
print("weird lines:", len(weird))
for w in weird[:20]:
    print("  ", w)

for rng in [(2455, 2463), (2512, 2521), (2585, 2594), (2496, 2502)]:
    print("---- %d-%d" % rng)
    for i in range(rng[0], rng[1] + 1):
        if 1 <= i <= len(lines):
            print("%5d| %s" % (i, lines[i - 1]))
