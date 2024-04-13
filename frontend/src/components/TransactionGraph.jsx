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
    inbound: 3000,
    outbound: 1398,
    amt: 2210,
  },
  {
    name: "8-04-2024",
    inbound: 2000,
    outbound: 9800,
    amt: 2290,
  },
  {
    name: "9-04-2024",
    inbound: 2780,
    outbound: 3908,
    amt: 2000,
  },
  {
    name: "10-04-2003",
    inbound: 1890,
    outbound: 4800,
    amt: 2181,
  },
  {
    name: "11-04-2024",
    inbound: 4000,
    outbound: 2400,
    amt: 2400,
  },
  {
    name: "12-04-2024",
    inbound: 2390,
    outbound: 3800,
    amt: 2500,
  },
  {
    name: "13-04-2024",
    inbound: 3490,
    outbound: 4300,
    amt: 2100,
  },
];

export default function TransactionGraph() {
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="outbound" stroke="#00ff00" />
      <Line type="monotone" dataKey="inbound" stroke="#ff0000" />
    </LineChart>
  );
}
