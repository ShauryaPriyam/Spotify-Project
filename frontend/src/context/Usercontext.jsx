import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";

axios.defaults.withCredentials = true;
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [spin, setSpin] = useState(true)
  const loginUser = async (email, password, navigate) => {
    setLoading(true)
    try {
      console.log(email, password)
      const { data } = await axios.post("https://spotify-project-tujq.onrender.com/user/login", {
        email,
        password
      })
      console.log("Response data:", data);
      if (!data.success) {
        toast.error(data.message)
      }
      else {
        toast.success(data.message)
        setUser(data.user)
        // console.log(user)
        setIsAuth(true)
        setLoading(false)
        navigate("/")
      }
    } catch (err) {
      // console.log(err)
      if (err.response) {
        console.error("Login error response:", err.response.data);
        toast.error(err.response.data.message || "Invalid email or password");
      } else {
        console.error("Login error:", err.message);
        toast.error("An error occurred");
      }
    }
  }

  const registerUser = async (username, email, password, navigate) => {
    try {
      const { data } = await axios.post("https://spotify-project-tujq.onrender.com/user/register", {
        username,
        email,
        password
      })
      if (!data.success) {
        toast.error(data.message)
      }
      else {
        toast.success(data.message)
        fetchUser();
        setUser(data.username)
        navigate("/")
        // console.log(user)
      }
    } catch (err) {
      if (err.response) {
        console.error("Login error response:", err.response.data);
        toast.error(err.response.data.message || "Invalid email or password");
      } else {
        console.error("Login error:", err.message);
        toast.error("An error occurred");
      }
    }
  }

  const logoutUser = async () => {
    try {
      const { data } = await axios.post("https://spotify-project-tujq.onrender.com/user/logout")
      if (data.success) {
        toast.success(data.message)
        setUser(null);
        setIsAuth(false);
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  }

  const saveToPlaylist = async (id) => {
    try {
      console.log("id:", id)
      const { data } = await axios.post("https://spotify-project-tujq.onrender.com/user/song/" + id)
      console.log("data", data)
      toast.success(data.message);
      fetchUser();
    } catch (err) {
      console.log("err in save song", err)
      toast.error("Create Account or Login");
    }
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("https://spotify-project-tujq.onrender.com/user/profile");
      // console.log(data)
      setUser(data.user)
      setIsAuth(true);
      setSpin(false)
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setSpin(false)
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        loading,
        isAuth,
        logoutUser,
        spin,
        saveToPlaylist,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);