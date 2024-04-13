import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen border border-red-500 flex">
      <Sidebar />
      <div>Content</div>
    </div>
  );
};

export default Dashboard;
