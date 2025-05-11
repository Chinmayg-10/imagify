import React from "react";
import { testimonialsData } from "../assets/assets";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; 

export function Testimonial() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-20 px-4 sm:px-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-center text-3xl sm:text-5xl text-black my-2 font-semibold">
        Customer testimonials
      </h1>
      <p className="text-center max-w-xl text-sm sm:text-xl text-gray-600 my-3 mb-10">
        What Our Users Are Saying
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white/20 shadow-md rounded-xl border text-center w-full sm:w-80"
          >
            <img src={item.image} alt="" className="h-12 w-12 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mt-4">
              {item.name}
            </h1>
            <h2 className="text-sm sm:text-base text-gray-600 my-2">
              {item.role}
            </h2>
            <div className="flex justify-center gap-1 my-2">
              {Array(item.stars)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    className="h-4 w-4"
                    src={assets.rating_star}
                    alt="star"
                  />
                ))}
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">{item.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
