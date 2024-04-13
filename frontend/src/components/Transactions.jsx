import React, { useEffect, useState } from "react";
import TransactionSection from "./TransactionSection";
import TransactionGraph from "./TransactionGraph";
import Cookies from 'js-cookie'
const Transactions = ({ handleClick }) => {
  const [inboundTransactions, setInboundTransactions] = useState([]);
  const [outboundTransactions, setOutboundTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transaction/inbound`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
        });
        const data = await res.json();
        console.log(data);
        setInboundTransactions(data);
        const res1 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transaction/outbound`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
        });
        const data1 = await res1.json();
        setOutboundTransactions(data1);
        console.log(data1)
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <h1 className="text-primaryYellow text-4xl font-medium px-5">
        Transactions
      </h1>
      <div className="px-5 space-y-10 w-fit">
        <div className="py-5 mt-10 border rounded-lg pl-10">
          <h3 className="text-lg text-gray-500 font-bold pb-4">Transaction history</h3>
          <TransactionGraph inboundTransactions={inboundTransactions} outboundTransactions={outboundTransactions}/>
        </div>
        <div>
          <TransactionSection type="Inbound" handleClick={handleClick} transactions={inboundTransactions}/>
        </div>
        <div>
          <TransactionSection type="Outbound" handleClick={handleClick} transactions={outboundTransactions} />
        </div>
      </div>
    </section>
  );
};

export default Transactions;
