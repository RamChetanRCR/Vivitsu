import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Chip,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const extractedData = location.state?.extractedData || null;
  const [openMedicationDialog, setOpenMedicationDialog] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

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

  // Card hover animation
  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  if (!extractedData) {
    return (
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              border: "1px solid #f0f0f0",
            }}
          >
            <InfoOutlinedIcon
              sx={{ fontSize: 60, color: "#e57373", mb: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 500, color: "#e57373" }}>
              No Data Available
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 2, color: "#777", fontWeight: 400 }}
            >
              There is no prescription data to display. Please go back and select a prescription.
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenMedicationDialog = (medication) => {
    setSelectedMedication(medication);
    setOpenMedicationDialog(true);
  };

  const handleCloseMedicationDialog = () => {
    setOpenMedicationDialog(false);
  };

  // Primary color for the UI
  const primaryColor = "#5677FC";

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 3 },
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        fontFamily: "'Inter', 'Roboto', 'Helvetica', sans-serif",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              pb: 1,
              borderBottom: "1px solid #eaeaea",
            }}
          >
            <IconButton
              onClick={handleGoBack}
              size={isMobile ? "small" : "medium"}
              sx={{ mr: 1, color: "#666" }}
            >
              <ArrowBackIosNewOutlinedIcon
                sx={{ fontSize: isMobile ? 16 : 20 }}
              />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                color: "#333",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Prescription Details
            </Typography>
          </Box>
        </motion.div>

        {/* Patient Information Section */}
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover="hover"
            variants={cardHoverVariants}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f0f0f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  gap: 1,
                }}
              >
                <PersonOutlineOutlinedIcon sx={{ color: primaryColor }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: primaryColor,
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  Patient Information
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#777", fontSize: "0.875rem" }}
                  >
                    Patient Name
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, mb: 1.5 }}
                  >
                    {extractedData.patient_name}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#777", fontSize: "0.875rem" }}
                  >
                    Age
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, mb: 1.5 }}
                  >
                    {extractedData.age}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#777", fontSize: "0.875rem" }}
                  >
                    Gender
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, mb: 1.5 }}
                  >
                    {extractedData.gender}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#777", fontSize: "0.875rem" }}
                  >
                    Doctor
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, mb: 1.5 }}
                  >
                    {extractedData.doctor_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#777", fontSize: "0.875rem" }}
                  >
                    Date
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarTodayOutlinedIcon
                      sx={{ fontSize: 16, color: "#888" }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {extractedData.prescription_date}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </motion.div>

        {/* Diagnosis Section */}
        <motion.div variants={itemVariants}>
          <motion.div whileHover="hover" variants={cardHoverVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f0f0f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalHospitalOutlinedIcon sx={{ color: primaryColor }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: primaryColor,
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {extractedData.diagnosis}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: primaryColor,
                    borderRadius: "20px",
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#4a67e3",
                      boxShadow: "0 4px 8px rgba(86, 119, 252, 0.2)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                {extractedData.disease_info.summary}
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: "12px",
                  backgroundColor: "#fff9c4",
                  border: "1px solid #fff59d",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <WarningAmberOutlinedIcon
                    sx={{ color: "#ffa000", mt: 0.5 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: "#f57f17", mb: 1 }}
                    >
                      Important Precautions
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {extractedData.disease_info.precautions.map(
                        (precaution, index) => (
                          <Typography
                            component="li"
                            variant="body2"
                            key={index}
                            sx={{ mb: 0.5 }}
                          >
                            {precaution}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>

        {/* Medications Section */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 1,
              }}
            >
              <MedicationOutlinedIcon sx={{ color: primaryColor }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: primaryColor,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Medications
              </Typography>
            </Box>

            {/* New Medication Card Style */}
            {extractedData.medications.map((medication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover="hover"
                variants={cardHoverVariants}
                onClick={() => handleOpenMedicationDialog(medication)}
                style={{ cursor: "pointer" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 2 },
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        backgroundColor: primaryColor,
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <MedicationOutlinedIcon sx={{ color: "white" }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "#333",
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                          }}
                        >
                          {medication.medicine_name}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: "20px",
                            borderColor: primaryColor,
                            color: primaryColor,
                            textTransform: "none",
                            minWidth: "80px",
                            fontSize: "0.75rem",
                            "&:hover": {
                              borderColor: primaryColor,
                              backgroundColor: `${primaryColor}10`,
                            },
                          }}
                        >
                          Buy Now
                        </Button>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "#666", fontSize: "0.875rem" }}
                      >
                        {medication.dosage} • {medication.duration_days} days
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Reminders Section */}
        <motion.div variants={itemVariants}>
          <motion.div whileHover="hover" variants={cardHoverVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f0f0f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <NotificationsNoneOutlinedIcon sx={{ color: primaryColor }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: primaryColor,
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    Reminders
                  </Typography>
                </Box>
                
                <Chip 
                  icon={<NotificationsNoneOutlinedIcon sx={{ fontSize: '16px !important' }} />} 
                  label={`${extractedData.reminders.times.length} Reminder${extractedData.reminders.times.length !== 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor,
                    fontWeight: 500,
                  }}
                />
              </Box>

              {extractedData.reminders.enabled ? (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {extractedData.reminders.times.map((time, index) => (
                    <Chip
                      key={index}
                      icon={<AccessTimeIcon sx={{ fontSize: '16px !important' }} />}
                      label={time}
                      sx={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" sx={{ color: "#777" }}>
                  No reminders set for this prescription.
                </Typography>
              )}
            </Paper>
          </motion.div>
        </motion.div>

        {/* Additional Notes Section */}
        {extractedData.additional_notes && (
          <motion.div variants={itemVariants}>
            <motion.div whileHover="hover" variants={cardHoverVariants}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  mb: 3,
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #f0f0f0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 1,
                  }}
                >
                  <NoteOutlinedIcon sx={{ color: primaryColor }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: primaryColor,
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    Additional Notes
                  </Typography>
                </Box>

                <Typography variant="body1">
                  {extractedData.additional_notes}
                </Typography>
              </Paper>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Medication Detail Dialog */}
      <Dialog
        open={openMedicationDialog}
        onClose={handleCloseMedicationDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: { xs: 1, sm: 2 },
          },
        }}
      >
        <AnimatePresence>
          {selectedMedication && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogTitle sx={{ p: 2, pb: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: primaryColor,
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MedicationOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: "#333",
                          fontSize: { xs: "1.4rem", sm: "1.5rem" },
                        }}
                      >
                        {selectedMedication.medicine_name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#666", fontWeight: 400 }}
                      >
                        Antibiotic
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleCloseMedicationDialog}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
              </DialogTitle>
              <DialogContent sx={{ p: 2, pt: 0 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#777", fontSize: "0.875rem", mb: 1 }}
                      >
                        Dosage
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 500, fontSize: "1.25rem" }}
                      >
                        {selectedMedication.dosage}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#777", fontSize: "0.875rem", mb: 1 }}
                      >
                        Duration
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 500, fontSize: "1.25rem" }}
                      >
                        {selectedMedication.duration_days} days • {selectedMedication.total_doses} doses
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#777", fontSize: "0.875rem", mb: 1 }}
                      >
                        Purpose
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 500, fontSize: "1.1rem" }}
                      >
                        {selectedMedication.purpose}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#777", fontSize: "0.875rem", mb: 1 }}
                      >
                        Notes
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 400 }}
                      >
                        {selectedMedication.notes}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  {selectedMedication.side_effects && selectedMedication.side_effects.length > 0 && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          backgroundColor: "#ffebee",
                          border: "1px solid #ffcdd2",
                          mb: 3,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: "#d32f2f", mb: 1 }}
                        >
                          Possible Side Effects
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {selectedMedication.side_effects.map((effect, idx) => (
                            <Chip
                              key={idx}
                              size="small"
                              label={effect}
                              sx={{
                                backgroundColor: "#fff",
                                border: "1px solid #ffcdd2",
                                color: "#d32f2f",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
                
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartOutlinedIcon />}
                    sx={{
                      backgroundColor: primaryColor,
                      borderRadius: "28px",
                      py: 1.2,
                      fontWeight: 500,
                      textTransform: "none",
                      boxShadow: "0 4px 12px rgba(86, 119, 252, 0.2)",
                      "&:hover": {
                        backgroundColor: "#4a67e3",
                        boxShadow: "0 6px 16px rgba(86, 119, 252, 0.3)",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
                
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: `${primaryColor}10`,
                    border: `1px solid ${primaryColor}30`,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <InfoIcon
                    sx={{ color: primaryColor, mt: 0.3 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: primaryColor, fontWeight: 500 }}
                  >
                    Take the full course of the medication even if you feel better before it's finished.
                  </Typography>
                </Box>
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </Container>
  );
};

export default Details;