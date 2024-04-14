import React, { useState, useEffect } from "react";
import IndividualTransaction from "./IndividualTransaction";
import Cookies from "js-cookie";

const AllTransactions = ({ type }) => {
  const [inboundTransactions, setInboundTransactions] = useState([]);
  const [outboundTransactions, setOutboundTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/transaction/inbound`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": Cookies.get("token"),
              "x-session-id": Cookies.get("sessionId"),
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setInboundTransactions(data);
        const res1 = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/transaction/outbound`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": Cookies.get("token"),
              "x-session-id": Cookies.get("sessionId"),
            },
          }
        );
        const data1 = await res1.json();
        setOutboundTransactions(data1);
        console.log(data1);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();

    // return () => {};
  }, []);
  return (
    <div className="h-full overflow-y-auto no-scrollbar space-y-10">
      {type === "Inbound" ? (
        <>
          {inboundTransactions.map((trans, key) => {
            return <IndividualTransaction type={type} transaction={trans} />;
          })}
        </>
      ) : (
        <>
          {outboundTransactions.map((trans, key) => {
            return <IndividualTransaction type={type} transaction={trans} />;
          })}
        </>
      )}
    </div>
  );
};

export default AllTransactions;
