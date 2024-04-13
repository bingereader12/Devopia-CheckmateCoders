import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Transactions from "../components/Transactions";
import Investments from "../components/Investments";
import Loans from "../components/Loans";
import Insurance from "../components/Insurance";
import AllTransactions from "../components/AllTransactions";
import Dashboard from "../components/Dashboard";
import FamilyExpense from "../components/FamilyExpense";
const MainDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const handleClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  return (
    <div className="h-screen flex bg-primaryBlack text-white">
      <Sidebar handleClick={handleClick} />
      <div className="w-full p-8">
        {selectedMenu === "Transactions" && (
          <Transactions handleClick={handleClick} />
        )}
        {selectedMenu === "Investments" && <Investments />}
        {selectedMenu === "Dashboard" && <Dashboard />}
        {selectedMenu === "Loans" && <Loans />}
        {selectedMenu === "Insurance" && <Insurance />}
        {selectedMenu === "Inbound" && <AllTransactions type="Inbound" />}
        {selectedMenu === "Outbound" && <AllTransactions type="OutBound" />}
        {selectedMenu === "Family Expenses" && <FamilyExpense />}
      </div>
    </div>
  );
};

export default MainDashboard;
