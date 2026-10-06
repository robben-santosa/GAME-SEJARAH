import os, sys, importlib.util
from PIL import Image
ROOT = r"C:\Users\Robben\Desktop\GAME SEJARAH"
spec = importlib.util.spec_from_file_location("ga", os.path.join(ROOT, "tools", "gen_assets.py"))
ga = importlib.util.module_from_spec(spec)
sys.modules["ga"] = ga
spec.loader.exec_module(ga)

# zoom rumah gadang (nagari) + kubah surau, digabung jadi satu gambar
n = ga.make_bg("nagari").crop((8, 8, 118, 60)).resize((110 * 7, 52 * 7), Image.NEAREST)
s = ga.make_bg("surau").crop((70, 4, 160, 56)).resize((90 * 7, 52 * 7), Image.NEAREST)
sheet = Image.new("RGB", (n.width + s.width + 20, max(n.height, s.height)), (30, 30, 40))
sheet.paste(n, (0, 0))
sheet.paste(s, (n.width + 20, 0))
sheet.save(os.path.join(ROOT, "assets", "_zoom.png"))
print("ok")
