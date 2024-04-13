import React from "react";
import TransactionSection from "./TransactionSection";

const Transactions = () => {
  return (
    <>
      <h1 className="text-primaryYellow text-4xl font-medium">Transactions</h1>
      <div className="border w-full h-full px-5 ">
        <div>Graph</div>
        <div>
          <TransactionSection type="Inbound" />
        </div>
        <div>
          <TransactionSection type="Outbound" />
        </div>
      </div>
    </>
  );
};

export default Transactions;
