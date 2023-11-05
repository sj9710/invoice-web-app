import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceUpload from "./InvoiceUpload";
import OTPVerification from "./OTPVerification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceUpload />} />
        <Route path="otp-verification" element={<OTPVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
