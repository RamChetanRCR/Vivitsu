import React from "react";

const Details = () => {
  const data = {
    patient_name: "Rahul Sharma",
    age: 29,
    gender: "Male",
    prescription_date: "2025-04-07",
    doctor_name: "Dr. Anjali Mehta",
    diagnosis: "Typhoid Fever",
    disease_info: {
      summary:
        "Typhoid fever is a bacterial infection caused by Salmonella typhi. It spreads through contaminated food and water.",
      precautions: [
        "Drink only boiled or bottled water.",
        "Avoid street food.",
        "Maintain good hygiene.",
        "Complete full course of antibiotics.",
      ],
    },
    medications: [
      {
        medicine_name: "Cefixime 200mg",
        dosage: "1-0-1",
        duration_days: 7,
        total_doses: 14,
        purpose: "Antibiotic to treat bacterial infection",
        notes: "Take after food",
        side_effects: ["Nausea", "Diarrhea", "Headache"],
      },
      {
        medicine_name: "Paracetamol 500mg",
        dosage: "1-1-1",
        duration_days: 5,
        total_doses: 15,
        purpose: "To reduce fever and pain",
        notes: "Take only when temperature is above 100°F",
        side_effects: ["Drowsiness", "Liver issues (if overdosed)"],
      },
      {
        medicine_name: "ORS Sachet",
        dosage: "1 after every loose motion",
        duration_days: "As needed",
        total_doses: "Variable",
        purpose: "To rehydrate body",
        notes: "Mix with 1 glass of clean water",
        side_effects: ["None"],
      },
    ],
    reminders: {
      enabled: true,
      times: ["08:00 AM", "02:00 PM", "08:00 PM"],
    },
    additional_notes: "Avoid oily food. Rest well and maintain hydration.",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Patient Details</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Basic Information</h2>
        <p><strong>Patient Name:</strong> {data.patient_name}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Prescription Date:</strong> {data.prescription_date}</p>
        <p><strong>Doctor Name:</strong> {data.doctor_name}</p>
        <p><strong>Diagnosis:</strong> {data.diagnosis}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Disease Information</h2>
        <p><strong>Summary:</strong> {data.disease_info.summary}</p>
        <h3>Precautions:</h3>
        <ul>
          {data.disease_info.precautions.map((precaution, index) => (
            <li key={index}>{precaution}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Medications</h2>
        {data.medications.map((medication, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><strong>Medicine Name:</strong> {medication.medicine_name}</p>
            <p><strong>Dosage:</strong> {medication.dosage}</p>
            <p><strong>Duration:</strong> {medication.duration_days} days</p>
            <p><strong>Total Doses:</strong> {medication.total_doses}</p>
            <p><strong>Purpose:</strong> {medication.purpose}</p>
            <p><strong>Notes:</strong> {medication.notes}</p>
            <p><strong>Side Effects:</strong> {medication.side_effects.join(", ")}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Reminders</h2>
        {data.reminders.enabled ? (
          <ul>
            {data.reminders.times.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        ) : (
          <p>No reminders set.</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Additional Notes</h2>
        <p>{data.additional_notes}</p>
      </div>
    </div>
  );
};

export default Details;