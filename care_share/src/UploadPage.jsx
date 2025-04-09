import React, { useState } from "react";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProcessImage = () => {
    if (selectedFile) {
      alert(`Processing image: ${selectedFile.name}`);
      // Add your image processing logic here
    } else {
      alert("Please upload an image first.");
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