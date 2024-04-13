import React from "react";
import IndividualTransaction from "./IndividualTransaction";

const AllTransactions = ({ type }) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar space-y-10">
      <IndividualTransaction type={type} />
      <IndividualTransaction type={type} />
      <IndividualTransaction type={type} />
      <IndividualTransaction type={type} />
      <IndividualTransaction type={type} />
      <IndividualTransaction type={type} />
    </div>
  );
};

export default AllTransactions;
