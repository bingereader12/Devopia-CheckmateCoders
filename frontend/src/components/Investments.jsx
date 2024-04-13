import React from "react";

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
      "name": "Page A",
      "uv": 4000,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "amt": 2500
    },
    {
      "name": "Page G",
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
          <Tooltip />
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
          <div className="flex flex-row justify-between">
          <h3 className="text-xl font-semibold text-gray-500 pl-4 gap-x-96">All Investments</h3>
          {!showAll && dummyData.length > 2 && (
            <button
              className="mt-1 mx-auto flex hover:bg-gray-500 text-white border border-gray-500 font-bold py-1 px-4 rounded"
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
          <RadialBarChart 
            width={430} 
            height={300} 
            innerRadius="80%" 
            outerRadius="100%" 
            data={data2} 
            startAngle={180} 
            endAngle={0}
          >
            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart',formatter: (value) => `${value} Total`, }} background clockWise={true} dataKey='value'>
            {
                  data1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} style={{borderRadius: '50%'}}/>
                  ))
                }
            </RadialBar>
            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='right' align="right" />
            <Tooltip />
          </RadialBarChart>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Investments;
