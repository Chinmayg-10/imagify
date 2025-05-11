import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; 

export function Content() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-20 px-4 sm:px-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-center text-3xl sm:text-5xl text-black my-2 font-semibold">
        Create AI Images
      </h1>
      <p className="text-center max-w-xl text-sm sm:text-xl text-gray-600 my-3">
        Turn your imagination into visuals
      </p>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mt-10 max-w-6xl">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.sample_img_2}
            alt="Sample"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4 mt-10">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don’t yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
