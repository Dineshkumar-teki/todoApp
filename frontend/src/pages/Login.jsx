import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TodoContext from "../context/todoContext";
import signInImg from "../assets/signin.png";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  if (Cookies.get("jwtToken")) {
    navigate("/");
  }

  return (
    <TodoContext.Consumer>
      {(value) => {
        const { handleProfileData } = value;
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("http://localhost:3000/users/auth/signin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
              Cookies.set("jwtToken", data.token, { expires: 10 });
              handleProfileData(data.rest);
              navigate("/");
            } else {
              setErr(data.message);
            }
          } catch (error) {
            setErr(error.message);
          }
        };
        const handleInput = (e) => {
          setData({ ...formData, [e.target.id]: e.target.value });
        };
        return (
          <div className="h-screen flex bg-white p-5">
            <div className="bg-gradient-to-bl from-sky-400 to-blue-600 flex flex-col justify-center items-center h-full w-[50%] rounded-xl bg-cover bg-center">
              <img src={signInImg} alt="signinImg" />
              <p className="text-center text-white font-semibold text-lg ">
                The secret of getting ahead is getting started. <br />{" "}
                <span className="text-xl font-serif"> ~ Mark Twain</span>
              </p>
            </div>
            <div className="w-[50%]">
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="font-semibold text-5xl mb-2 text-center">
                  Welcome back!
                </h2>
                <p className="text-center">Please enter your details</p>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-[60%] flex-col gap-4 mt-10"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-lg font-semibold">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="p-2 rounded-md outline-none border-2 focus:border-blue-700"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-lg font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="**********"
                      className="p-2 rounded-md outline-none border-2 focus:border-blue-700"
                      onChange={handleInput}
                    />
                  </div>
                  {err && <p className="text-red-500">{err}</p>}
                  <button
                    type="submit"
                    className="bg-black backdrop-blur-md hover:bg-black/95 text-white shadow-sm text-lg mt-5 font-semibold rounded-full py-2"
                  >
                    Sign in
                  </button>
                  <p className="text-center font-semibold">
                    Don't have an account?
                    <a
                      href="/sign-up"
                      className="text-blue-500 hover:underline text-lg font-serif"
                    >
                      {" "}
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default Login;
