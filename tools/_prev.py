import os, sys, importlib.util
from PIL import Image
ROOT = r"C:\Users\Robben\Desktop\GAME SEJARAH"
spec = importlib.util.spec_from_file_location("ga", os.path.join(ROOT, "tools", "gen_assets.py"))
ga = importlib.util.module_from_spec(spec)
sys.modules["ga"] = ga
spec.loader.exec_module(ga)

keys = sys.argv[1].split(",") if len(sys.argv) > 1 else ["nagari", "surau", "meeting", "night"]
cols = 2
cw, ch = 480, 160
rows_n = (len(keys) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cw, rows_n * ch), (0, 0, 0))
for i, k in enumerate(keys):
    im = ga.make_bg(k).resize((cw, ch), Image.NEAREST)
    sheet.paste(im, ((i % cols) * cw, (i // cols) * ch))
sheet.save(os.path.join(ROOT, "assets", "_preview_bg.png"))
print("ok", keys)
