import React, { useState, useEffect } from 'react';
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { useUserContext } from '../context/Usercontext';
import { useSongContext } from '../context/Songcontext';


const SongItem = ({ image, name, singer, id }) => {
  const { saveToPlaylist, user, isAuth } = useUserContext()
  const { setSelectedSong, setIsPlaying, fetchSingleSong } = useSongContext()
  const [saved, setSaved] = useState(false)
  const playlist = user ? user.playlist : [];


  useEffect(() => {
    if (playlist && playlist.includes(id)) {
      setSaved(true);
    }
  }, [user]);

  const savePlaylistHandler = (id) => {
    saveToPlaylist(id)
    if (isAuth) {
      setSaved(!saved)
    }
  }

  const handlePlay = (id) => {
    setSelectedSong(id)
    setIsPlaying(true)
  }
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group" onClick={() => handlePlay(id)}>
      <button className="absolute w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow-lg opacity-0 shadow-black/70 right-18 bottom-18 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => handlePlay(id)}
      >
        <FaPlay color="black" />
      </button>
      <button className="absolute w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow-lg opacity-0 shadow-black/70 right-5 bottom-18 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => savePlaylistHandler(id)}
      >
        {!isAuth ? (
          <FaRegBookmark color="black" />
        ) : !saved ? (
          <FaRegBookmark color="black" />
        ) : (
          <FaBookmark color="black" />
        )}
      </button>
      <img src={image} className="rounded h-[160px] w-[150px]" alt={name} />
      <p className="font-bold mt-2 mb-1">{name.length > 12 ? name.slice(0, 12) + "..." : name}</p>
      <p className="text-slate-200 text-sm">{singer.length > 18 ? singer.slice(0, 18) + "..." : singer}</p>
    </div>
  );
};

export default SongItem;
