import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from ocr_extraction import process_prescription

app = Flask(__name__)
CORS(app)

# Ensure the uploads directory exists
UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file to the uploads directory
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Process the uploaded file using OCR
    try:
        process_prescription(file_path)  # This generates `output.json`
        with open("output.json", "r") as f:
            extracted_data = f.read()
        return jsonify({"message": "File uploaded and processed successfully", "data": extracted_data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)