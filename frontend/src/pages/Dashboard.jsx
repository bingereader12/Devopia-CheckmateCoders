import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Savings from "../components/Savings";
import Transactions from "../components/Transactions";
import Investments from "../components/Investments";
import Loans from "../components/Loans";
import Insurance from "../components/Insurance";

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Transactions");

  const handleClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  console.log(selectedMenu);

  return (
    <div className="h-screen w-screen border border-red-500 flex bg-primaryBlack text-white">
      <Sidebar handleClick={handleClick} />
      <div>
        {selectedMenu === "Savings" && <Savings />}
        {selectedMenu === "Transactions" && <Transactions />}
        {selectedMenu === "Investments" && <Investments />}
        {selectedMenu === "Loans" && <Loans />}
        {selectedMenu === "Insurance" && <Insurance />}
      </div>
    </div>
  );
};

export default Dashboard;
