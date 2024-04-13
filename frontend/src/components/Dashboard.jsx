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

const Dashboard = () => {
  const [feedItems, setFeedItems] = useState([]);
  // const parser = new RSSParser();

  // useEffect(() => {
  //   // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // Use a CORS proxy to fetch RSS feed data

  //   const fetchFeed = async () => {
  //     try {
  //       const feed = await parser.parseURL(`https://www.business-standard.com/rss/finance/personal-finance-10313.rss`);
  //       console.log(feed);
  //       setFeedItems(feed.items);
  //     } catch (error) {
  //       console.error('Error fetching RSS feed:', error);
  //     }
  //   };

  //   fetchFeed();
  // }, []);
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
        console.log(data);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const colors = ["#303450", "#ffb800"];
  return (
    <div className="overflow-y-auto h-full no-scrollbar">
      <div className="flex flex-col w-full gap-4 mt-2">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-4xl font-bold pb-5 text-primaryYellow">
            Hello User
          </h1>
          <h1 className="text-3xl font-bold pb-5 text-[#00ff00]">
            Networth: <span className="text-gray-400">₹100000</span>
          </h1>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col w-[70%] h-fit border rounded-lg py-3">
            <div className="flex w-full">
              <h3 className="w-full font-semibold text-lg pl-8 p-2 text-gray-400 pb-5">
                Balance:{" "}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                width={730}
                data={data}
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
                  dataKey="uv"
                  stroke="#00d1fe"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col w-[30%] border rounded-lg py-3">
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
                  data={data1}
                  cx="50%"
                  cy="50%"
                  stroke="transparent"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={-2}
                  cornerRadius={10}
                  className="border-black"
                >
                  {data1.map((entry, index) => (
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
          <div className="flex flex-col w-[70%] h-fit border rounded-lg py-3">
            <div className="flex w-full">
              <h3 className="w-full font-semibold text-lg pl-8 p-2 text-gray-400 pb-5">
                Monthly Spending:{" "}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                width={730}
                data={data}
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
                  dataKey="uv"
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
          <div className="flex flex-col h-80 overflow-y-scroll no-scrollbar w-[30%] border rounded-lg py-3 px-2">
            <h3 className="font-semibold text-lg text-white pl-3 flex mb-1">
              News Feed
            </h3>
            {rssfeed?.map((item, index) => (
              <div
                key={index}
                className="border-2 border-primaryGray rounded-lg py-3 px-4 mb-3 bg-primaryBlack transition duration-300"
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
          <div className="flex flex-col w-[70%] h-fit border rounded-lg py-3">
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
          <div className="flex flex-col w-[30%] border rounded-lg py-3">
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
