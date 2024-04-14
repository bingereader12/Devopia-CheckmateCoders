import React, { useEffect, useState } from "react";
import InsuranceComponent from "./InsuranceComponent";
import Cookies from "js-cookie";
const Insurance = () => {
  const [openModal, setOpenModal] = useState(false);
  const[data,setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/insurance/getinsurance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": Cookies.get("token"),
            "x-session-id": Cookies.get("sessionId"),
          },
        }
      );
      const user1 = await res.json();
      console.log('users',user1.message);
      setData(user1.message);
      } catch (error) {
        console.error("Error fetching insurance feed:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-primaryYellow text-4xl font-medium">Insurance</h1>
        <button
          className="text-black font-semibold text-2xl mr-10 border border-primaryGray py-2 px-5 rounded-lg bg-primaryYellow"
          onClick={() => setOpenModal(true)}
        >
          Add Insurance
        </button>
        {openModal && <FormModal setOpenModal={setOpenModal} />}
      </div>
      <div className="gap-5 flex flex-wrap">
      {data.map((insurance, index) => (
        <InsuranceComponent key={index} insurance={insurance}/>
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
    endDate: "",
    premiumAmount: 0,
    coverAmount: 0,
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

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/insurance/postinsurance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": Cookies.get("token"),
          "x-session-id": Cookies.get("sessionId"),

        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      alert("Insurance added successfully");
      setOpenModal(false);
    }
    else if (response.status == 400) {
      alert("error in request");
    } else {
      const error = await response.json();
      console.error(error.message);
      // Handle error, e.g., show a message to the user
    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] font-QuickSand font-medium z-50">
      <div className="bg-primaryBlack shadow-boxShadow rounded-lg w-[650px] h-[70%] overflow-y-auto no-scrollbar px-5 ">
      <div className="text-4xl pt-8 flex items-center justify-between bg-darkOrange text-primaryYellow rounded-t-lg">
          Add Insurance
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mx-4 my-5">
            <label htmlFor="name" className="block text-gray-400 text-3xl mb-2">
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              value={formData.name}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-gray-400 text-2xl"
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
                className="shadow border p-2 w-full rounded bg-primaryBlack outline-none text-gray-400 text-2xl"
                required
              >
                <option value="">Select Type</option>
                <option value="property">Property</option>
                <option value="health">Health</option>
                <option value="life">Life</option>
                <option value="vehicle">Vehicle</option>
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
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-gray-400 text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mx-4 my-5">
            <label
              htmlFor="endDate"
              className="block text-gray-300 text-3xl mb-2"
            >
              End Date
            </label>
            <input
              name="endDate"
              type="date"
              id="endDate"
              value={formData.endDate}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-gray-400 text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mx-4 my-5">
            <label
              htmlFor="premiumAmount"
              className="block text-gray-300 text-3xl mb-2"
            >
              Premium Amount
            </label>
            <input
              name="premiumAmount"
              type="number"
              id="premiumAmount"
              value={formData.premiumAmount}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-gray-400 text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mx-4 my-5">
            <label
              htmlFor="coverageAmount"
              className="block text-gray-300 text-3xl mb-2"
            >
              Coverage Amount
            </label>
            <input
              name="coverAmount"
              type="number"
              id="coverAmount"
              value={formData.coverAmount}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-gray-400 text-2xl"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-end gap-5 px-4 py-2">
            <button
              className="text-2xl border border-gray text-red-500 rounded-md px-4 py-2"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-2xl bg-darkOrange border border-darkOrange text-green-500 rounded-md px-4 py-2 tracking-wider"
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
export default Insurance;
