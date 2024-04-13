import React from "react";
import LoanComponent from "./LoanComponent";

const Loans = () => {
  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <h1 className="text-primaryYellow text-4xl font-medium mb-6">Loans</h1>
      <div className="gap-5 flex flex-wrap">
        <LoanComponent />
        <LoanComponent />
        <LoanComponent />
        <LoanComponent />
      </div>
    </section>
  );
};

export default Loans;
