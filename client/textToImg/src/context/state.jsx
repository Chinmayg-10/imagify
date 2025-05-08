import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, SetShowLogin] = useState(false);
  const [token, SetToken] = useState(localStorage.getItem("token"));
  const [credit, setcredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  async function loadCreditsData() {
    try {
      const { data } = await axios.get(backendUrl + "/user/credits", {
        headers: { token },
      });
      if (data.success) {
        setcredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  async function generateImage(prompt) {
    try {
      const { data } = await axios.post(
        backendUrl + "/image/generate",
        { prompt, userId: user._id },
        { headers: { token } }
      );
      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  function logout() {
    localStorage.removeItem("token");
    SetToken("");
    setUser(null);
  }
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    SetShowLogin,
    backendUrl,
    token,
    SetToken,
    credit,
    setcredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
