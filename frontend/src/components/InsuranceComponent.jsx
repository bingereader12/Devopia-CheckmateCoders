import React from "react";

const InsuranceComponent = () => {

  const map ={
    "property":"home.svg",
    "health":"medkit.svg",
    "life":"accessibility.svg",
    "vehicle":"car.svg",
    "other":"documents.svg"
  }

  return (
    <div className="group cursor-pointer border-2 border-primaryGray hover:bg-[#161616] hover:border-[#161616] flex flex-col justify-between rounded-lg p-4 w-96 h-72">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className={`text-4xl group-hover:opacity-100 opacity-80`}>Insurance Name</div>
          <div className="text-2xl opacity-80">Insurance Type</div>
        </div>
        <img height={40} width={40} src={`/public/icons/${map["other"]}`} alt="" />
      </div>
      <div className="grid opacity-60 grid-cols-2 gap-4">
        <div className="">Start Date</div>
        <div>15th March 2023</div>
        <div className="">End Date</div>
        <div>15th March 2028</div>
        <div className="">Premium Amount</div>
        <div>$10,000</div>
        <div className="text-lg">Cover Amount</div>
        <div>8.5%</div>
      </div>
    </div>
  );
};

export default InsuranceComponent;
