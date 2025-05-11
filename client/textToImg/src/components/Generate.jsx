import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; 
import { AppContext } from "../context/state";
import { useNavigate } from "react-router-dom";
export function Generate() {
  const { user, SetShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  function onClickHandler() {
    if (user) {
      navigate("/result");
    } else {
      SetShowLogin(true);
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-28 px-4 sm:px-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-center text-3xl sm:text-5xl text-black my-2 font-semibold">
        See the magic. Try now
      </h1>
      <button
        onClick={onClickHandler}
        className="sm:text-lg bg-black text-white flex py-2.5 px-12 mt-8 items-center gap-2 rounded-full w-auto"
      >
        <p>Generate Images</p>
        <img src={assets.star_group} alt="" className="h-6" />
      </button>
    </motion.div>
  );
}
