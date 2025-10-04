from flask import Blueprint, jsonify, request
from .parse import extract_text_from_pdf
from .gemini import call_gemini_api

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

        bill_data = extract_text_from_pdf(fpath)
        return jsonify(bill_data)

    # 2) JSON path (optional helper)
    data = request.get_json(silent=True) or {}
    file_path = data.get("file_path")
    if file_path:
        bill_data = extract_text_from_pdf(file_path)
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



