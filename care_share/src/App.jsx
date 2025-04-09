// filepath: c:\Users\siddhartha reddy\Desktop\vivitsu_workspace\Vivitsu\care_share\src\App.jsx

import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./UploadPage";
import Details from "./Detials";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "./firebase";

const App = () => {


  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);


  return (
    <Router>
      <Routes>
        

        <Route
          path="/"
          element={
            <div>
              {user ? (
                <>
                  
                  <UploadPage />
                </>
              ) : (
                <Login />
              )}
            </div>
          }
        />



        <Route path="/processed-data" element={<Details />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;