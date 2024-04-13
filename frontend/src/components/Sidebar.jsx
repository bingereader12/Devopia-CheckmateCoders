import React from "react";

const Sidebar = ({ handleClick }) => {
  const menu = ["Savings", "Transactions", "Investments", "Loans", "Insurance"];
  return (
    <div className="w-72 border h-full flex flex-col gap-10 text-center p-2">
      <h1>Finance App</h1>
      <div className="flex flex-col gap-5">
        {menu.map((item) => {
          return (
            <span
              onClick={() => handleClick(item)}
              className="p-2 text-lg border"
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
