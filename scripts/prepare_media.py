"""Prepare web copies of selected, explicitly provided project media.
Run with Python + Pillow; pass the parent workspace directory as argument.
Original files are preserved. No generated art or visual retouching.
"""
from pathlib import Path
from PIL import Image
import json, sys

root = Path(sys.argv[1])
out = Path(__file__).resolve().parents[1] / 'docs' / 'assets'
out.mkdir(parents=True, exist_ok=True)
sources = {
 'reference-overview': 'moonlit-control-a/public/v10-reference/overview.png',
 'reference-window': 'moonlit-control-a/public/v10-reference/window.png',
 'reference-hall': 'moonlit-control-a/public/v10-reference/hall.png',
 'reference-clouds': 'moonlit-control-a/public/v10-reference/clouds.png',
 'reference-corridor': 'moonlit-control-a/public/v10-reference/corridor.png',
 'reference-reading': 'moonlit-control-a/public/v10-reference/reading.png',
 'reference-grip': 'moonlit-control-a/public/v10-reference/grip.png',
 'reference-head': 'moonlit-control-a/art/head-reset/user-head-study-20260929.png',
 'reference-animation': 'moonlit-control-a/public/v9-reference/animation.png',
 'reference-character': 'moonlit-archive/art/character-reference-01.png',
 'reference-body': 'moonlit-control-a/public/v8-reference/body-guide.png',
 'reference-head-refined': 'moonlit-control-a/public/v8-reference/head-guide.png',
 'reference-world': 'moonlit-archive/art/reference-architectural-walk-v4.png',
 'character-v4': 'moonlit-archive/art/traveler-v4-turnaround.png',
 'character-v6': 'moonlit-archive/art/traveler-v6-turnaround.png',
 'character-v8': 'moonlit-control-a/output/playwright/v8-body-four.png',
 'head-depth': 'moonlit-control-a/output/playwright/v8-depth-comparison.png',
 'head-early': 'moonlit-control-a/output/playwright/head-reset/color-quarter.png',
 'window-before': 'moonlit-control-a/output/playwright/reference-v11/before-window.png',
 'window-render': 'moonlit-control-a/output/playwright/reference-v11/blender-4-hero.png',
 'reading-current': 'moonlit-control-a/output/playwright/reference-v11/runtime-seated.png',
 'reading-animation': 'moonlit-control-a/output/playwright/reference-v9/final-read-seated.png',
}
for i in range(1,7):
 sources[f'scene-{i}'] = f'moonlit-control-a/output/playwright/reference-v11/runtime-{i}.png'
manifest=[]
for name, rel in sources.items():
 im=Image.open(root / rel).convert('RGB')
 im.save(out / f'{name}.webp', 'WEBP', quality=90, method=6)
 manifest.append({'asset': f'{name}.webp', 'source': rel, 'width':im.width,'height':im.height,
 'type': 'AI design reference supplied by creator' if name.startswith('reference-') else 'Project process evidence; see page caption for version and renderer'})
(out / 'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Prepared {len(manifest)} images, {sum(p.stat().st_size for p in out.glob("*.webp"))/1024/1024:.1f} MB')
