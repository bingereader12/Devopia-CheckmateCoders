import React, { useState } from "react";
import savingsIcon from "../../public/icons/wallet.svg";
import transactionsIcon from "../../public/icons/card.svg";
import logoutIcon from "../../public/icons/log-out.svg";
import investmentsIcon from "../../public/icons/bar-chart.svg";
import loansIcon from "../../public/icons/wallet.svg";
import insuranceIcon from "../../public/icons/folder.svg";
import Cookies from 'js-cookie'

const Sidebar = ({ handleClick }) => {
  const menu = [
    { name: "Dashboard", icon: savingsIcon },
    { name: "Transactions", icon: transactionsIcon },
    { name: "Investments", icon: investmentsIcon },
    { name: "Loans", icon: loansIcon },
    { name: "Insurance", icon: insuranceIcon },
    { name: "Family Expenses", icon: insuranceIcon },
  ];
  const [activeTab, setActiveTab] = useState("Dashboard");

  function handleLogout() {
    Cookies.remove("token")
    Cookies.remove("sessionId")
    window.location.replace("../login")
  }

  const handleTabClick = (item) => {
    setActiveTab(item.name);
    handleClick(item.name);
  };
  return (
    <div className="w-96 pl-8 h-full flex flex-col gap-10 text-left p-2 cursor-pointer bg-[#161616] ronuded-lg">
      <h1 className="text-3xl font-bold text-primaryYellow ml-2 w-full mt-8">
        FinTrack
      </h1>
      <div className="flex flex-col h-full justify-between my-2">
        <div className="flex flex-col gap-5">
          {menu.map((item, index) => {
            const isActive = item.name === activeTab;
            return (
              <span
                key={index}
                onClick={() => handleTabClick(item)}
                className={`p-2 text-lg flex ${
                  isActive
                    ? "bg-[#fffff] rounded-full text-white"
                    : "text-gray-400"
                }`}
              >
                <img src={item.icon} alt="icon" className="h-5 w-5 mr-3 mt-1" />
                {item.name}
              </span>
            );
          })}
        </div>
        <div onClick={() => handleLogout()} className={`p-2 text-xl font-bold flex mb-3`}>
          <img src={logoutIcon} alt="icon" className="h-6 w-6 mr-3 mt-1" />
          <span className="text-[#ff4444]">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
