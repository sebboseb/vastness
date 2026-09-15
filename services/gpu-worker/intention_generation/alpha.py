"""Conservative white color key for the image stage's explicit white backdrop.

This is a color matte, not object recognition. Pale details can be lost; source
RGB is always retained so that limitation is inspectable. No semantic branches.
"""

def alpha_for_rgb(rgb):
    # Neutral and warm near-white background is removed; darker/colored material
    # remains opaque. A small transition avoids a hard threshold edge.
    return round(255 * max(0.0, min(1.0, (236 - min(rgb[:3])) / 12)))


def white_matte(image):
    from PIL import Image
    rgb = image.convert('RGB')
    alpha = Image.new('L', rgb.size)
    alpha.putdata([alpha_for_rgb(pixel) for pixel in rgb.getdata()])
    rgba = rgb.convert('RGBA')
    rgba.putalpha(alpha)
    return rgba
