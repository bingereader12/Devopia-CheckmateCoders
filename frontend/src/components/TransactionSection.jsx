import React from "react";
import IndividualTransaction from "./IndividualTransaction";

const TransactionSection = ({ type }) => {
  return (
    <div className="border border-primaryGray rounded-lg">
      <span className="text-4xl border-b border-primaryGray p-4 flex items-center">
        {type}
        {type === "Inbound" ? (
          <img src="/icons/inbound.svg" alt="" />
        ) : (
          <img src="/icons/outbound.svg" alt="" />
        )}
      </span>
      <div className="flex flex-col p-4 gap-3">
        <span>
          <IndividualTransaction type={type} />
        </span>
        <span>
          <IndividualTransaction type={type} />
        </span>
        <span>
          <IndividualTransaction type={type} />
        </span>
      </div>
    </div>
  );
};

export default TransactionSection;
