import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/credit`, { headers: authHeaders() });
      setCredit(data.remainingCredits);
    } catch (error) {
      const errData = error.response?.data;
      setCredit(errData?.remainingCredits ?? 0);
      console.error("Error loading credits:", errData?.message || error.message);
    }
  };

  useEffect(() => {
    loadCreditsData();
  }, [token]);

  const generateImage = async (prompt) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/images/generate`,
        { prompt },
        { headers: authHeaders()},
      );
      
      const data = res.data;
      // console.log(data)
      if (data.success) {
        loadCreditsData();
        return data.image;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          toast.info("You’ve run out of credits.");
          navigate("/buy");
        }
      }
    } catch (error) {
      console.error("Error generating images:", error.message);
      toast.error("Image generation failed.");
    }
  };

  const logout = async () => {
    // console.log('Logging out...');

    try {
      await axios.post(
        `${backendUrl}/api/users/logout`,
        {},
        { headers:authHeaders()}
      );
    } catch (error) {
      console.error("Logout Failed", error.message);
      toast.error("Logout failed.");
    }

    setToken(null);
    setUser(null);
    setCredit(false);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    backendUrl,
    logout,
    generateImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
