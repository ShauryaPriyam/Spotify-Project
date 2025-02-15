import React, { createContext, useEffect, useState, useContext,useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const SongContext = createContext()
let globalAudioRef = new Audio()

export const Songprovider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [albums, setAlbums] = useState([]);
  const [songs, setSong] = useState([]);
  const [selectedSong, setSelectedSong] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [singleSong, setSingleSong] = useState([])
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(100)
  const [searchResults, setSearchResults] = useState([])
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(globalAudioRef);

  const fetchAlbum = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/spotify/Album/all")
      setAlbums(data.albums)
    } catch (err) {
      // toast.error('An error occurred');
      setLoading(false)
    }
  }

  const fetchAllSongs = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/spotify/Song/all")
      setSong(data.songs)
      // console.log(data.songs)
      setSelectedSong(data.songs[0]._id);
      setIsPlaying(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const createAlbum = async (title, description, file) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description)
    formData.append("file", file);
    try {
      const { data } = await axios.post("http://localhost:3000/spotify/Album/create", formData)
      if (!data.success) {
        toast.error(data.message)
      }
      else {
        toast.success(data.message)
        fetchAlbum()
        setLoading(false)
      }
    } catch (err) {
      toast.error('An error occurred');
      setLoading(false)
    }
  }

  const addSong = async (title, description, singer, file, album) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description)
    formData.append("singer", singer);
    formData.append("file", file);
    formData.append("album", album);

    // console.log([...formData])

    try {
      const { data } = await axios.post("http://localhost:3000/spotify/Song/add", formData)
      //  console.log(data)
      if (!data.success) {
        toast.error(data.message)
      }
      else {
        toast.success(data.message)
        fetchAlbum()
        fetchAllSongs()
        setLoading(false)
      }
    } catch (err) {
      toast.error('An error occurred');
      setLoading(false)
    }
  }

  const thumbnailSong = async (id, file) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axios.post("http://localhost:3000/spotify/Thumbnail/" + id, formData)
      if (!data.success) {
        toast.error(data.message)
      }
      else {
        toast.success(data.message)
        fetchAlbum()
        fetchAllSongs()
        setLoading(false)
      }

    } catch (err) {
      toast.error('An error occurred');
      setLoading(false)
    }
  }

  const deleteSong = async (id) => {
    try {
      const { data } = await axios.delete("http://localhost:3000/spotify/Song/delete/" + id);

      toast.success(data.message);
      fetchAllSongs()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const fetchSingleSong = async () => {
    try {
      // console.log("song:", selectedSong)
      if (selectedSong !== "") {
        const { data } = await axios.get("http://localhost:3000/spotify/Song/single/" + selectedSong)
        // console.log(data)
        setSingleSong(data.song)
      }
    } catch (err) {
      toast.error(err.response.data.message || "Something went Wrong!");
    }
  }

  const nextMusic = () => {
    let currentIndex = songs.findIndex((song) => song._id === selectedSong);
  
    if (currentIndex === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]._id);
    } else {
      setIndex(currentIndex + 1);
      setSelectedSong(songs[currentIndex + 1]._id);
    }
    setIsPlaying(true);
  };

  const prevMusic = () => {
    let currentIndex = songs.findIndex((song) => song._id === selectedSong);
  
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
      setSelectedSong(songs[currentIndex - 1]._id);
      setIsPlaying(true);
    }
  };
  

  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  const fetchSongbyAlbum = async (id) => {
    try {
      const { data } = await axios.get("http://localhost:3000/spotify/Album/" + id)
      setAlbumData(data.album)
      setAlbumSong(data.songs)
    } catch (err) {
      toast.error(err.response.data.message || "Something went Wrong!");
    }
  }

  const searchSongs = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    const results = songs.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.singer.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    fetchAlbum()
    fetchAllSongs()
  }, [])
  return (
    <SongContext.Provider value={{
      createAlbum,
      albums,
      addSong,
      songs,
      loading,
      thumbnailSong,
      deleteSong,
      fetchSingleSong,
      setSelectedSong,
      setIsPlaying,
      isPlaying,
      singleSong,
      selectedSong,
      nextMusic,
      prevMusic,
      setIndex,
      fetchSongbyAlbum,
      albumData,
      albumSong,
      setVolume,
      volume,
      searchResults,
      searchSongs,
      audioRef,
      setProgress,
      progress,
    }}>
      {children}
      <Toaster />
    </SongContext.Provider>
  )
}

export const useSongContext = () => useContext(SongContext);