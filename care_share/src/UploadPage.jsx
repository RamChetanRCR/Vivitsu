import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Grid,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    setIsLoading(true);
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
          const userUid = auth.currentUser.uid;
          const userUploadsRef = collection(db, "users", userUid, "uploads");

          console.log("Writing to Firestore...");
          await addDoc(userUploadsRef, {
            timestamp: serverTimestamp(),
            fileName: selectedFile.name,
            data: parsedData,
          });
          console.log("Upload written to Firestore");

          await fetchUploadHistory();
          console.log("Navigating to /processed-data...");
          navigate("/processed-data", {
            state: { extractedData: parsedData },
          });
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
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
          ...doc.data(),
        }));

        const sorted = uploads.sort(
          (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
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

  const handleHistoryItemClick = (item) => {
    navigate("/processed-data", { state: { extractedData: item.data } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const uploadAreaVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    },
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        bgcolor: "#fafafa",
        minHeight: "100vh",
        p: { xs: 2, sm: 3 },
        fontFamily: "'Inter', 'Roboto', 'Helvetica', sans-serif",
      }}
    >
      <CssBaseline />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              pb: 1,
              borderBottom: "1px solid #eaeaea",
            }}
          >
            <Typography
              variant="h5"
              sx={{ 
                fontWeight: 500, 
                color: "#333",
                fontSize: { xs: "1.2rem", sm: "1.5rem" }
              }}
            >
              Prescription Manager
            </Typography>
            <IconButton 
              onClick={handleLogout} 
              size={isMobile ? "small" : "medium"}
              sx={{ color: "#555" }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover="hover"
            variants={uploadAreaVariants}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f0f0f0",
              }}
            >
              <Box 
                sx={{ 
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  gap: 1
                }}
              >
                <MedicalServicesOutlinedIcon sx={{ color: "#5677FC" }} />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 500,
                    color: "#5677FC"
                  }}
                >
                  Upload Prescription
                </Typography>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<UploadFileOutlinedIcon />}
                sx={{
                  mt: 1,
                  mb: 2,
                  py: 1.5,
                  borderRadius: "8px",
                  borderWidth: "1px",
                  borderStyle: "dashed",
                  borderColor: "#d0d0d0",
                  color: "#555",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#5677FC",
                    bgcolor: "rgba(86, 119, 252, 0.05)",
                  },
                }}
                component="label"
              >
                {selectedFile ? selectedFile.name : "Select image file"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>

              <Button
                variant="contained"
                fullWidth
                disabled={!selectedFile || isLoading}
                onClick={handleProcessImage}
                sx={{
                  py: 1.5,
                  borderRadius: "8px",
                  backgroundColor: "#5677FC",
                  boxShadow: "none",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#3F51B5",
                    boxShadow: "0 2px 8px rgba(63, 81, 181, 0.3)",
                  },
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>Processing...</span>
                  </Box>
                ) : (
                  "Analyze Prescription"
                )}
              </Button>
            </Box>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 500, 
                color: "#333",
                fontSize: { xs: "1rem", sm: "1.25rem" }
              }}
            >
              Prescription History
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<HistoryOutlinedIcon />}
              sx={{
                color: "#5677FC",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(86, 119, 252, 0.05)",
                },
              }}
            >
              View All
            </Button>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AnimatePresence>
            <List
              sx={{
                width: "100%",
                bgcolor: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f0f0f0",
              }}
            >
              {uploadHistory.length === 0 ? (
                <ListItem sx={{ py: 3 }}>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body1" 
                        align="center" 
                        color="text.secondary"
                        sx={{ fontWeight: 400 }}
                      >
                        No prescriptions yet
                      </Typography>
                    }
                  />
                </ListItem>
              ) : (
                uploadHistory.map((item, index) => {
                  const diseaseName = item.data?.diagnosis || "Unknown Diagnosis";
                  const date = item.timestamp?.toDate()
                    ? new Date(item.timestamp.toDate()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : "Unknown Date";

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.2
                      }}
                    >
                      <ListItem
                        sx={{
                          py: 2,
                          px: 3,
                          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.01)" },
                          transition: "background-color 0.2s",
                        }}
                        button
                        onClick={() => handleHistoryItemClick(item)}
                      >
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          wrap="nowrap"
                          spacing={2}
                        >
                          <Grid item xs>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: 500, color: "#333" }}
                                >
                                  {diseaseName}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#777", fontSize: "0.75rem" }}
                                >
                                  {date}
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid item>
                            <IconButton
                              edge="end"
                              sx={{ color: "#999" }}
                              size="small"
                            >
                              <ArrowForwardIosOutlinedIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                      {index < uploadHistory.length - 1 && (
                        <Divider component="li" sx={{ margin: "0 16px 0 16px" }} />
                      )}
                    </motion.div>
                  );
                })
              )}
            </List>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default UploadPage;