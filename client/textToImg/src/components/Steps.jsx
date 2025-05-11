import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion"; 
export function Steps() {
  return (
    <motion.div
      className="flex flex-col text-center items-center justify-center mt-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-center text-3xl  sm:text-5xl mx-auto text-black my-2 font-semibold">
        How it works
      </h1>
      <p className="text-center max-w-xl text-sm sm:text-xl mx-auto text-gray-600 my-3">
        Transform Words Into Stunning Images
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-5 px-8 bg-white/20 shadow-md rounded-xl border cursor-pointer hover:scale-[1.02] transition-all duration-300"
          >
            <img src={item.icon} alt="" className="w-16 h-16 mb-2" />
            <div>
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                "{item.description}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
