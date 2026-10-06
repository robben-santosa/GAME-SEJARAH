# -*- coding: utf-8 -*-
import io, re, sys, os
ROOT = r"C:\Users\Robben\Desktop\GAME SEJARAH"
pat = re.compile(r"[\U0001F000-\U0001FAFF☀-➿⬀-⯿←-⇿️]")
for fn in ["index.html", "style.css", "script.js"]:
    s = io.open(os.path.join(ROOT, fn), encoding="utf-8").read()
    for i, line in enumerate(s.split("\n"), 1):
        for m in pat.finditer(line):
            st = max(0, m.start() - 45)
            print("%s:%d  %s   <<%s>>" % (fn, i, line[st:m.end() + 45].strip(), m.group()))
            break
