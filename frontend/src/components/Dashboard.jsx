import React, { useEffect, useState } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  Label,
  ComposedChart,
  XAxis,
  YAxis,
  Area,
  Bar,
  BarChart,
  Line,
  AreaChart,
  RadialBarChart,
  RadialBar,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
// import RSSParser from 'rss-parser';
import Cookies from 'js-cookie'
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primaryBlack p-3 rounded-md text-center">
        <p className="text-[#ffffff] opacity-50">{`${label}`}</p>
        <p className={`text-[#00d1fe] opacity-90`}>
          Amount: {`${payload[0].value}`}
        </p>
        {/* <p className={`text-[#ff0000] ${payload[0].value>=payload[1].value && "opacity-50"}`}>Outbound: {`${payload[1].value}`}</p> */}
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

const CustomTooltip1 = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primaryBlack p-3 rounded-md text-center">
        <p className="text-[#ffffff] opacity-50">{`${label}`}</p>
        <p className={`text-[#ff0000] opacity-90`}>
          Amount: {`${payload[0].value}`}
        </p>
        {/* <p className={`text-[#ff0000] ${payload[0].value>=payload[1].value && "opacity-50"}`}>Outbound: {`${payload[1].value}`}</p> */}
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

const data = [
  {
    name: "2024-04-07",
    uv: 4000,
    amt: 2400,
  },
  {
    name: "2024-04-08",
    uv: 3000,
    amt: 2210,
  },
  {
    name: "2024-04-09",
    uv: 2000,
    amt: 2290,
  },
  {
    name: "2024-04-10",
    uv: 2780,
    amt: 2000,
  },
  {
    name: "2024-04-11",
    uv: 1890,
    amt: 2181,
  },
  {
    name: "2024-04-12",
    uv: 2390,
    amt: 2500,
  },
  {
    name: "2024-04-13",
    uv: 3490,
    amt: 2100,
  },
];

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [balances, setBalances] = useState([]);
  const [spendings, setSpendings] = useState([{}]);
  const [cash,setCash] = useState([{},{}])
  const [previousDayBalance, setPreviousDayBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [pastSevenDaysBalances,setPastSevenDaysBalances] = useState([{}]);

  data.map((el) => {
    const newD = new Date(el.name);
    el.name = newD.toDateString().substring(4, 10);
  });
  const data1 = [
    {
      name: "Cash",
      value: 1000,
    },
    {
      name: "Cashless",
      value: 3000,
    },
  ];

  const [rssfeed, setRssFeed] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/rss", {
          method: "GET",
        });
        const data = await res.json();
        setRssFeed(data.feed.items);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
        }
      );
      const user1 = await res.json();
      setUser(user1);
      return user1.savings;
      // console.log(user1);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    const showGraph = async() => {
      const savings = await fetchUserData();
      // console.log("savings",savings)
      fetchPastSevenDaysBalances(savings);
      fetchSpendings()
      fetchCash()
    }

    showGraph()

    return () => {};
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const date1 = new Date().toISOString();
        // console.log(date1);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transaction/transactionDay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
          body: JSON.stringify({ date: date1 }),
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data.transactions);
          setBalances(data.balances);
          setPreviousDayBalance(data.previousDayBalance);
          // console.log(data);
        } else {
          // Handle error response
          console.error("Error fetching transactions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();

    return () => {};
  }, []);

  const fetchSpendings = async() => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transaction/outboundSevenDays`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": Cookies.get("token"),
        "x-session-id": Cookies.get("sessionId"),
      }
    });
    const data = await response.json()
    data.map((el) => {
      const newD = new Date(el.name);
      el.name = newD.toDateString().substring(4, 10);
    });
    setSpendings(data)
  }

  const fetchCash = async() => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transaction/cashTrans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": Cookies.get("token"),
        "x-session-id": Cookies.get("sessionId"),
      }
    });
    const data = await response.json()
    // console.log(data)
    setCash([{
      name: "Cash",
      value: data.cashSum,
    },
    {
      name: "Cashless",
      value: data.cashlessSum,
    }])
  }

  const fetchPastSevenDaysBalances = async (savings) => {
    // console.log(savings)
    var previousDayBalance = savings
    var pastSevenDaysBalances1 = []
    // Loop through the last 7 days
    for (let i = 1; i <= 7; i++) {
      const date2 = new Date(Date.now() - 24*60*60*1000*(i-2));
      const date = new Date(Date.now() - 24*60*60*1000*(i-1));
      // date.setDate();
      // console.log(date)
      
      try {
        const formattedDate = date.toISOString();
        // console.log(formattedDate)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transaction/transactionSevenDays`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
          body: JSON.stringify({ date: formattedDate ,date1: date2}),
        });
  
        if (response.ok) {
          const data = await response.json();
          // console.log(data)
          // const balance = calculateBalance(data.transactions, data.previousDayBalance);
          // console.log(data.inBoundAmount,data.outBoundAmount)
          const balance = previousDayBalance - data.inBoundAmount + data.outBoundAmount;
          // console.log(balance)
          pastSevenDaysBalances1.push({ name: date, amt: balance });
          previousDayBalance = balance
        } else {
          // Handle error response
          console.error(`Error fetching transactions for : ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching transactions for ${error}`);
      }
    }
    pastSevenDaysBalances1.map((el) => {
      const newD = new Date(el.name);
      el.name = newD.toDateString().substring(4, 10);
    });
    pastSevenDaysBalances1.reverse()
    setPastSevenDaysBalances(pastSevenDaysBalances1)
  
    // Now pastSevenDaysBalances contains balances for the last 7 days
    // console.log("Past 7 days balances:", pastSevenDaysBalances);
  };
  
  const calculateBalance = (transactions, previousDayBalance) => {
    let inboundAmount = 0;
    let outboundAmount = 0;
  
    transactions.forEach(transaction => {
      if (transaction.to === userId) {
        inboundAmount += transaction.amount;
      } else if (transaction.from === userId) {
        outboundAmount += transaction.amount;
      }
    });
  
    return previousDayBalance + inboundAmount - outboundAmount;
  };
  

  const colors = ["#303450", "#ffb800"];
  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <div className="flex flex-col w-full gap-4 mt-2">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-4xl font-bold pb-5 text-primaryYellow">
            Hello {user.fname}
          </h1>
          <h1 className="text-3xl font-bold pb-5 text-[#00ff00]">
            Networth: <span className="text-gray-400">₹{user.netWorth}</span>
          </h1>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col w-[70%] h-fit border-2 border-[#414141] rounded-lg py-3">
            <div className="flex w-full">
              <h3 className="w-full font-semibold text-lg pl-8 p-2 text-gray-400 pb-5">
                Balance:{" "}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                width={730}
                data={pastSevenDaysBalances}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d1fe" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00d1fe" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stroke="#00d1fe"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col w-[30%] border-2 border-[#414141] rounded-lg py-3">
            <h3 className="font-semibold text-lg text-gray-400 pl-3 flex">
              Cash Vs Cashless
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {/* Render your graph based on selectedInvestment.graphData */}
              {/* Example: selectedInvestment.graphData*/}
              {/* <h1>{selectedInvestment ? selectedInvestment.percentage : 'XX%'}</h1> */}
              <PieChart>
                <Tooltip contentStyle={{ color: "black" }} />
                <Pie
                  data={cash}
                  cx="50%"
                  cy="50%"
                  stroke="transparent"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={-10}
                  cornerRadius={10}
                  className="border-black"
                >
                  {cash.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index]}
                      style={{ borderRadius: "50%" }}
                    />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col w-[70%] h-fit border-2 border-[#414141] rounded-lg py-3">
            <div className="flex w-full">
              <h3 className="w-full font-semibold text-lg pl-8 p-2 text-gray-400 pb-5">
                Monthly Spending:{" "}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                width={730}
                data={spendings}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="coloruv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff0000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip1 />} />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stroke="#ff0000"
                  fillOpacity={1}
                  fill="url(#coloruv)"
                />
                <ReferenceLine
                  y={2000}
                  stroke="white"
                  strokeWidth={3}
                  strokeDasharray="3 3"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col h-[335px] overflow-y-scroll no-scrollbar w-[30%] border-2 border-[#414141] rounded-lg py-3 px-2">
            <h3 className="font-semibold text-lg text-white pl-3 flex mb-1">
              News Feed
            </h3>
            {rssfeed?.map((item, index) => (
              <div
                key={index}
                className="border-2 border-[#222222] rounded-lg py-3 px-4 mb-3 bg-primaryBlack transition duration-300"
              >
                <img
                  src={item.media_content[0].$.url}
                  alt={item.title}
                  className="mb-2 rounded-lg"
                />
                <h3 className="font-semibold text-lg text-white mb-1">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.contentSnippet.split(" ").slice(0, 25).join(" ")}...
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline mt-2"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col w-[70%] h-fit border-2 border-[#414141] rounded-lg py-3">
            <div className="flex w-full">
              <h3 className="w-full font-semibold text-xl pl-4 text-gray-400 pb-5">
                Today's Transactions
              </h3>
            </div>
            <h3 className="w-[80%] font-medium text-md text-gray-500 flex flex-row justify-between pl-4">
              <span className="flex flex-row items-center w-[50%] text-xl">
                <img src="/icons/inbound.svg" alt="" />
                <h4 className="flex">Inbound: ₹300</h4>
              </span>
              <span className="flex flex-row items-center w-[50%] text-xl">
                <img src="/icons/outbound.svg" alt="" />
                <h4 className="flex">Outbound: ₹300</h4>
              </span>
            </h3>
          </div>
          <div className="flex flex-col w-[30%] border-2 border-[#414141] rounded-lg py-3">
            <span className="font-semibold text-lg text-gray-400 pl-3 flex">
              <h3 className="font-semibold text-gray-400 ">
                Wealth Health: good
              </h3>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
