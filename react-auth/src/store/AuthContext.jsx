import React,{useState} from "react";
import { useNavigate } from "react-router";
const AuthContext = React.createContext({
    token: "",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})
export const AuthContextProvider = (props)=>{
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;
    const loginHandler = (token)=>{
        setToken(token);
    }
    const logoutHandler = ()=>{
        setToken(null);
        navigate("/auth");
    }
    const contextValue = {
        token:token,
        isLoggedIn: userIsLoggedIn,
        login:loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;