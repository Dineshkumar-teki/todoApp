import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [formData, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  if (Cookies.get("jwtToken")) {
    navigate("/");
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErr("Please fill out all fields.");
    }
    try {
      setErr(null);
      const res = await fetch("http://localhost:3000/users/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErr(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  const handleInput = (e) => {
    setData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="w-[90%] md:w-[400px] bg-slate-600 py-10 px-5 rounded-lg">
        <h2 className="text-center text-white font-semibold text-3xl">
          Sign-Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-white">
              Name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter name"
              className=" p-2 rounded-md outline-none"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className=" p-2 rounded-md outline-none"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="p-2 rounded-md outline-none"
              onChange={handleInput}
            />
            {err && <p className="text-red-500">{err}</p>}
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 hover:bg-gradient-to-l font-semibold rounded-lg py-2 text-white"
          >
            Sign up
          </button>
          <button
            className="border-amber-500 hover:border-amber-600 rounded-lg py-2 border-2 font-semibold text-white"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
