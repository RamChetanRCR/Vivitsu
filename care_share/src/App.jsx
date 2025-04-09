// filepath: c:\Users\siddhartha reddy\Desktop\vivitsu_workspace\Vivitsu\care_share\src\App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./UploadPage";

import Details from "./Detials";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/processed-data" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;