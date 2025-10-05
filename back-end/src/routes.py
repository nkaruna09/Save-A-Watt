import os
from werkzeug.utils import secure_filename
from flask import Blueprint, jsonify, request
from pathlib import Path

from .gemini import call_gemini_api
from .parse import extract_text_from_pdf, parse_bill_data
from .ocr_local import ocr_to_text



bp = Blueprint("main", __name__)

@bp.get("/")
def root():
    return jsonify({"ok": True})


@bp.post("/analyze")
def analyze():
    """
    Accepts EITHER:
    - multipart/form-data with 'file' (PDF)
    - application/json with { "file_path": "..."} or manual fields later
    Returns parsed bill fields (kWh, bill_type, Total_Cost, etc.)
    """
    # 1) File upload path (preferred for demo)
    if "file" in request.files:
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        # Save to a temp path
        fname = secure_filename(file.filename)
        tmp_dir = os.path.join(os.getcwd(), "tmp")
        os.makedirs(tmp_dir, exist_ok=True)
        fpath = os.path.join(tmp_dir, fname)
        file.save(fpath)

        text = extract_text_from_pdf(fpath)
        if text == "":
            text = ocr_to_text(file.read(), psm=6)

        bill_data = parse_bill_data(text)
            
        return jsonify(bill_data)

    # 2) JSON path (optional helper)
    data = request.get_json(silent=True) or {}
    file_path = data.get("file_path")
    if file_path:
        text = extract_text_from_pdf(file_path)
        print(text[:1000])  # Debug: print first 1000 characters of extracted text
        if text == "":
            print("OCRing PDF as fallback...")
            text = ocr_to_text(file_path, psm=6)
        bill_data = parse_bill_data(text)
        return jsonify(bill_data)

    return jsonify({"error": "Send a PDF as 'file' (multipart) or provide 'file_path' in JSON."}), 400

@bp.post("/advice")
def advice():
    """
    Expects JSON: { ...bill_data... } (typically the output of /analyze)
    Returns LLM-generated tips/subsidy guidance.
    """
    bill_data = request.get_json(silent=True) or {}
    if not bill_data or not isinstance(bill_data, dict):
        return jsonify({"error": "Provide bill_data JSON"}), 400

    text = call_gemini_api(bill_data)
    
    return jsonify({"advice": text})



