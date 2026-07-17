from PIL import Image
from pathlib import Path

# -------------------------------------------------------
# CONFIG
# -------------------------------------------------------

MASTER_ICON = Path("assets/master-icon.png")
OUTPUT_DIR = Path("assets/icons")

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

ICON_SIZES = [
    (72, "icon-72.png"),
    (96, "icon-96.png"),
    (128, "icon-128.png"),
    (144, "icon-144.png"),
    (152, "icon-152.png"),
    (180, "icon-180.png"),
    (180, "apple-touch-icon.png"),
    (192, "icon-192.png"),
    (384, "icon-384.png"),
    (512, "icon-512.png"),
    (32, "favicon-32.png"),
    (16, "favicon-16.png"),
]

# -------------------------------------------------------
# LOAD MASTER IMAGE
# -------------------------------------------------------

img = Image.open(MASTER_ICON).convert("RGBA")

# -------------------------------------------------------
# GENERATE PNG ICONS
# -------------------------------------------------------

print("\nGenerating icons...\n")

for size, filename in ICON_SIZES:

    resized = img.resize((size, size), Image.LANCZOS)

    output_path = OUTPUT_DIR / filename

    resized.save(output_path, optimize=True)

    print(f"✓ {filename}")

# -------------------------------------------------------
# Generate favicon.ico
# -------------------------------------------------------

favicon_sizes = [(16,16), (32,32), (48,48), (64,64)]

img.save(
    OUTPUT_DIR / "favicon.ico",
    format="ICO",
    sizes=favicon_sizes
)

print("✓ favicon.ico")

print("\nDone!")
print(f"\nIcons saved to:\n{OUTPUT_DIR.resolve()}")