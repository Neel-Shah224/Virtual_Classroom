import React, { createContext, useReducer, useState ,useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import "./App.css";
import { login_out } from "./Reducer/login_out";
import Message from "./components/Message";
import Dashboard from "./components/Dashboard";
import Cookie from "js-cookie";
import ClassMain from "./components/Class/ClassMain";
export const UserLogged = createContext();
const initialvalue = async (setUser,dispatchUserAuth) => {
  if (Cookie.get("jwtoken")) {
    const res = await fetch("user/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    setUser(data);
    dispatchUserAuth({type:'LOGGEDIN',payload:true})
  }
  
};

function App() {
  const [user, setUser] = useState({});
  const [userAuth, dispatchUserAuth] = useReducer(
    login_out,
    false
  );
    useEffect(()=>{
      initialvalue(setUser,dispatchUserAuth)
    },[])
  const [open, setOpen] = React.useReducer(
    (state, action) => {
      return {
        message: action.message,
        severity: action.severity,
        open: action.open,
      };
    },
    { message: "", severity: "", open: false }
  );
  return (
    <>
      <UserLogged.Provider
        value={{ userAuth, dispatchUserAuth, open, setOpen }}
      >
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<Logout setUser={setUser} />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/class/:id" element={<ClassMain />} />
        </Routes>
        <Message
          message={open.message}
          severity={open.severity}
          open={open.open}
          setOpen={setOpen}
        />
      </UserLogged.Provider>
    </>
  );
}

export default App;
