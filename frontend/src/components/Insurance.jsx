import React, { useState } from "react";
import InsuranceComponent from "./InsuranceComponent";

const Insurance = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="h-full overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-primaryYellow text-4xl font-medium">Insurance</h1>
        <button
          className="text-white text-2xl mr-10 border border-primaryGray py-2 px-5 rounded-lg bg-primaryYellow"
          onClick={() => setOpenModal(true)}
        >
          Add Insurance
        </button>
        {openModal && <FormModal setOpenModal={setOpenModal} />}
      </div>
      <div className="gap-5 flex flex-wrap">
        <InsuranceComponent />
        <InsuranceComponent />
        <InsuranceComponent />
        <InsuranceComponent />
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
    coverageAmount: 0,
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
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
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
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
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
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
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
              name="coverageAmount"
              type="number"
              id="coverageAmount"
              value={formData.coverageAmount}
              className="shadow appearance-none border p-2 w-full rounded bg-primaryBlack outline-none text-white text-2xl"
              onChange={handleChange}
              required
            />
          </div>
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
export default Insurance;
