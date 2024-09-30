import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TodoContext from "../context/todoContext";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState({});
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Cookies.get("jwtToken") !== undefined) {
      navigate("/");
    }
  }, []);

  return (
    <TodoContext.Consumer>
      {(value) => {
        const { handleProfileData } = value;
        const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.password || !formData.email) {
            return setErr("Please fill out all fields.");
          }
          try {
            const res = await fetch("http://localhost:3000/users/auth/signin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
              setErr(data.message);
            }
            if (res.ok) {
              Cookies.set("jwtToken", data.token, { expires: 10 });
              handleProfileData(data);
              navigate("/");
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
              <h2 className="font-semibold text-3xl text-center text-white">
                Sign-In
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  {err.email && <p className="text-red-600">{err.email}</p>}
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
                  {err.password && (
                    <p className="text-red-600">{err.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 hover:bg-gradient-to-l font-semibold rounded-lg py-2 text-white"
                >
                  Sign in
                </button>
                <button
                  className="border-amber-500 hover:border-amber-600 rounded-lg py-2 border-2 font-semibold text-white"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default Login;
