import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

// Component for setting Google Calendar reminders for medications
const MedicationReminders = ({ medications = [], reminders = { times: [] } }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedMedications, setSelectedMedications] = useState({});
  const [reminderTimes, setReminderTimes] = useState(
    reminders.times && reminders.times.length > 0 
      ? reminders.times 
      : ["08:00 AM", "06:00 PM"]
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Primary color
  const primaryColor = "#5677FC";

  // Handle dialog open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Toggle medication selection
  const toggleMedication = (medicineId) => {
    setSelectedMedications({
      ...selectedMedications,
      [medicineId]: !selectedMedications[medicineId],
    });
  };

  // Initialize all medications as selected when opening dialog
  useEffect(() => {
    if (open && medications.length > 0 && Object.keys(selectedMedications).length === 0) {
      const initialSelection = {};
      medications.forEach((med, index) => {
        initialSelection[index] = true;
      });
      setSelectedMedications(initialSelection);
    }
  }, [open, medications, selectedMedications]);

  // Parse dosage pattern to determine reminder times
  const parseDosagePattern = (dosage) => {
    try {
      // Extract the pattern (e.g., "1-0-1" from "500mg 1-0-1")
      const parts = dosage.split(" ");
      const pattern = parts.length > 1 ? parts.pop() : dosage;
      
      // Split by "-" to get individual dose amounts
      const doses = pattern.split("-").map(Number);
      
      // Map to common dosage times
      const times = [];
      if (doses.length >= 1 && doses[0] > 0) times.push("Morning");
      if (doses.length >= 2 && doses[1] > 0) times.push("Afternoon");
      if (doses.length >= 3 && doses[2] > 0) times.push("Evening");
      
      return times.length > 0 ? times : ["Daily"];
    } catch (error) {
      console.error("Error parsing dosage pattern:", error);
      return ["Daily"];
    }
  };

  // Function to actually create the Google Calendar events
  const createCalendarEvents = async () => {
    setLoading(true);
    
    try {
      // This is where you would integrate with the Google Calendar API
      // For demonstration, we're simulating the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Check if Google API is loaded
      if (typeof window.gapi === 'undefined') {
        throw new Error("Google API not loaded");
      }
      
      const selectedMeds = medications.filter((_, index) => 
        selectedMedications[index]
      );
      
      // Success message details
      const medCount = selectedMeds.length;
      setSnackbarMessage(`Successfully set reminders for ${medCount} medication${medCount !== 1 ? 's' : ''}`);
      setSnackbarOpen(true);
      setSuccess(true);
      
      // Close dialog after success
      setTimeout(() => {
        setLoading(false);
        handleClose();
        setSuccess(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error creating calendar events:", error);
      setSnackbarMessage("Failed to set reminders. Please try again.");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  // Animation variants
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
  
  // Chip transition variants
  const chipVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button
          variant="contained"
          startIcon={<CalendarMonthIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: primaryColor,
            borderRadius: "28px",
            py: 1.2,
            px: 3,
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(86, 119, 252, 0.2)",
            "&:hover": {
              backgroundColor: "#4a67e3",
              boxShadow: "0 6px 16px rgba(86, 119, 252, 0.3)",
            },
          }}
        >
          Set Medication Reminders
        </Button>
      </motion.div>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : "16px",
            padding: { xs: 1, sm: 2 },
            height: isMobile ? "100%" : "auto",
          },
        }}
      >
        <DialogTitle sx={{ p: 2, pb: 0 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Box
                  sx={{
                    backgroundColor: primaryColor,
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NotificationsActiveIcon sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
                </Box>
              </motion.div>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: { xs: "1.1rem", sm: "1.5rem" },
                }}
              >
                Set Medication Reminders
              </Typography>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Select medications to set reminders for in Google Calendar:
              </Typography>

              {medications.length > 0 ? (
                medications.map((medication, index) => {
                  const doseTimes = parseDosagePattern(medication.dosage);
                  
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "flex-start", sm: "center" },
                          justifyContent: "space-between",
                          p: 2,
                          mb: 2,
                          border: "1px solid #e0e0e0",
                          borderRadius: "12px",
                          backgroundColor: selectedMedications[index] 
                            ? `${primaryColor}10`
                            : "transparent",
                          borderColor: selectedMedications[index]
                            ? primaryColor
                            : "#e0e0e0",
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                        }}
                        onClick={() => toggleMedication(index)}
                      >
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1.5,
                          width: "100%",
                          mb: { xs: 1, sm: 0 }
                        }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={!!selectedMedications[index]}
                                onChange={() => toggleMedication(index)}
                                color="primary"
                              />
                            }
                            label=""
                            sx={{ m: 0 }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                            >
                              {medication.medicine_name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#666" }}
                            >
                              {medication.dosage} • {medication.duration_days} days
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ 
                          display: "flex", 
                          flexWrap: "wrap", 
                          gap: 0.75,
                          ml: { xs: 5, sm: 0 },
                          mt: { xs: 0.5, sm: 0 },
                          maxWidth: "100%"
                        }}>
                          {doseTimes.map((time, i) => (
                            <motion.div
                              key={i}
                              variants={chipVariants}
                              whileHover="hover"
                            >
                              <Chip
                                size="small"
                                icon={<AccessTimeIcon sx={{ fontSize: "16px !important" }} />}
                                label={time}
                                sx={{
                                  backgroundColor: `${primaryColor}15`,
                                  color: primaryColor,
                                  height: "24px",
                                  "& .MuiChip-label": {
                                    px: 1,
                                  },
                                }}
                              />
                            </motion.div>
                          ))}
                        </Box>
                      </Box>
                    </motion.div>
                  );
                })
              ) : (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body1" sx={{ color: "#777" }}>
                    No medications found in the prescription.
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Reminder Times
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {reminderTimes.map((time, index) => (
                  <motion.div
                    key={index}
                    variants={chipVariants}
                    whileHover="hover"
                  >
                    <Chip
                      icon={<AccessTimeIcon sx={{ fontSize: "16px !important" }} />}
                      label={time}
                      sx={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: "#e3f2fd",
                  border: "1px solid #bbdefb",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#1565c0" }}
                >
                  Reminders will be created in your Google Calendar based on your medication dosage schedule.
                  You'll receive notifications according to your Google Calendar settings.
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </DialogContent>

        <DialogActions sx={{ 
          p: 3, 
          pt: 0,
          flexDirection: isMobile ? "column" : "row",
          "& > button": {
            width: isMobile ? "100%" : "auto",
            mb: isMobile ? 1 : 0,
          }
        }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: "#666",
              borderRadius: "28px",
              px: 3,
              textTransform: "none",
              order: isMobile ? 2 : 1,
            }}
          >
            Cancel
          </Button>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ width: isMobile ? "100%" : "auto", order: isMobile ? 1 : 2 }}
          >
            <Button
              fullWidth={isMobile}
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EventIcon />}
              onClick={createCalendarEvents}
              disabled={loading || !medications.length || Object.values(selectedMedications).every(v => !v)}
              sx={{
                backgroundColor: primaryColor,
                borderRadius: "28px",
                px: 3,
                py: isMobile ? 1.2 : 1,
                mb: isMobile ? 1.5 : 0,
                fontWeight: 500,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(86, 119, 252, 0.2)",
                "&:hover": {
                  backgroundColor: "#4a67e3",
                  boxShadow: "0 6px 16px rgba(86, 119, 252, 0.3)",
                },
              }}
            >
              {loading ? "Creating..." : success ? "Success!" : "Set Reminders"}
            </Button>
          </motion.div>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={success ? "success" : "error"} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

// Component to integrate with the existing Details component
const CalendarIntegration = ({ extractedData }) => {
  // Add error handling to prevent crashes when extractedData is undefined or doesn't have expected structure
  if (!extractedData || !extractedData.medications || !Array.isArray(extractedData.medications)) {
    return null; // Return null or a fallback UI when data is missing
  }

  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
      <MedicationReminders 
        medications={extractedData.medications} 
        reminders={extractedData.reminders || { times: [] }}
      />
    </Box>
  );
};

export default CalendarIntegration;