from flask import Flask, request, jsonify
from flask_cors import CORS
from src.routes import bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.register_blueprint(bp)


if __name__ == "__main__":
    app.run(debug=True)
