from flask import Flask, request, jsonify
import os, pytesseract
from flask_cors import CORS
from src.routes import bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

cmd = os.getenv("TESSERACT_CMD")
pytesseract.pytesseract.tesseract_cmd = cmd

app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(debug=True)
