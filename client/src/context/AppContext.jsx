import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCreditsData = async () => {
    try {
        if (!token) return;
        const { data } = await axios.get(`${backendUrl}/api/users/credit`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data.remainingCredits, data)
        if (data.remainingCredits !== undefined) {
        setCredit(data.remainingCredits);
        }
    } catch (error) {
        console.error("Error loading credits:", error.message);
    }
    };


  useEffect(() => {
    loadCreditsData();
  }, [token]);

  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/api/users/logout`, {}, {
        headers: { token },
      });
    } catch (error) {
      console.warn("Logout request failed:", error.response?.data?.message || error.message);
    }

    // Always clear local state regardless of request success
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
