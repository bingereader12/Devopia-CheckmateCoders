import React from "react";
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
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primaryBlack p-3 rounded-md text-center">
        <p className="text-[#ffffff] opacity-50">{`${label}`}</p>
        <p
          className={`text-[#00ff00] ${
            payload[1].value >= payload[0].value && "opacity-50"
          }`}
        >
          Inbound: ₹{`${payload[0].value}`}
        </p>
        <p
          className={`text-[#ff0000] ${
            payload[0].value >= payload[1].value && "opacity-50"
          }`}
        >
          Outbound: ₹{`${payload[1].value}`}
        </p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

export default function TransactionGraph({ transactions }) {
  
  // const chartData = Object.values(data);
  // console.log("chartdata", chartData);
  return (
    // <LineChart width={700} height={300} data={data}>
    //   {/* <CartesianGrid strokeDasharray="3 3" /> */}
    //   <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
    //   <YAxis />
    //   <Tooltip />
    //   <Legend />
    //   <Line type="monotone" dataKey="inbound" stroke="#00ff00" />
    //   <Line type="monotone" dataKey="outbound" stroke="#ff0000" />
    // </LineChart>
    <AreaChart
      width={730}
      height={250}
      data={transactions}
      margin={{ top: 10, right: 50, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#00ff00" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="outbound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ff0000" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Legend />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="inbound"
        stroke="#00ff00"
        fillOpacity={1}
        fill="url(#inbound)"
      />
      <Area
        type="monotone"
        dataKey="outbound"
        stroke="#ff0000"
        fillOpacity={1}
        fill="url(#outbound)"
      />
    </AreaChart>
  );
}
