import React, { useEffect, useState } from "react";
import LoanComponent from "./LoanComponent";
import Cookies from 'js-cookie';
const Loans = () => {
  const [openModal, setOpenModal] = useState(false);
  const[data,setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/loan/getloan`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
        }
      );
      const user1 = await res.json();
      console.log(user1.message);
      setData(user1.message);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-primaryYellow text-4xl font-medium">Loans</h1>
        <button
          className="text-white text-2xl mr-10 border border-primaryGray py-2 px-5 rounded-lg bg-primaryYellow"
          onClick={() => setOpenModal(true)}
        >
          Add Loan
        </button>
        {openModal && <FormModal setOpenModal={setOpenModal} />}
      </div>
      <div className="gap-5 flex flex-wrap">
      {data.map((loan, index) => (
        <LoanComponent key={index} loan={loan} />
      ))}
      </div>
    </section>
  );
};
const FormModal = ({ setOpenModal }) => {
  var [formData, setFormData] = useState({
    name: "",
    type: "",
    startDate: "",
    amount: 0,
    rateOfInterest: 0,
  });

  function handleChange(event) {
    var { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] font-QuickSand font-medium z-50">
      <div className="bg-primaryBlack shadow-boxShadow rounded-lg w-[650px] px-5 ">
        <div className="text-4xl p-4 flex items-center justify-between bg-darkOrange text-white rounded-t-lg">
          Add Loan
          <div>
            <div
              className="cursor-pointer text-4xl"
              onClick={() => setOpenModal(false)}
            ></div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mx-4 my-5">
            <label htmlFor="name" className="block text-gray-300 text-3xl mb-2">
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              value={formData.name}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mx-4 my-5">
            <label htmlFor="type" className="block text-gray-300 text-3xl mb-2">
              Type
            </label>
            <div className="relative">
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="shadow border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
                required
              >
                <option value="">Select Type</option>
                <option value="home">Home</option>
                <option value="student">Student</option>
                <option value="personal">Personal</option>
                <option value="vehicle">Vehicla</option>
                <option value="gold">Gold</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mx-4 my-5">
            <label
              htmlFor="startDate"
              className="block text-gray-300 text-3xl mb-2"
            >
              Start Date
            </label>
            <input
              name="startDate"
              type="date"
              id="startDate"
              value={formData.startDate}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mx-4 my-5">
            <label
              htmlFor="amount"
              className="block text-gray-300 text-3xl mb-2"
            >
              Amount
            </label>
            <input
              name="amount"
              type="number"
              id="amount"
              value={formData.amount}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mx-4 my-5">
            <label
              htmlFor="rateOfInterest"
              className="block text-gray-300 text-3xl mb-2"
            >
              Rate of Interest
            </label>
            <input
              name="rateOfInterest"
              type="number"
              id="rateOfInterest"
              value={formData.rateOfInterest}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="block border border-gray-200 my-8 mx-4"></div>
          <div className="flex items-center justify-end gap-5 px-4 py-2">
            <button
              className="text-2xl border border-gray rounded-md px-4 py-2"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-2xl bg-darkOrange border border-darkOrange text-white rounded-md px-4 py-2 tracking-wider"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loans;
