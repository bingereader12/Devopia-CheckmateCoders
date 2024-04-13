import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainDashoard from "./pages/MainDashoard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="bg-white min-h-screen">
      <Routes>
        <Route path="/dashboard" element={<MainDashoard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
  x;
};

export default App;
