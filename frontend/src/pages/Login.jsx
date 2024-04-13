import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="bg-primaryBlack text-white min-h-screen py-8">
      <div className="text-center text-4xl text-primaryYellow font-semibold mb-5">
        Login
      </div>
      <div className="text-center text-lg mb-5">
        Dont Have an account ?{" "}
        <a href="/signup" className="underline">
          Signup
        </a>
      </div>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 space-y-2">
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
          </div>

          <button
            type="submit"
            className="border-2 border-primaryGray text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
