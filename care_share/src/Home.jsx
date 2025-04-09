import React, { useRef, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import hero from "./assets/hero-image.png";
import { 
  Notifications, 
  Security, 
  ReceiptLong, 
  Storage, 
  Alarm, 
  Assessment
} from "@mui/icons-material";

// Animation variants for framer-motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MediSnapHomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  
  const scrollContainerRef = useRef(null);
  
  const handleContinue = () => {
    navigate("/upload");
  };

  // Auto-scroll animation effect for carousel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let direction = 'right-to-left';
    let animationId;

    const animate = () => {
      if (!scrollContainer) return;
      
      // Get the maximum scroll position
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (direction === 'right-to-left') {
        scrollContainer.scrollLeft += 1;
        
        // When reaching the end, change direction
        if (scrollContainer.scrollLeft >= maxScroll - 1) {
          direction = 'left-to-right';
        }
      } else {
        scrollContainer.scrollLeft -= 1;
        
        // When reaching the beginning, change direction
        if (scrollContainer.scrollLeft <= 1) {
          direction = 'right-to-left';
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause animation when hovering
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Features with icons instead of images
  const features = [
    {
      title: "Prescription Analysis",
      desc: "Analyze prescriptions and extract important medical data.",
      icon: <ReceiptLong fontSize="large" sx={{ fontSize: 64, color: "#4361EE" }} />,
      color: "#E6EFFF"
    },
    {
      title: "Store Prescriptions",
      desc: "Easily store and access all your prescriptions in one place.",
      icon: <Storage fontSize="large" sx={{ fontSize: 64, color: "#4361EE" }} />,
      color: "#E6EFFF"
    },
    {
      title: "Medication Reminders",
      desc: "Set smart reminders for when to take your medications.",
      icon: <Alarm fontSize="large" sx={{ fontSize: 64, color: "#4361EE" }} />,
      color: "#E6EFFF"
    },
    {
      title: "Medical Report Analysis",
      desc: "Analyze blood tests, X-rays and other reports intelligently.",
      icon: <Assessment fontSize="large" sx={{ fontSize: 64, color: "#4361EE" }} />,
      color: "#E6EFFF"
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        color: "#333333",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 6, sm: 8, md: 10 }, // Increased top padding
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Hero Section with larger spacing and bigger title */}
      <div className="motion-div" data-variants={JSON.stringify(fadeIn)}>
        <Typography 
          variant="h2" // Increased from h4 to h2
          fontWeight="bold" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: "#4361EE",
            mb: 3, // More space below title
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' } // Responsive font size
          }}
        >
          MediSnap
        </Typography>
      </div>

      <div className="motion-div" data-variants={JSON.stringify(fadeIn)}>
        <Typography 
          variant="h6" // Increased from default to h6
          align="center" 
          mb={4} // Increased spacing
          sx={{ color: "#666666" }}
        >
          Snap a prescription, track with precision.
        </Typography>
      </div>

      <div className="motion-div" data-variants={JSON.stringify(fadeIn)}>
        <Typography 
          align="center" 
          sx={{ 
            mb: 5, // Increased spacing
            px: 1, 
            maxWidth: 700,
            color: "#666666",
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.1rem' } // Slightly larger text
          }}
        >
          Our app is dedicated to simplifying healthcare management by providing
          an intuitive platform to store prescriptions, track medications, and
          access reliable medical information.
        </Typography>
      </div>

      <div className="motion-div" data-animate={{ opacity: [0, 1], y: [20, 0] }} data-transition={{ duration: 0.6, delay: 0.2 }}>
        <Box 
          display="flex" 
          gap={4} 
          mb={6} // Increased spacing
          sx={{ color: "#4361EE" }}
        >
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1
            }}
          >
            <Notifications sx={{ fontSize: 36 }} /> {/* Increased icon size */}
            <Typography variant="body1" sx={{ color: "#666666" }}>Smart Alerts</Typography>
          </Box>
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1
            }}
          >
            <Security sx={{ fontSize: 36 }} /> {/* Increased icon size */}
            <Typography variant="body1" sx={{ color: "#666666" }}>Secure Data</Typography>
          </Box>
        </Box>
      </div>

      <div className="motion-div" data-whileHover={{ scale: 1.05 }} data-whileTap={{ scale: 0.95 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#4361EE",
            borderRadius: 6,
            fontWeight: "bold",
            px: 6, // Wider button
            py: 2, // Taller button
            mb: 8, // More margin bottom
            boxShadow: "0 4px 14px rgba(67, 97, 238, 0.3)",
            textTransform: "none",
            fontSize: "1.1rem", // Larger font
            "&:hover": {
              bgcolor: "#3A56D4"
            }
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>

      {/* Features Section with Auto-Scrolling Animation - Removed navigation buttons */}
      <Box sx={{ width: "100%", mb: 8 }}>
        <div className="motion-div" data-variants={JSON.stringify(fadeIn)}>
          <Typography 
            variant="h4" // Changed from h5 to h4
            fontWeight="bold" 
            align="center" 
            sx={{ mb: 5, mt: 2, color: "#333333" }} // More bottom margin
          >
            Key Features
          </Typography>
        </div>
        
        <Container maxWidth="sm" sx={{ position: 'relative' }}>
          {/* Scrollable Container with smooth animation */}
          <Box
            sx={{
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                width: { xs: '40px', sm: '60px' },
                height: '100%',
                top: 0,
                zIndex: 1,
                pointerEvents: 'none'
              },
              '&::before': {
                left: 0,
                background: 'linear-gradient(to right,rgba(255, 255, 255, 0.86) 0%, transparent 100%)',
              },
              '&::after': {
                right: 0,
                background: 'linear-gradient(to left,rgba(255, 255, 255, 0.73) 0%, transparent 100%)',
              }
            }}
          >
            <Box
              ref={scrollContainerRef}
              sx={{
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                px: 2,
                py: 3,
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c1c1c1',
                  borderRadius: '10px',
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'thin',
              }}
            >
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    minWidth: { xs: '260px', sm: '280px' },
                    maxWidth: { xs: '260px', sm: '280px' },
                    height: '280px',
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: "#FFFFFF",
                    color: "#333333",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    },
                    flex: '0 0 auto',
                  }}
                >
                  <CardContent sx={{ 
                    p: 3, 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      backgroundColor: feature.color,
                      mb: 3
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="div" 
                      fontWeight="600"
                      align="center"
                      sx={{ color: "#333333" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      align="center"
                      sx={{ color: "#666666", lineHeight: 1.6 }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#F8F9FA",
          textAlign: "center",
          py: 4,
          mt: "auto",
          borderTop: "1px solid #E9ECEF",
          borderRadius: "24px 24px 0 0"
        }}
      >
        
      </Box>
    </Box>
  );
};

export default MediSnapHomePage;