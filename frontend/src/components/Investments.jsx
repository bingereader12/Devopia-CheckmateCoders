import React, { useState } from "react";
import { Tooltip ,ResponsiveContainer,Cell, PieChart, Pie, Legend, Label,ComposedChart,XAxis,YAxis,Area,Bar,BarChart, Line, AreaChart, RadialBarChart, RadialBar} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primaryBlack p-3 rounded-md text-center">
        <p className="text-[#ffffff] opacity-50">{`${label}`}</p>
        <p className={`text-[#FFB800] opacity-90`}>Inbound: ₹{`${payload[0].value}`}</p>
        {/* <p className={`text-[#ff0000] ${payload[0].value>=payload[1].value && "opacity-50"}`}>Outbound: {`${payload[1].value}`}</p> */}
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

const IndividualInvestment = ({ type , name, date,currentValue,initialValue}) => {
  return (
    <div className="border-t-2 border-primaryGray p-4 mx-auto flex w-full">
        <div className="flex flex-col w-full">
          <div className="font-medium flex justify-between mb-1 align-text-bottom">
            <div><span className="opacity-80 text-xl">{name}</span> <span className="opacity-40 text-md">(Type: {type})</span></div>
            <div className="text-right text-[#fff] opacity-60 text-lg font-medium">Start Date: {date.toLocaleDateString()}</div>
          </div>
          <div className="flex justify-between">
            <div className={`col-span-2 opacity-80 text-lg ${currentValue>initialValue ? "text-[#00ff00]" : "text-[#ff0000]"}`}>Current Value: ₹{currentValue}</div>
            <div className="col-span-2 text-[#fff] opacity-60 text-lg font-medium">Initial Value: ₹{initialValue}</div>
          </div>
      </div>
    </div>
  );
};

const Investments = () => {
  const [showAll, setShowAll] = useState(false);
  const handleShowMore = () => {
    setShowAll(true);
  };

  const dummyData = [
    {
      type: 'Mutual Fund',
      name: 'HDFC Top 200 Fund',
      date: new Date(2022, 2, 15), // March 15, 2022
      currentValue: 50000,
      initialValue: 40000
    },
    {
      type: 'Stocks',
      name: 'Reliance Industries Ltd.',
      date: new Date(2021, 9, 1), // October 1, 2021
      currentValue: 75000,
      initialValue: 60000
    },
    {
      type: 'Fixed Deposit',
      name: 'ICICI Bank FD',
      date: new Date(2020, 5, 20), // June 20, 2020
      currentValue: 25000,
      initialValue: 20000
    },
    {
      type: 'Real Estate',
      name: 'Residential Property',
      date: new Date(2018, 11, 10), // December 10, 2018
      currentValue: 1000000,
      initialValue: 800000
    },
    {
      type: 'Cryptocurrency',
      name: 'Bitcoin',
      date: new Date(2021, 3, 1), // April 1, 2021
      currentValue: 150000,
      initialValue: 100000
    }
  ];
  const data = [
    {
      name: "2024-04-07",
      "uv": 4000,
      "amt": 2400
    },
    {
      name: "2024-04-08",
      "uv": 3000,
      "amt": 2210
    },
    {
      name: "2024-04-09",
      "uv": 2000,
      "amt": 2290
    },
    {
      name: "2024-04-10",
      "uv": 2780,
      "amt": 2000
    },
    {
      name: "2024-04-11",
      "uv": 1890,
      "amt": 2181
    },
    {
      name: "2024-04-12",
      "uv": 2390,
      "amt": 2500
    },
    {
      name: "2024-04-13",
      "uv": 3490,
      "amt": 2100
    }
  ]
  const data1 = [
    {
      "name": "Real Estate",
      "value": 1000
    },
    {
      "name": "Real Estate",
      "value": 1000
    },
    {
      "name": "Real Estate",
      "value":  2000
    },
  ];

  data.map((el)=>{
    const newD = new Date(el.name);
    el.name = newD.toDateString().substring(4,10)
  })

  const data2 =[ 
      {
        "name": "18-24",
        "uv": 31.47,
        "pv": 2400,
        "fill": "#8884d8"
      },
  ];
  const colors = ['#303450', '#bcc1cd', '#ffb800'];
  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <h1 className="text-primaryYellow text-4xl font-medium">Investments</h1>
      <div className="flex flex-col w-full gap-4 mt-2">
      <div className="flex flex-row w-full gap-4">
        <div className="flex flex-col w-[70%] h-fit border rounded-lg py-3">
          <div className="flex w-full">
          <h3 className="w-full font-semibold text-lg pl-8 p-2 text-gray-400">Investments growth overtime</h3>
          </div>
        <ResponsiveContainer width="100%" height={250}>
        <AreaChart width={730} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFB800" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FFB800" stopOpacity={0}/>
            </linearGradient>
          </defs >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="uv" stroke="#FFB800" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
        </ResponsiveContainer>
        </div>
        <div className="flex flex-col w-[30%] h-80 border rounded-lg py-3">
          <h3 className="font-semibold text-lg text-gray-400 pl-3 flex">Investment Balance</h3>
          <ResponsiveContainer width="100%" height={250}>
            {/* Render your graph based on selectedInvestment.graphData */}
            {/* Example: selectedInvestment.graphData*/}
            {/* <h1>{selectedInvestment ? selectedInvestment.percentage : 'XX%'}</h1> */}
            <PieChart >
            <Tooltip contentStyle={{ color: "black" }}/>
              <Pie data={data1} cx="50%" cy="50%" stroke="transparent" innerRadius={60} outerRadius={80} paddingAngle={-10} cornerRadius={10} className="border-black">
                {
                  data1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} style={{borderRadius: '50%'}}/>
                  ))
                }
              </Pie>
              <Legend iconType='circle' align="right" verticalAlign="middle" layout="vertical"  />
              
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-row w-full gap-4">
        <div className="flex flex-col w-[70%] h-auto border rounded-lg">
          <div className="flex flex-row justify-between my-2">
          <h3 className="text-xl font-semibold text-[#fff] opacity-60 pl-4 py-1 my-1 mx-2">All Investments</h3>
          {!showAll && dummyData.length > 2 && (
            <button
              className="my-1 mr-4 flex hover:border-[#666] text-[#666666] border border-[#333] font-bold py-1 px-4 rounded"
              onClick={handleShowMore}
            >
            Show More
            </button>
        )}
          </div>
        {dummyData.slice(0, showAll ? dummyData.length : 2).map((investment, index) => (
            <IndividualInvestment
              key={index}
              type={investment.type}
              name={investment.name}
              date={investment.date}
              currentValue={investment.currentValue}
              initialValue={investment.initialValue}
            />
          ))}
        </div>
        <div className="flex w-[30%] h-64 border rounded-lg">
        <ResponsiveContainer width="100%" height={250}>
            {/* Render your graph based on selectedInvestment.graphData */}
            {/* Example: selectedInvestment.graphData*/}
            {/* <h1>{selectedInvestment ? selectedInvestment.percentage : 'XX%'}</h1> */}
            <PieChart >
            <Tooltip contentStyle={{ color: "black" }}/>
              <Pie data={data1} cx="50%" cy="50%" stroke="transparent" endAngle={180} innerRadius={60} outerRadius={80} paddingAngle={-10} cornerRadius={10} className="border-black">
                {
                  data1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} style={{borderRadius: '50%'}}/>
                  ))
                }
              </Pie>
              <Legend iconType='circle' align="bottom" layout="horizontal"  />
              
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Investments;
