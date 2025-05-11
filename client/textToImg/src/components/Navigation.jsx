import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/state";
export function Nav() {
  const { user, setUser, SetShowLogin, logout, credit } =
    useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                navigate("/buy");
              }}
              className="flex items-center gap-2 bg-blue-100 py-1.5  px-4 rounded-3xl sm:px-10 sm:py-3 hover:scale-105 transition-all duration-700"
            >
              <img src={assets.credit_star} alt="" className="w-5" />
              <p className="text-xm sm:text-sm text-gray-600">
                Credits left:{credit}
              </p>
            </button>
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm text-gray-600 max-sm:hidden">
                Hi! {user.name}
              </p>
              <div className="relative group">
                <img
                  src={assets.profile_icon}
                  alt=""
                  className="w-10 drop-shadow cursor-pointer"
                />
                <div className="absolute top-10 -right-2 h-4 w-24 invisible group-hover:visible"></div>

                <div className="absolute hidden group-hover:block top-12 right-0 z-10 bg-white shadow-md rounded p-2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 delay-100">
                  <ul>
                    <li
                      className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => {
                navigate("/buy");
              }}
              className="cursor-pointer text-xm sm:text-sm text-gray-600"
            >
              Pricing
            </p>
            <button
              className="bg-black text-white py-2 px-7 rounded-3xl sm:px-10 text-sm"
              onClick={() => SetShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
