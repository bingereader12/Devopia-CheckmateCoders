import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
    <LineChart width={700} height={300} data={data}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="inbound" stroke="#00ff00" />
      <Line type="monotone" dataKey="outbound" stroke="#ff0000" />
    </LineChart>
  );
}
