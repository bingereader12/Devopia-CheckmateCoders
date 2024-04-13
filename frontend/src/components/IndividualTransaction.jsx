import React from "react";

const IndividualTransaction = ({ type }) => {
  return (
    <div className="border-2 border-primaryGray rounded-lg p-4 mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-3xl font-medium">
          {type === "Inbound" ? "+" : "-"} ₹100
        </div>
        <div className="text-right text-gray-400"> 08/08/2003 </div>
        <div className="col-span-2 text-gray-400">Dhruv Dedhia - Cash</div>
      </div>
    </div>
  );
};

export default IndividualTransaction;
