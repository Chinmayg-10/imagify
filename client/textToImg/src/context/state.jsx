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
      toast.error("Not Enough credits");
    }
  }
const blockedKeywords = [
  "sex", "nude", "naked", "bed", "intimate", "erotic", "kiss", "romantic", "undress"
];

function containsBlockedWords(prompt) {
  const lower = prompt.toLowerCase();
  return blockedKeywords.some((word) => lower.includes(word));
}

async function generateImage(prompt) {
  if (containsBlockedWords(prompt)) {
    toast.error("That prompt may violate our content policy. Please rephrase.");
    return;
  }

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
      toast.error(data.message || "Image generation failed.");
      loadCreditsData();
      if (data.creditBalance === 0) {
        navigate("/buy");
      }
    }
  } catch (error) {
    if (error.response?.status === 422) {
      toast.error("Prompt blocked for violating content policy. Please try something else.");
    } else {
      toast.error(error.response?.data?.message || "Something went wrong while generating the image.");
    }
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
