import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; 
import { delay } from "motion";
import { AppContext } from "../context/state";
import { useNavigate } from "react-router-dom";

export function Header() {
  const {user,SetShowLogin}=useContext(AppContext);
  const navigate=useNavigate();
  function onClickHandler(){
    if(user){
      navigate('/result');
    }
    else{
      SetShowLogin(true);
    }
  }
  return (
    <motion.div
      className="flex flex-col text-center items-center justify-center mt-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div className="inline-flex gap-2 items-center text-center text-stone-500 px-6 py-1 border border-neutral-500 rounded-full bg-white" initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 ,delay:0.2}}
      animate={{ opacity: 1, y: 0 }}>
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1 className="text-4xl sm:text-7xl max-w-[300px] sm:max-w-[590px] mx-auto my-10 text-center" 
      initial={{ opacity: 0 }}
      transition={{ duration: 2 ,delay:0.4}}
      animate={{ opacity: 1 }}>
        Turn text to <span className="text-blue-600">image</span>, in seconds.
      </motion.h1>
      <motion.p className="text-center max-w-xl text-sm sm:text-xl mx-auto text-gray-600 my-3" initial={{ opacity: 0,y:20 }}
      transition={{ duration: 0.8 ,delay:0.6}}
      animate={{ opacity: 1,y:0}}>
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds-just type,and watch the magic happen.
      </motion.p>
      <motion.button className="sm:text-lg bg-black text-white flex py-2.5 px-12 mt-8 items-center gap-2 rounded-full w-auto"
      onClick={onClickHandler}
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
      >
        <p>Generate Images</p>
        <img src={assets.star_group} alt="" className="h-6" />
      </motion.button>
      <motion.div className="flex flex-wrap gap-3 justify-center mt-10" initial={{opacity:0}}
      animate={{opacity:1}} transition={{duration:1,delay:1}}>
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              whileHover={{scale:1.05,duration:0.1}}
              src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              key={index}
              width={70}
            />
          ))}
      </motion.div>
      <motion.p className="text-xs sm:text-sm text-gray-600 mt-2"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:1.2,duration:0.8}}>
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
}
