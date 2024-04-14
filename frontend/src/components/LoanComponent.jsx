import React from "react";

const LoanComponent = ({loan}) => {

  const map ={
    "home":"home.svg",
    "student":"school.svg",
    "personal":"accessibility.svg",
    "vehicle":"car.svg",
    "gold":"cash.svg",
    "other":"documents.svg"
  }

  const startDate = new Date(loan.startDate);
const formattedDate = startDate.toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
  return (
    <div className="group cursor-pointer border-2 border-primaryGray hover:bg-[#161616] hover:border-[#161616] flex flex-col justify-between rounded-lg p-4 w-96 h-72">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className={`text-4xl group-hover:opacity-100 opacity-80`}>{loan.name}</div>
          <div className="text-2xl opacity-80">{loan.type}</div>
        </div>
        <img height={40} width={40} src={`/public/icons/${map["other"]}`} alt="" />
      </div>
      <div className="grid opacity-60 grid-cols-2 gap-4">
        <div className="">Start Date</div>
        <div>{formattedDate}</div>
        {/* <div className="">End Date</div>
        <div>{loan.endDate}</div> */}
        <div className="">Amount</div>
        <div>₹{loan.amount}</div>
        <div className="">Rate of Interest</div>
        <div>{loan.rateOfInterest}</div>
      </div>
    </div>
  );
};

export default LoanComponent;
