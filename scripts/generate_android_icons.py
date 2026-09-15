import os
from PIL import Image, ImageDraw

def generate_icons():
    source_path = "public/logo.jpg"
    if not os.path.exists(source_path):
        print(f"Error: {source_path} does not exist.")
        return

    img = Image.open(source_path).convert("RGBA")
    
    # Ensure square source image
    min_dim = min(img.size)
    left = (img.width - min_dim) // 2
    top = (img.height - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))

    densities = {
        "mipmap-mdpi": (48, 108),
        "mipmap-hdpi": (72, 162),
        "mipmap-xhdpi": (96, 216),
        "mipmap-xxhdpi": (144, 324),
        "mipmap-xxxhdpi": (192, 432)
    }

    base_res = "android/app/src/main/res"

    for folder, (icon_size, fg_size) in densities.items():
        target_dir = os.path.join(base_res, folder)
        os.makedirs(target_dir, exist_ok=True)

        # 1. Standard Square Launcher Icon (rounded rect)
        sq_img = img.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
        # Apply slight corner radius
        mask = Image.new('L', (icon_size, icon_size), 0)
        draw = ImageDraw.Draw(mask)
        corner_radius = int(icon_size * 0.18)
        draw.rounded_rectangle([(0, 0), (icon_size, icon_size)], corner_radius, fill=255)
        sq_output = Image.new('RGBA', (icon_size, icon_size), (0, 0, 0, 0))
        sq_output.paste(sq_img, (0, 0), mask)
        sq_output.save(os.path.join(target_dir, "ic_launcher.png"), "PNG")

        # 2. Round Launcher Icon (full circle)
        round_mask = Image.new('L', (icon_size, icon_size), 0)
        round_draw = ImageDraw.Draw(round_mask)
        round_draw.ellipse([(0, 0), (icon_size, icon_size)], fill=255)
        round_output = Image.new('RGBA', (icon_size, icon_size), (0, 0, 0, 0))
        round_output.paste(sq_img, (0, 0), round_mask)
        round_output.save(os.path.join(target_dir, "ic_launcher_round.png"), "PNG")

        # 3. Adaptive Foreground Icon (centered with safe margins)
        # Android adaptive icons display only the central 66% (safe zone ~72dp of 108dp)
        fg_output = Image.new('RGBA', (fg_size, fg_size), (0, 0, 0, 0))
        content_size = int(fg_size * 0.72)
        content_img = img.resize((content_size, content_size), Image.Resampling.LANCZOS)
        
        # Round the foreground emblem slightly
        fg_mask = Image.new('L', (content_size, content_size), 0)
        fg_draw = ImageDraw.Draw(fg_mask)
        fg_draw.rounded_rectangle([(0, 0), (content_size, content_size)], int(content_size * 0.2), fill=255)
        
        offset = (fg_size - content_size) // 2
        fg_output.paste(content_img, (offset, offset), fg_mask)
        fg_output.save(os.path.join(target_dir, "ic_launcher_foreground.png"), "PNG")

        print(f"Generated icons for {folder}: {icon_size}x{icon_size} (fg: {fg_size}x{fg_size})")

    print("All Android launcher icons successfully updated from public/logo.jpg!")

if __name__ == "__main__":
    generate_icons()
