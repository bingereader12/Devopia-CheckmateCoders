import React from "react";
import IndividualTransaction from "./IndividualTransaction";

const TransactionSection = ({ type, handleClick ,transactions}) => {
  console.log('transactions from section',transactions)
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
      {transactions && transactions.map((transaction, index) => (
          <span key={index}>
            <IndividualTransaction type={type} transaction={transaction} />
          </span>
        ))}
        <span
          className="text-gray-400 cursor-pointer px-1"
          onClick={() => handleClick(type)}
        >
          See More
        </span>
      </div>
    </div>
  );
};

export default TransactionSection;
