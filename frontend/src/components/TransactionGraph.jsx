import React from "react";
import { Tooltip ,ResponsiveContainer,Cell, PieChart, Pie, Legend, Label,ComposedChart,XAxis,YAxis,Area,Bar,BarChart, Line, AreaChart, RadialBarChart, RadialBar} from 'recharts';

const data = [
  {
    name: "7-04-2024",
    outbound: 3000,
    inbound: 1398,
    amt: 2210,
  },
  {
    name: "8-04-2024",
    outbound: 2000,
    inbound: 9800,
    amt: 2290,
  },
  {
    name: "9-04-2024",
    outbound: 2780,
    inbound: 3908,
    amt: 2000,
  },
  {
    name: "10-04-2003",
    outbound: 1890,
    inbound: 4800,
    amt: 2181,
  },
  {
    name: "11-04-2024",
    outbound: 4000,
    inbound: 2400,
    amt: 2400,
  },
  {
    name: "12-04-2024",
    outbound: 2390,
    inbound: 3800,
    amt: 2500,
  },
  {
    name: "13-04-2024",
    outbound: 3490,
    inbound: 4300,
    amt: 2100,
  },
];

export default function TransactionGraph() {
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
    <AreaChart width={730} height={250} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#00ff00" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="outbound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Legend/>
      <Tooltip />
      <Area type="monotone" dataKey="inbound" stroke="#00ff00" fillOpacity={1} fill="url(#inbound)" />
      <Area type="monotone" dataKey="outbound" stroke="#ff0000" fillOpacity={1} fill="url(#outbound)" />
    </AreaChart>
  );
}
