import { useContext } from "react";
import { plans } from "../assets/assets";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; 
import { AppContext } from "../context/state";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export function BuyCredit() {
  const { user,setcredit,credit,SetShowLogin,backendUrl} = useContext(AppContext);
  const navigate=useNavigate();
  async function onCreditsHandler(item){
    if(!user){
      SetShowLogin(true);
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.patch(
      backendUrl + "/user/credits",
      { credits: item.credits },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
      if (data.success) {
        setcredit(data.creditBalance);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <motion.div
      className="min-h-[80vh] text-center pt-14 mb-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className="border-gray-400 border px-10 py-2 mb-6 rounded-full">
        OUR PLANS
      </button>
      <h1 className="text-center font-medium text-3xl mb-10 sm:mb-10">
        Choose the plan
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap">
        {plans.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-6 bg-white shadow-md rounded-xl border text-center w-full sm:w-80 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} alt="" className=" h-10 w-10 mt-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mt-4">
              {item.id}
            </h2>
            <h3 className="text-sm sm:text-base text-gray-600 mt-2">
              {item.desc}
            </h3>
            <h1 className="text-sm text-gray-600 mt-6 ">
              <span className="text-3xl font-semibold text-gray-800 ">
              ₹{item.price}
              </span>{" "}
              /{item.credits} credits
            </h1>
            <button className="mt-16 text-white bg-zinc-900 px-10 py-3 rounded cursor-pointer w-full" onClick={()=>onCreditsHandler(item)}>
              {user ? "Purchase" : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
