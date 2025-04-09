import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setSelectedFile(file);
  };

  const handleProcessImage = async () => {
    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Uploading file to Flask backend...");
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Received response from Flask:", result);

        const parsedData = JSON.parse(result.data);
        console.log("Parsed OCR data:", parsedData);

        if (auth.currentUser) {
          navigate("/processed-data", {
            state: { extractedData: parsedData }
          });
          const userUid = auth.currentUser.uid;
          const userUploadsRef = collection(db, "users", userUid, "uploads");

          console.log("Writing to Firestore...");
          await addDoc(userUploadsRef, {
            timestamp: serverTimestamp(),
            fileName: selectedFile.name,
            data: parsedData
          });
          console.log("Upload written to Firestore");

          await fetchUploadHistory();

          console.log("Navigating to /processed-data...");
        } else {
          alert("User not authenticated.");
        }
      } else {
        console.error("Flask server returned error:", response.status);
        alert("Failed to upload and process the file.");
      }
    } catch (error) {
      console.error("Error during upload or Firestore write:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  const fetchUploadHistory = async () => {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid;
      const userUploadsRef = collection(db, "users", userUid, "uploads");

      try {
        const snapshot = await getDocs(userUploadsRef);
        const uploads = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        const sorted = uploads.sort((a, b) =>
          (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
        );
        setUploadHistory(sorted);
        console.log("Upload history fetched:", sorted);
      } catch (error) {
        console.error("Failed to fetch upload history:", error);
      }
    }
  };

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Button onClick={handleLogout} variant="contained" color="error" sx={{ mb: 2 }}>
          Logout
        </Button>

        <Typography component="h1" variant="h5" gutterBottom>
          Upload and Process Image
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1, mb: 3 }}>
          <Button variant="contained" component="label" sx={{ mt: 3, mb: 2 }}>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </Button>

          <Button
            onClick={handleProcessImage}
            variant="contained"
            color="primary"
            disabled={!selectedFile}
            sx={{ mt: 3, mb: 2 }}
          >
            Process Image
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom>
          Upload History
        </Typography>

        <List
          sx={{
            width: "100%",
            maxHeight: 300,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: 2
          }}
        >
          {uploadHistory.length === 0 ? (
            <ListItem>
              <ListItemText primary="No uploads yet." />
            </ListItem>
          ) : (
            uploadHistory.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`File: ${item.fileName}`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.timestamp?.toDate().toLocaleString() || "Unknown time"}
                        </Typography>
                        <br />
                        <Box
                          component="div"
                          sx={{
                            fontSize: "0.75rem",
                            whiteSpace: "pre-wrap",
                            fontFamily: "monospace"
                          }}
                        >
                          {JSON.stringify(item.data, null, 2)}
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Box>
    </Container>
  );
};

export default UploadPage;
