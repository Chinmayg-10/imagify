import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/state";
import { motion } from "framer-motion"; 
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
export function Login() {
  const [state, SetState] = useState("Login");
  const { SetShowLogin, backendUrl, SetToken, setUser } =
    useContext(AppContext);
  //create 3 states for 3 input fields
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  function Togglepassword() {
    setshowPassword((c) => !c);
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted with state:", state);
    console.log("Backend URL:", backendUrl);
    console.log("Form values ->", { name, email, password });
    console.log(import.meta.env);

    try {
      if (state === "Login") {
        console.log("Attempting to log in...");
        const { data } = await axios.post(backendUrl + "/user/login", {
          email,
          password,
        });
        console.log("Login response:", data);

        if (data.success) {
          console.log("Login successful!");
          SetToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          SetShowLogin(false);
        } else {
          console.warn("Login failed:", data.message);
          toast.error(data.message);
        }
      } else {
        console.log("Attempting to register...");
        const { data } = await axios.post(backendUrl + "/user/register", {
          name,
          email,
          password,
        });
        console.log("Register response:", data);

        if (data.success) {
          console.log("Registration successful!");
          SetToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          SetShowLogin(false);
        } else {
          console.warn("Registration failed:", data.message);
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error during request:", error.message);
      toast.error(error.message);
    }
  };

  //for blocking scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        action=""
        className="bg-white relative p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-2">
          {state}
        </h1>
        <p className="text-sm text-blue-900 mb-9 ">
          Welcome back! Please sign in to continue
        </p>
        {state != "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5 ">
            <img src={assets.profile_icon} alt="" className="w-4 h-4" />
            <input
              onChange={(e) => {
                Setname(e.target.value);
              }}
              value={name}
              type="text"
              name=""
              id=""
              placeholder="Full Name"
              required
              className="outline-none text-sm"
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3 ">
          <img src={assets.email_icon} alt="" className="w-4 h-4" />
          <input
            onChange={(e) => {
              Setemail(e.target.value);
            }}
            value={email}
            type="email"
            name=""
            id=""
            placeholder="Email id"
            required
            className="outline-none text-sm"
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <img src={assets.lock_icon} alt="" className="w-4 h-4" />
          <div className="relative w-full">
            <input
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="outline-none text-sm"
          />
          <button
            type="button"
            onClick={Togglepassword}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-lg"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
          </div>
          
        <h3 className="text-sm mt-5 text-blue-500">Forgot password?</h3>
        <button className="w-full bg-blue-500 text-white rounded-full py-2 mt-4">
          {state === "Login" ? "login" : "create account"}
        </button>
        {state === "Login" ? (
          <p
            className="text-sm mt-4 text-center"
            onClick={() => SetState("Sign up")}
          >
            Don't have an account?
            <span className="text-blue-500 underline cursor-pointer">
              {" "}
              Sign up
            </span>
          </p>
        ) : (
          <p
            className="text-sm mt-2 text-center"
            onClick={() => SetState("Login")}
          >
            Already have an account?
            <span className="text-blue-500 underline cursor-pointer">
              {" "}
              Login
            </span>
          </p>
        )}
        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => SetShowLogin(false)}
        />
      </motion.form>
    </div>
  );
}
