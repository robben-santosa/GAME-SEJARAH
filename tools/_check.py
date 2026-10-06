import io, re, sys, importlib.util, os
spec = importlib.util.spec_from_file_location("ga", r"C:\Users\Robben\Desktop\GAME SEJARAH\tools\gen_assets.py")
ga = importlib.util.module_from_spec(spec)
sys.modules["ga"] = ga
try:
    spec.loader.exec_module(ga)
except Exception as e:
    print("import error:", e)

bad = []
for name, (rows, p) in list(ga.CHARS.items()):
    w = len(rows[0])
    for i, r in enumerate(rows):
        if len(r) != w:
            bad.append(("char/" + name, i, len(r), w, r))
for name, (rows, p) in list(ga.ICONS.items()):
    w = len(rows[0])
    for i, r in enumerate(rows):
        if len(r) != w:
            bad.append(("icon/" + name, i, len(r), w, r))
        unknown = set(r) - set(ga.P) - set(p)
        if unknown:
            bad.append(("icon/" + name, i, "unknown chars %r" % unknown, "", r))
if not bad:
    print("ALL ROWS OK")
for b in bad:
    print("%-18s row %2d len=%s need=%s %r" % b)
