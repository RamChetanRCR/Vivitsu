import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import UploadPage from "./UploadPage";
import Details from "./Detials";
import Login from "./Login";
import Signup from "./Signup";
import MediSnapHomePage from "./Home";
import Navbar from "./Navbar";
import ProfilePage from "./ProfilePage";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      
      
       
      
      
      <Routes>
        {/* Public home route */}
        <Route 
          path="/" 
          element={user ?  <MediSnapHomePage /> : <MediSnapHomePage />} 
        />
        
        {/* Authentication routes - redirect to dashboard if already logged in */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/dashboard" /> : <Signup />} 
        />
        
        {/* Protected routes - redirect to login if not authenticated */}
        <Route 
          path="/dashboard" 
          element={user ? <UploadPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/upload" 
          element={user ? <UploadPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <ProfilePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/processed-data" 
          element={user ? <Details /> : <Navigate to="/login" />} 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;