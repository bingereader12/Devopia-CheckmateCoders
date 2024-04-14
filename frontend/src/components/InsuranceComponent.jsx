import React from "react";

const InsuranceComponent = ({insurance}) => {

  const map ={
    "property":"home.svg",
    "health":"medkit.svg",
    "life":"accessibility.svg",
    "vehicle":"car.svg",
    "other":"documents.svg"
  }
  const startDate = new Date(insurance.startDate);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const endDate = new Date(insurance.endDate);
  const formattedDate1 = endDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="group cursor-pointer border-2 border-primaryGray hover:bg-[#161616] hover:border-[#161616] flex flex-col justify-between rounded-lg p-4 w-96 h-80">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className={`text-4xl group-hover:opacity-100 opacity-80 font-semibold`}>{insurance.name}</div>
          <div className="text-2xl opacity-80 pb-2 font-medium capitalize">({insurance.type})</div>
        </div>
        <img height={40} width={40} src={`/public/icons/${map[insurance.type]}`} alt="" />
      </div>
      <div className="grid opacity-60 grid-cols-2 gap-4">
        <div className="">Start Date</div>
        <div>{formattedDate}</div>
        <div className="">End Date</div>
        <div>{formattedDate1}</div>
        <div className="">Premium Amount</div>
        <div>₹{insurance.premiumAmount}</div>
        <div className="text-lg">Cover Amount</div>
        <div>{insurance.coverAmount}%</div>
      </div>
    </div>
  );
};

export default InsuranceComponent;
