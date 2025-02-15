import React from 'react'
import { useUserContext } from '../context/Usercontext'
import { assets } from "../assets/assets/assets.js"
import PlaylistCard from './PlaylistCard.jsx'
import { useNavigate } from 'react-router'

const Sidebar = () => {
  const navigate=useNavigate()
  const { user } = useUserContext()
  return (
    <div className='bg-gradient-to-b md:flex hidden md:flex-col from-[#172B2B] to-[#121212] md:h-full md:w-[23%] md:ml-[1%] rounded-xl px-2 py-1'>

      <div className="p-4 flex items-center justify-between hover:bg-[#ffffff26] rounded-xl mt-2">
        <div className="flex items-center gap-3">
          <img src={assets.stack_icon} className="w-8" alt="" />
          <p className="font-semibold">Your Library</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={assets.arrow_icon} className="w-8" alt="" />
          <img src={assets.plus_icon} className="w-8" alt="" />
        </div>
      </div>

      <div onClick={()=>navigate("/playlist")}>
        <PlaylistCard />
      </div>

      {user && user.role === "admin" && (
        <button
          className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4 ml-3 w-[70%] cursor-pointer transition-transform duration-200 hover:scale-90 hover:text-green-700"
          onClick={() => navigate("/admin")}
        >
          Admin Dashboard
        </button>
      )}

      <div className="p-4 m-2  rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
        <h1>Hope You Like Website ❤️</h1>
        <p className="font-light">we'll keep you update on new Updates</p>

        <button className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4">
          Thank You !
        </button>
      </div>

    </div>
  )
}

export default Sidebar
