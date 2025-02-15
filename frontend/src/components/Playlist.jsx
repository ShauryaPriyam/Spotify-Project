import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useUserContext } from '../context/Usercontext'
import { useSongContext } from '../context/Songcontext'
import { assets } from '../assets/assets/assets'
import { FaBookmark, FaPause, FaPlay, FaRegBookmark } from "react-icons/fa";


const Playlist = () => {
  const { user, saveToPlaylist } = useUserContext()
  const { songs, setSelectedSong, selectedSong, setIsPlaying, isPlaying } = useSongContext()
  // console.log("songs", songs)
  const [saved, setSaved] = useState(true)

  const [myPlaylist, setMyPlaylist] = useState([])

  useEffect(() => {
    if (songs && user?.playlist && Array.isArray(user.playlist)) {
      const filteredSongs = songs.filter((e) =>
        user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filteredSongs);
      // console.log("song", filteredSongs)
    }
  }, [songs, user])

  const handler = (id) => {
    setSelectedSong(id)
    setIsPlaying(true)
  }

  const updateToPlaylist = (id) => {
    saveToPlaylist(id)
    if (isAuth) {
      setSaved(!saved)
    }
  }


  return (
    <div className='h-screen'>
      <Layout>
        <div className='bg-gradient-to-b from-[#172B2B] to-zinc-900 w-[100%] md:w-[74%] m-2 md:m-0 rounded-xl h-full overflow-y-auto p-2 scrollbar-hidden'>
          <div className="flex flex-col px-6 w-full">
            <div className="mt-6 flex flex-col md:flex-row md:items-end md:gap-6">
              {myPlaylist && myPlaylist[0] ? (
                <img src={myPlaylist[0].thumbnail.url} className="w-56 h-56 rounded-md shadow-lg" alt="Playlist Thumbnail" />
              ) : (
                <img src="https://source.unsplash.com/400x400/?music,playlist" className="w-56 h-56 rounded-md shadow-lg" alt="" />
              )}
              <div className="flex flex-col justify-end text-white text-left">
                <p className="uppercase text-sm font-semibold text-gray-300">Playlist</p>
                <h1 className="text-5xl font-bold mt-2">{user.username} Playlist</h1>
                <p className="mt-2 text-gray-400">Your favorite songs in one place.</p>
                <div className="flex items-center gap-2 mt-4 text-gray-300 text-sm">
                  <img src={assets.spotify_logo} className="w-5" alt="Spotify Logo" />
                  <span>{user.username} • {myPlaylist.length} songs</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="
      grid grid-cols-[1fr_1fr_1fr_1fr] max-[385px]:grid-cols-[1fr_2fr_1fr] 
      text-gray-400 text-sm pb-2 border-b border-gray-700">
                <p>#</p>
                <p className="hidden max-[385px]:hidden">Singer</p>
                <p className="hidden sm:block">Description</p>
                <p className="text-center">Actions🕒</p>
              </div>

              {myPlaylist.map((song, index) => (
                <div key={song._id}
                  className="
        grid grid-cols-[1fr_1fr_1fr_1fr] max-[385px]:grid-cols-[1fr_2fr_1fr] 
        items-center text-white py-3 hover:bg-gray-800 px-2 rounded-md cursor-pointer">
                  <p className="text-white">
                    <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                    <img src={song.thumbnail.url} className="inline w-10 mr-5" alt="" />
                    {song.title}
                  </p>
                  <div className="hidden max-[385px]:hidden">
                    <p className="text-gray-400 text-sm">{song.singer}</p>
                  </div>
                  <p className="hidden sm:block text-gray-400">{song.description || " "}</p>

                  <p className='flex items-center justify-center gap-3'>
                    <p onClick={() => updateToPlaylist(song._id)}>
                      {!saved ? <FaRegBookmark color="white" size={20} /> : <FaBookmark color='white' size={20} />}
                    </p>
                    <p onClick={() => handler(song._id)}>
                      <FaPlay />
                    </p>
                  </p>
                </div>
              ))}
            </div>


          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Playlist
