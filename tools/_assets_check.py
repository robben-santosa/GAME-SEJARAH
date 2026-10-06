# -*- coding: utf-8 -*-
import io, os, re, glob
ROOT = r"C:\Users\Robben\Desktop\GAME SEJARAH"
pat = re.compile(r"assets/[A-Za-z0-9_\-/]+\.(?:png|mp3|wav|ogg|jpg)")
refs = {}
for fn in ["index.html", "style.css", "script.js"]:
    s = io.open(os.path.join(ROOT, fn), encoding="utf-8").read()
    for m in pat.finditer(s):
        refs.setdefault(m.group(), set()).add(fn)

# dynamic patterns in script.js: ico() / spriteSrc() build paths
s = io.open(os.path.join(ROOT, "script.js"), encoding="utf-8").read()
icons_used = set(re.findall(r'ico\("([a-z_]+)"', s))
chars_used = set(re.findall(r'sprite:\s*"([a-z0-9\-]+)",\s*tint', s))
chars_used |= set(re.findall(r'assets/characters/([a-z0-9\-]+)\.png', s))
icons_used |= set(re.findall(r'assets/icons/([a-z_]+)\.png', s))
bgs_used = set(re.findall(r'bg:\s*"([a-z]+)"', s)) | set(re.findall(r'setBackground\("([a-z]+)"', s))
bgs_used |= set(re.findall(r'sceneBgHtml\("([a-z]+)"', s))

exist = set(os.path.relpath(p, ROOT).replace("\\", "/") for p in glob.glob(os.path.join(ROOT, "assets", "**", "*.png"), recursive=True))

missing = []
for r in sorted(refs):
    if r not in exist:
        missing.append("REF  %s  (%s)" % (r, ",".join(sorted(refs[r]))))
for i in sorted(icons_used):
    p = "assets/icons/%s.png" % i
    if p not in exist:
        missing.append("ICON %s" % p)
for c in sorted(chars_used):
    p = "assets/characters/%s.png" % c
    if p not in exist:
        missing.append("CHAR %s" % p)
for b in sorted(bgs_used):
    p = "assets/backgrounds/%s.png" % b
    if p not in exist:
        missing.append("BG   %s" % p)

print("referenced:", len(refs), "| icons used:", len(icons_used), "| chars used:", len(chars_used),
      "| bgs:", len(bgs_used), "| files:", len(exist))
if missing:
    print("MISSING:")
    for m in missing:
        print("  " + m)
else:
    print("ALL REFERENCED ASSETS EXIST")

# unused assets (info)
used = set(refs) | set("assets/icons/%s.png" % i for i in icons_used) | \
       set("assets/characters/%s.png" % c for c in chars_used) | \
       set("assets/backgrounds/%s.png" % b for b in bgs_used)
unused = sorted(p for p in exist if p.startswith("assets/") and p not in used and "_" not in os.path.basename(p))
print("unused:", len(unused))
for u in unused:
    print("  " + u)
