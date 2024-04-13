import React, { useEffect, useState } from "react";

const IndividualTransaction = ({ type, transaction}) => {
  console.log(transaction)
  const [user, setUser] = useState({});
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
          body: JSON.stringify({ userId:transaction?.from }),
        }
      );
      console.log(res);
      const user1 = await res.json();
      console.log(user1);
      setUser(user1);
    } catch (error) {
      
    }
    }

    fetchUserData();
    return () => {}
  }, [])
  
  return (
    <div className="border-2 border-primaryGray rounded-lg p-4 mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-3xl font-medium">
          {type === "Inbound" ? "+" : "-"} ₹{transaction.amount}
        </div>
        <div className="text-right text-gray-400"> {formatDate(transaction.date)} </div>
        <div className="col-span-2 text-gray-400">{user?.name} - {transaction.paymentMethod}</div>
      </div>
    </div>
  );
};

export default IndividualTransaction;
