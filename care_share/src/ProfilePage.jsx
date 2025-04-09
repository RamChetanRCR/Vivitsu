import React from "react";
import { Box, Typography, IconButton, Avatar, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const userData = {
  image: "https://i.imgur.com/z8xV7Z1.jpg",
  bloodGroup: "A+",
  age: 20,
  sex: "Male",
  height: "6'2",
  weight: 65,
};

const ProfilePage = () => {
  const navigate = useNavigate(); // ✅ moved inside component

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdfdfd",
        px: 3,
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Back Arrow */}
      <Box sx={{ alignSelf: "flex-start" }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
      </Box>

      {/* Title */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Profile
      </Typography>

      {/* Avatar */}
      <Avatar
        src={userData.image}
        alt="Profile"
        sx={{
          width: 100,
          height: 100,
          mb: 3,
        }}
      />

      {/* Info Card */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#f2f6ff",
          borderRadius: 2,
          px: 3,
          py: 2,
          width: "100%",
          maxWidth: 300,
          mb: 4,
        }}
      >
        {[ 
          { label: "Blood Group", value: userData.bloodGroup },
          { label: "Age", value: userData.age },
          { label: "Sex", value: userData.sex },
          { label: "Height", value: userData.height },
          { label: "Weight", value: userData.weight },
        ].map((item, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>{item.label}</Typography>
            <Typography fontWeight="medium">{item.value}</Typography>
          </Box>
        ))}
      </Paper>

      {/* Logout */}
      <Typography
        color="error"
        fontWeight="bold"
        sx={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={handleLogout}
      >
        Logout
      </Typography>
    </Box>
  );
};

export default ProfilePage;
