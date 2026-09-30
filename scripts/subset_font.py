"""Build a small OFL webfont covering static and interactive site copy."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
fonts = root / 'docs/assets/fonts'
text = ''.join((root / file).read_text(encoding='utf-8') for file in ['docs/index.html','docs/app.js'])
font = TTFont(fonts / 'MaShanZheng-Regular.ttf')
cmap = font.getBestCmap()
missing = sorted({c for c in text if '\u4e00' <= c <= '\u9fff' and ord(c) not in cmap})
print('Body-only characters requiring the normal fallback font:', ascii(missing))
options = subset.Options()
options.flavor = 'woff2'
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
font.flavor = 'woff2'
font.save(fonts / 'nocturne-brush.woff2')
print('Webfont bytes:', (fonts / 'nocturne-brush.woff2').stat().st_size, 'Body fallback glyphs:', ascii(missing))
