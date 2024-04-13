import React, { useState } from "react";

const Signup = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    maritalStatus: "",
    avgMonthlyIncome: "",
    bank: "",
    accountId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-primaryBlack text-white min-h-screen py-8">
      <div className="text-center text-4xl text-primaryYellow font-semibold">
        Signup
      </div>
      <div className="text-center text-lg mb-2">
        Already Have an account ?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </div>
      <div className="max-w-md mx-auto">
        {page === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 space-y-2">
              <label htmlFor="fname" className="block mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="First name"
                value={formData.fname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
              <label htmlFor="lname" className="block mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Last name"
                value={formData.lname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
              <label htmlFor="phone" className="block mb-1">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
            </div>

            <button
              className="border-2 border-primaryGray text-white px-4 py-2 rounded"
              onClick={nextPage}
            >
              Next
            </button>
          </form>
        )}

        {page === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="dob" className="block mb-1">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
              <label htmlFor="maritalStatus" className="block mb-1">
                Marital Status:
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
              <label htmlFor="avgMonthlyIncome" className="block mb-1">
                Average Monthly Income:
              </label>
              <input
                type="text"
                id="avgMonthlyIncome"
                placeholder="Avg. Monthly Income"
                name="avgMonthlyIncome"
                value={formData.avgMonthlyIncome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
              <label htmlFor="bank" className="block mb-1">
                Select Bank:
              </label>
              <select
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              >
                <option value="">Select Bank</option>
                <option value="bank1">Bank 1</option>
                <option value="bank2">Bank 2</option>
                <option value="bank3">Bank 3</option>
              </select>
              <label htmlFor="accountId" className="block mb-1">
                Account ID:
              </label>
              <input
                type="text"
                id="accountId"
                name="accountId"
                placeholder="Account ID"
                value={formData.accountId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-white outline-none bg-black"
              />
            </div>

            <button
              type="button"
              onClick={prevPage}
              className="mr-3 border-2 border-primaryGray text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="submit"
              className="border-2 border-primaryGray text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
