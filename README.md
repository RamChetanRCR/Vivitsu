🔎 Project Overview

MediSnap is a prescription parsing system designed to extract structured medical information from handwritten doctor prescriptions. The core objective of this system is to make medical prescriptions more readable, structured, and accessible by automatically identifying and categorizing essential details such as:

    Patient information (Name, Age, Gender)
    
    Doctor details
    
    Date of prescription
    
    Diagnoses / Conditions
    
    Medications with dosage & duration
    
    Precautions & warnings
    
    Reminders and follow-up notes

The system processes handwritten prescription images using OCR (Optical Character Recognition), applies NLP techniques to extract relevant entities, and produces a structured JSON file containing all extracted data.



⚙️ Workflow

    Input Upload
      User uploads a handwritten prescription image.
    
    OCR Processing
      Image text is extracted using OCR.
    
    Entity Extraction
      NLP identifies relevant entities (patient details, doctor, medications, precautions, reminders).
    
    Structuring
      Extracted data is organized into a JSON schema for easy interpretation.
    
    Output
      JSON file is generated and displayed in a readable format on the UI.
