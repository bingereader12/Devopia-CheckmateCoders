import React, { useEffect, useState } from "react";
import TransactionSection from "./TransactionSection";
import TransactionGraph from "./TransactionGraph";
import Cookies from 'js-cookie'

const data = [
  {
    name: "2024-04-08",
    outbound: 3000,
    inbound: 1398,
    amt: 2210,
  },
  {
    name: "2024-04-09",
    outbound: 2000,
    inbound: 9800,
    amt: 2290,
  },
  {
    name: "2024-04-10",
    outbound: 2780,
    inbound: 3908,
    amt: 2000,
  },
  {
    name: "2024-04-11",
    outbound: 1890,
    inbound: 4800,
    amt: 2181,
  },
  {
    name: "2024-04-12",
    outbound: 4000,
    inbound: 2400,
    amt: 2400,
  },
  {
    name: "2024-04-13",
    outbound: 2390,
    inbound: 3800,
    amt: 2500,
  },
  {
    name: "2024-04-14",
    outbound: 3490,
    inbound: 4300,
    amt: 2100,
  },
];

data.map((el)=>{
  const newD = new Date(el.name);
  el.name = newD.toDateString().substring(4,10)
})

const Transactions = ({ handleClick }) => {
  const [inboundTransactions, setInboundTransactions] = useState([]);
  const [outboundTransactions, setOutboundTransactions] = useState([]);
  const [pastSevenDaysBalances, setPastSevenDaysBalances] = useState(data);
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

    const fetchPastSevenDaysBalances = async () => {
      var pastSevenDaysBalances1 = []
      // Loop through the last 7 days
      for (let i = 1; i <= 7; i++) {
        const date2 = new Date(Date.now() - 24*60*60*1000*(i-1));
        const date = new Date(Date.now() - 24*60*60*1000*(i));
        // date.setDate();
        console.log(date)
        
        try {
          const formattedDate = date.toISOString();
          console.log(formattedDate)
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
            console.log(data)
            // const balance = calculateBalance(data.transactions, data.previousDayBalance);
            console.log(data.inBoundAmount,data.outBoundAmount)
            pastSevenDaysBalances1.push({ name: date2, inbound: data.inBoundAmount, outbound: data.outBoundAmount });
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
      console.log("Past 7 days balances:", pastSevenDaysBalances);
    };

    fetchData();
    fetchPastSevenDaysBalances()

    // return () => {};
  }, []);
  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <h1 className="text-primaryYellow text-4xl font-medium px-5">
        Transactions
      </h1>
      <div className="px-5 space-y-10 w-fit">
        <div className="py-5 mt-10 border-2 border-[#414141] rounded-lg pl-10">
          <h3 className="text-lg text-gray-500 font-bold pb-4">Transaction history</h3>
          <TransactionGraph transactions={pastSevenDaysBalances}/>
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
