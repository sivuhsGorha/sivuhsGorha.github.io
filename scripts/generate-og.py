from PIL import Image, ImageDraw, ImageFont
import os

width, height = 1200, 630
img = Image.new('RGB', (width, height), color='#1a0a2e')
draw = ImageDraw.Draw(img)

# add a subtle gold glow
glow_radius = 400
try:
    glow = Image.new('RGBA', (glow_radius*2, glow_radius*2), (0,0,0,0))
    glow_draw = ImageDraw.Draw(glow)
    # create radial gradient
    for r in range(glow_radius, 0, -5):
        alpha = int(255 * (1 - (r / glow_radius)**2) * 0.15)
        glow_draw.ellipse((glow_radius-r, glow_radius-r, glow_radius+r, glow_radius+r), fill=(227, 168, 87, alpha))
    img.paste(glow, (width//2 - glow_radius, height//2 - glow_radius), glow)
except Exception as e:
    print("Glow error:", e)

# paste logo
try:
    logo = Image.open(r"c:\sbk-dev\public\logo.png").convert("RGBA")
    # resize logo
    logo.thumbnail((200, 200), Image.Resampling.LANCZOS)
    img.paste(logo, (width//2 - logo.width//2, height//2 - logo.height//2 - 50), logo)
except Exception as e:
    print("Logo error:", e)

# save
img.save(r"c:\sbk-dev\public\og.png")
print("Saved og.png")
