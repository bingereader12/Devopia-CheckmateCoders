import React from "react";
import InsuranceComponent from "./InsuranceComponent";

const Insurance = () => {
  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <h1 className="text-primaryYellow text-4xl font-medium mb-6">Insurance</h1>
      <div className="gap-5 flex flex-wrap">
        <InsuranceComponent />
        <InsuranceComponent />
        <InsuranceComponent />
        <InsuranceComponent />
      </div>
    </section>
  );
};

export default Insurance;
