import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Stack,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const Navbar = ({ user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Define navigation items based on authentication status
  const getNavItems = () => {
    if (user) {
      return [
        
        { name: "Upload", path: "/upload" },
        { name: "Profile", path: "/profile" },
      ];
    } else {
      return [
        { name: "Home", path: "/" },
        { name: "Login", path: "/login" },
        { name: "Sign Up", path: "/signup" },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: "#ffffff", 
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography 
            variant="h6" 
            component={Link} 
            to={user ? "/" : "/"} 
            sx={{ 
              fontWeight: 600, 
              color: "#333333", 
              textDecoration: "none",
              letterSpacing: "0.5px"
            }}
          >
            MediSnap
          </Typography>

          {isMobile ? (
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: "#333333" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={2}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    color: "#333333", 
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    "&:hover": { 
                      backgroundColor: "rgba(0, 0, 0, 0.04)" 
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
              {user && (
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{ 
                    color: "#333333", 
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    "&:hover": { 
                      backgroundColor: "rgba(0, 0, 0, 0.04)" 
                    }
                  }}
                >
                  Logout
                </Button>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        <Box 
          sx={{ 
            width: "100%",
            paddingY: 2
          }} 
          onClick={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton 
                  component={Link} 
                  to={item.path}
                  sx={{ 
                    paddingY: 1.5,
                    "&:hover": { 
                      backgroundColor: "rgba(0, 0, 0, 0.04)" 
                    }
                  }}
                >
                  <ListItemText 
                    primary={item.name} 
                    primaryTypographyProps={{ 
                      fontSize: "0.95rem", 
                      fontWeight: 500 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
            {user && (
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={handleLogout}
                  sx={{ 
                    paddingY: 1.5,
                    "&:hover": { 
                      backgroundColor: "rgba(0, 0, 0, 0.04)" 
                    }
                  }}
                >
                  <ListItemText 
                    primary="Logout" 
                    primaryTypographyProps={{ 
                      fontSize: "0.95rem", 
                      fontWeight: 500 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;