import React, { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/students/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const token = data["x-auth-token"];
      const sessionId = data["x-session-id"];
      // console.log(rememberMe)

      Cookies.set("token", token, { expires: 365 }); // Token expires after 365 days
      // If the user opts to be remembered, store the token persistently
      if (rememberMe) {
        Cookies.set("sessionId", sessionId, { expires: 30 });
      } else {
        Cookies.set("sessionId", sessionId, { expires: 3 / 24 }); // Session ID expires after 3 hour
      }
      const name = Cookies.get("token");
      // console.log(`cookie data :${name}`);
      const name1 = Cookies.get("sessionId");
    }
    else if (response.status == 400) {
      Alert("Email and/or password is incorrect");
    } else {
      const error = await response.json();
      console.error(error.message);
      // Handle error, e.g., show a message to the user
    }
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
