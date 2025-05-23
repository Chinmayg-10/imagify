import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <div className="flex items-center justify-between py-3 gap-4 mt-20">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <p className="flex-1 border-l border-gray-400 pl-4 text-gray-500 text-sm max-sm:hidden items-center">Copyright @imagify | All right reserved.</p>
      <div className="flex gap-2.5">
        <Link to="https://www.linkedin.com/in/chinmayg10/" target="_blank">
        <img src={assets.linkedin_icon} alt="" width={35} className="cursor-pointer" />
        </Link> 
        <Link to="https://github.com/Chinmayg-10" target="_blank">
          <img src={assets.github_icon} alt="" width={35} className="cursor-pointer"/>
        </Link>
        <Link to="https://www.instagram.com/chinmay_g10/" target="_blank">
          <img src={assets.instagram_icon} alt="" width={35} className="cursor-pointer"/>
        </Link>
        
      </div>
    </div>
  );
}
