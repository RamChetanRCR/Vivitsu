import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProcessImage = async () => {
    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Assuming the Flask endpoint returns a success message or data
        const data = await response.json();
        console.log("File uploaded successfully:", data);

        // Navigate to the Processed Data page
        navigate("/processed-data", { state: { processedData: data } });
      } else {
        alert("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Upload and Process Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ margin: "20px 0" }}
      />
      <br />
      <button
        onClick={handleProcessImage}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Process Image
      </button>
    </div>
  );
};

export default UploadPage;