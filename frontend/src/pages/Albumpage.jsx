import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useSongContext } from "../context/Songcontext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { FaPlay } from "react-icons/fa6";

const Albumpage = () => {
  const { fetchSongbyAlbum, albumData, albumSong, setSelectedSong, setIsPlaying } = useSongContext();
  const params = useParams();

  useEffect(() => {
    fetchSongbyAlbum(params.id);
  }, [params.id]);

  const playHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  return (
    <div className='h-screen'>
      <Layout>
        <div className='bg-gradient-to-b from-[#172B2B] to-zinc-900 w-[100%] md:w-[74%] m-2 md:m-0 rounded-xl h-full overflow-y-auto p-2 scrollbar-hidden'>
          <div className="flex flex-col px-6 w-full">
            <div className="mt-6 flex flex-col md:flex-row md:items-end md:gap-6">
              {albumData?.thumbnail && (
                <img
                  src={albumData.thumbnail.url}
                  className="w-64 h-64 object-cover rounded-md shadow-lg"
                  alt="Album Thumbnail"
                />
              )}
              <div className="flex flex-col text-white">
                <p className="text-sm uppercase text-gray-400">Playlist</p>
                <h2 className="text-3xl font-bold mb-2 md:text-5xl">{albumData.title} Playlist</h2>
                <h4 className="text-gray-300">{albumData.description}</h4>
                <p className="mt-2">
                  <img src={assets.spotify_logo} className="inline-block w-6" alt="Spotify Logo" />
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-10">
              <div className="
      grid grid-cols-[40px_2fr_1fr] max-[385px]:grid-cols-[40px_2fr_1fr] 
      sm:grid-cols-[50px_3fr_2fr_4fr_1fr] text-gray-400 text-xs sm:text-sm pb-2 
      border-b border-gray-700 px-2 sm:px-4">
                <p>#</p>
                <p>Title</p>
                <p className="hidden max-[385px]:hidden sm:block">Artist</p>
                <p className="hidden sm:block">Description</p>
                <p className="text-center">Play</p>
              </div>

              {albumSong.map((song, index) => (
                <div
                  key={song._id}
                  className="
        grid grid-cols-[40px_2fr_1fr] max-[385px]:grid-cols-[40px_2fr_1fr] 
        sm:grid-cols-[50px_3fr_2fr_4fr_1fr] items-center text-white py-2 sm:py-3 
        px-2 sm:px-4 hover:bg-gray-800 rounded-md cursor-pointer transition 
        duration-200 text-xs sm:text-sm">
                  <p className="text-gray-400">{index + 1}</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src={song.thumbnail.url} className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover" alt="Song Thumbnail" />
                    <span>{song.title}</span>
                  </div>
                  <p className="hidden max-[385px]:hidden sm:block text-gray-400">{song.singer}</p>
                  <p className="hidden sm:block text-gray-400 truncate">{song.description || "No Description"}</p>
                  <button
                    className="flex items-center justify-center p-2 sm:p-3 rounded-full transition duration-200"
                    onClick={() => playHandler(song._id)}
                  >
                    <FaPlay className="text-white text-sm sm:text-base" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Albumpage;

