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


def conditioning_image(image):
    """Preserve full-frame references when the requested white backdrop is absent."""
    from PIL import Image
    matte = white_matte(image)
    histogram = matte.getchannel('A').histogram()
    fraction = sum(histogram[128:]) / (image.width * image.height)
    full_frame = fraction >= 0.98
    selected = image.convert('RGBA') if full_frame else matte
    # TRELLIS recognizes a supplied alpha channel only if it has transparent
    # pixels. The border prevents an implicit rembg download for opaque images.
    padding = 16
    padded = Image.new('RGBA', (image.width + 2*padding, image.height + 2*padding), (0, 0, 0, 0))
    padded.paste(selected, (padding, padding))
    return padded, {'alphaMethod': 'white-matte-or-full-frame-v1',
        'conditioningMode': 'unsegmented-full-frame' if full_frame else 'white-matte',
        'matteForegroundFraction': fraction, 'transparentPaddingPixels': padding,
        'conditioningSize': list(padded.size),
        'alphaLimitation': ('Nonwhite background retained as image conditioning; may become geometry.' if full_frame
                            else 'Color key may remove pale material; RGB retained for inspection.')}
