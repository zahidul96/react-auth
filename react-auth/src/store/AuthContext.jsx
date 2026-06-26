import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const getInitialToken = () => {
    const storedToken = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("expirationTime");
    if (!storedToken || !tokenExpiration) {
      return null;
    }
    const now = new Date().getTime();
    if (now > tokenExpiration) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return null;
    }
    return storedToken;
  };

  const navigate = useNavigate();
  const [token, setToken] = useState(getInitialToken());
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    const expirationTime = new Date().getTime() + 300000;
    localStorage.setItem("expirationTime", expirationTime.toString());
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    navigate("/auth");
  };
  useEffect(() => {
    if (!token) {
      return ;
    }
    const expirationTime = localStorage.getItem("expirationTime");
    const currentTime = new Date().getTime();
    const timeLeft = parseInt(expirationTime) - currentTime;

    if (timeLeft <= 0) {
      logoutHandler();
    } else {
      const timer = setTimeout(() => {
        alert("session expired");
        logoutHandler();
      }, timeLeft);
      return () => clearTimeout(timer);
    }
    
  }, [token]);
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
