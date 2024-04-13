import React from "react";

const Investments = () => {
  return (
    <>
      <h1 className="text-primaryYellow text-4xl font-medium">Investments</h1>
      <div className="flex flex-col w-full gap-4 mt-10">
      <div className="flex flex-row w-full gap-4">
        <div className="flex w-[70%] h-32 border rounded-lg"></div>
        <div className="flex w-[30%] h-32 border rounded-lg"></div>
      </div>
      <div className="flex flex-row w-full gap-4">
        <div className="flex w-[70%] h-32 border rounded-lg"></div>
        <div className="flex w-[30%] h-32 border rounded-lg"></div>
      </div>
      </div>
    </>
  );
};

export default Investments;
