import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const extractedData = location.state?.extractedData || null;

  if (!extractedData) {
    return <h2 style={{ textAlign: "center", color: "red" }}>No data available to display.</h2>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Patient Details</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <h2>Basic Information</h2>
        <p><strong>Patient Name:</strong> {extractedData.patient_name}</p>
        <p><strong>Age:</strong> {extractedData.age}</p>
        <p><strong>Gender:</strong> {extractedData.gender}</p>
        <p><strong>Prescription Date:</strong> {extractedData.prescription_date}</p>
        <p><strong>Doctor Name:</strong> {extractedData.doctor_name}</p>
        <p><strong>Diagnosis:</strong> {extractedData.diagnosis}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Disease Information</h2>
        <p><strong>Summary:</strong> {extractedData.disease_info.summary}</p>
        <h3>Precautions:</h3>
        <ul>
          {extractedData.disease_info.precautions.map((precaution, index) => (
            <li key={index}>{precaution}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Medications</h2>
        {extractedData.medications.map((medication, index) => (
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
        {extractedData.reminders.enabled ? (
          <ul>
            {extractedData.reminders.times.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        ) : (
          <p>No reminders set.</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Additional Notes</h2>
        <p>{extractedData.additional_notes}</p>
      </div>
    </div>
  );
};

export default Details;