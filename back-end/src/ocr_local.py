import io
from PIL import Image, ImageOps
import pytesseract

def ocr_to_text(image_input, lang="eng", psm=6, oem=3, whitelist=None):
    """Return plain text from an image (path/bytes/BytesIO/file-like/PIL.Image)."""
    if isinstance(image_input, Image.Image):
        img = image_input
    elif isinstance(image_input, (bytes, bytearray)):
        img = Image.open(io.BytesIO(image_input))
    elif isinstance(image_input, io.BytesIO) or hasattr(image_input, "read"):
        # BytesIO or file-like (e.g., Flask FileStorage.stream)
        # ensure pointer at start if it's a stream:
        try:
            image_input.seek(0)
        except Exception:
            pass
        img = Image.open(image_input)
    else:  # assume a filesystem path or Path-like
        img = Image.open(str(image_input))

    # Fix EXIF rotation and use grayscale (simple, effective default)
    img = ImageOps.exif_transpose(img).convert("L")

    # Tesseract config
    config = f"--oem {oem} --psm {psm}"
    if whitelist:
        # keep without extra quotes to avoid shell-escaping issues on some platforms
        config += f" -c tessedit_char_whitelist={whitelist}"

    return pytesseract.image_to_string(img, lang=lang, config=config).strip()
