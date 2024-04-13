import React, { useState } from "react";
import savingsIcon from "../../public/icons/wallet.svg";
import transactionsIcon from "../../public/icons/card.svg";
import investmentsIcon from "../../public/icons/bar-chart.svg";
import loansIcon from "../../public/icons/wallet.svg";
import insuranceIcon from "../../public/icons/folder.svg";

const Sidebar = ({ handleClick }) => {
  const menu = [
    { name: "Dashboard", icon: savingsIcon },
    { name: "Savings", icon: savingsIcon },
    { name: "Transactions", icon: transactionsIcon },
    { name: "Investments", icon: investmentsIcon },
    { name: "Loans", icon: loansIcon },
    { name: "Insurance", icon: insuranceIcon },
  ];
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (item) => {
    setActiveTab(item.name);
    handleClick(item.name);
  };
  return (
    <div className="w-96 pl-8 h-full flex flex-col gap-10 text-center p-2 cursor-pointer bg-[#161616] ronuded-lg">
      <h1 className="text-3xl font-bold text-primaryYellow w-full mt-3">Finance App</h1>
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
    </div>
  );
};

export default Sidebar;
