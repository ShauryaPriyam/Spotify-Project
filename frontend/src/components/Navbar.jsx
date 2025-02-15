import React, { useEffect, useState } from 'react';
import { FaSpotify } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { BiSearch } from "react-icons/bi";
import { useUserContext } from '../context/Usercontext';
import { useNavigate } from 'react-router';
import { useSongContext } from '../context/Songcontext';

const Navbar = () => {
  const navigate = useNavigate()
  const { logoutUser, user, isAuth } = useUserContext()
  const { searchSongs } = useSongContext()
  const [query, setQuery] = useState("")


  const handleSearch = (e) => {
    setQuery(e.target.value);
    searchSongs(e.target.value);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logoutUser();
    }
  }
  return (
    <div
      className="ml-[1%] mr-[1%] flex items-center h-full md:gap-6 gap-1 justify-between">

      <FaSpotify
        size={35}
        onClick={() => navigate("/")}
      />
      <div className="flex items-center gap-4 md:w-[40%] w-[60%] md:ml-[16%] ml-0">
        <div
          onClick={() => navigate("/")}
          className="bg-[#2A2A2A] p-3 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:text-green-500">
          <GrHomeRounded size={20} />
        </div>
        <div className="relative flex-1 max-w-md">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-[#242424] text-white placeholder-gray-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="btn-shrink bg-white text-black text-[15px] font-semibold px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200 transition md:text-sm">
          Explore Premium
        </p>
        <p className="bg-white btn-shrink text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200 transition">
          Install App
        </p>

        {isAuth ? (
          <p
            className="bg-red-500 btn-shrink text-black text-[19px] md:text-[15px] px-5 py-2 md:px-4 md:py-1 rounded-2xl cursor-pointer hover:bg-red-400 hover:text-white transition"
            onClick={handleLogout}
          >
            Logout
          </p>
        ) : (
          <p
            className="bg-white btn-shrink text-black text-[14px] md:text-[15px] px-5 py-2 md:px-4 md:py-1 rounded-2xl cursor-pointer hover:bg-green-500 hover:text-white transition"
            onClick={() => navigate("/register")}
          >
            Login/Sign in
          </p>
        )}


      </div>
    </div>
  );
};

export default Navbar;
