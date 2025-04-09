import os
import json
from google.cloud import vision
import google.generativeai as genai

# --- STEP 1: Configure API Keys ---
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "gcloud_key.json"  # Vision API Key
genai.configure(api_key="AIzaSyBVtc4n0OhfEmHorRfg_DufyvSSI1bXux4")  # Gemini API Key


# --- STEP 2: Extract Text using Google Vision API ---
def extract_text_from_image(image_path):
    print("📷 Extracting text from image...")
    client = vision.ImageAnnotatorClient()
    with open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.text_detection(image=image)

    if response.error.message:
        raise Exception(f'Vision API error: {response.error.message}')

    texts = response.text_annotations
    return texts[0].description if texts else ""


# --- STEP 3: Generate Structured JSON using Gemini ---
def generate_structured_json_from_text(raw_text):
    print("🤖 Sending to Gemini API...")
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro")

    prompt = f"""
    You are a highly intelligent medical assistant trained to read prescriptions and infer medical information.
    Given an unstructured prescription text, convert it into a fully filled, detailed JSON object using your knowledge of medicine.

    If any detail (e.g., dosage, duration, side effects, summary) is missing from the text, infer and fill it appropriately based on the diagnosis, context, and standard medical practices.

    Prescription Text:
    \"\"\"{raw_text}\"\"\"

    Your task:
    - Parse the prescription text carefully.
    - Fill in all fields in the JSON structure below, including disease summary, precautions, medicines, side effects, etc.
    - If medication names are mentioned without dosage/duration, fill those in based on typical usage.
    - Be accurate, logical, and concise.
    - Do not skip any field or leave empty arrays.
    - Return only valid JSON. Do NOT wrap it with ```json or any other markdown formatting.

    Expected JSON Format:
    {{
      "patient_name": "string",
      "age": number,
      "gender": "string",
      "prescription_date": "YYYY-MM-DD",
      "doctor_name": "string",
      "diagnosis": "string",
      "disease_info": {{
        "summary": "string",
        "precautions": ["string"]
      }},
      "medications": [
        {{
          "medicine_name": "string",
          "dosage": "string (e.g., 1-0-1)",
          "duration_days": number,
          "total_doses": number,
          "purpose": "string",
          "notes": "string",
          "side_effects": ["string"]
        }}
      ],
      "reminders": {{
        "enabled": true,
        "times": ["string (e.g., 08:00 AM, 02:00 PM, 08:00 PM)"]
      }},
      "additional_notes": "string"
    }}
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("❌ Gemini API call failed:", e)
        return "{}"


# --- STEP 4: Clean and Save JSON to File ---
def clean_json_output(gemini_output):
    # Remove wrapping ```json ... ``` if it exists
    if "```json" in gemini_output:
        gemini_output = gemini_output.split("```json")[1]
    if "```" in gemini_output:
        gemini_output = gemini_output.split("```")[0]
    return gemini_output.strip()


def save_json_to_file(json_str, filename="output.json"):
    print("💾 Saving output...")
    json_str = clean_json_output(json_str)
    try:
        parsed = json.loads(json_str)
        with open(filename, "w") as f:
            json.dump(parsed, f, indent=2)
        print(f"✅ JSON saved to {filename}")
    except json.JSONDecodeError as e:
        print("❌ Failed to parse JSON. Here's what Gemini returned:")
        print("```json")
        print(json_str)
        print("```")
        print("Error:", e)


# --- STEP 5: Pipeline Runner ---
def process_prescription(image_path):
    extracted_text = extract_text_from_image(image_path)
    generated_json = generate_structured_json_from_text(extracted_text)
    save_json_to_file(generated_json)


# --- Main Execution ---
if __name__ == "__main__":
    image_path = "image.png"
    process_prescription(image_path)
