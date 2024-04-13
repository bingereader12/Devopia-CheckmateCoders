import React from "react";
import TransactionSection from "./TransactionSection";
import TransactionGraph from "./TransactionGraph";

const Transactions = ({ handleClick }) => {
  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <h1 className="text-primaryYellow text-4xl font-medium px-5">
        Transactions
      </h1>
      <div className="px-5 space-y-10 w-fit">
        <div className="py-5 mt-10 border rounded-lg pl-10">
          <h3 className="text-lg text-gray-500 font-bold pb-4">Transcation history</h3>
          <TransactionGraph />
        </div>
        <div>
          <TransactionSection type="Inbound" handleClick={handleClick} />
        </div>
        <div>
          <TransactionSection type="Outbound" handleClick={handleClick} />
        </div>
      </div>
    </section>
  );
};

export default Transactions;
