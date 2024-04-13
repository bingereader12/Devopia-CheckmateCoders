import React from "react";

const LoanComponent = () => {
  return (
    <div className="border-2 border-primaryGray flex flex-col justify-between rounded-lg p-4 w-96 h-72">
      <div className="space-y-2">
        <div className="text-4xl">Loan Name</div>
        <div className="text-2xl">Loan Type</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="">Start Date</div>
        <div>15th March 2023</div>
        <div className="">End Date</div>
        <div>15th March 2028</div>
        <div className="">Amount</div>
        <div>$10,000</div>
        <div className="">Rate of Interest</div>
        <div>8.5%</div>
      </div>
    </div>
  );
};

export default LoanComponent;
