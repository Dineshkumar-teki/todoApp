import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import signUpImg from "../assets/signup1.png";

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
    <div className="h-screen p-5 flex flex-wrap">
      <div className="bg-gradient-to-bl from-orange-400 to-amber-600 border rounded-xl h-full w-[50%] flex flex-col justify-center items-center">
        <img src={signUpImg} alt="signUpImg" className="w-[80%]" />
        <p className="font-semibold text-white text-lg">
          Join TaskFlow - Stay Organized and Get Things Done.
        </p>
      </div>
      <div className="h-full flex justify-center items-center w-[50%]">
        <div className="w-[400px]">
          <h2 className="text-center font-semibold text-4xl mb-10">
            Create an account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-semibold text-lg">
                Name
              </label>
              <input
                id="username"
                type="text"
                placeholder="Name"
                className=" p-2 rounded-md outline-none border focus:border-blue-500"
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-lg">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                className=" p-2 rounded-md outline-none border focus:border-blue-500"
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="**********"
                className="p-2 rounded-md outline-none border focus:border-blue-500"
                onChange={handleInput}
              />
              {err && <p className="text-red-500">{err}</p>}
            </div>

            <button
              type="submit"
              className="bg-black hover:bg-black/95 font-semibold rounded-full py-2 text-white"
            >
              Sign up
            </button>
            <p className="font-semibold text-center">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-serif text-lg text-blue-500 hover:underline"
              >
                Log in
              </a>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
