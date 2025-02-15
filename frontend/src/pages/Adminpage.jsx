import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/Usercontext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSongContext } from '../context/Songcontext'
import { MdOutlineDelete } from "react-icons/md";


const Adminpage = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const { createAlbum, albums, addSong, loading, songs, thumbnailSong, deleteSong } = useSongContext()

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);



  // console.log(albums)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null);
  const [singer, setSinger] = useState('')
  const [album, setAlbum] = useState('')

  const addThumbnailAlbum = (e) => {
    console.log(e.target.files)
    setFile(e.target.files[0])
  }

  const handleAlbum = (e) => {
    e.preventDefault()
    createAlbum(title, description, file)
    setTitle("");
    setDescription("");
    setFile(null);
  }


  const handleSong = (e) => {
    e.preventDefault()
    addSong(title, description, singer, file, album)
    setTitle("");
    setDescription("");
    setSinger("");
    setFile(null);
    setAlbum("")
  }

  const thumnailSongHandler = (id) => {
    thumbnailSong(id, file)
    setFile(null);
  }

  const handleDelete = (id) => {
    if (confirm("are you sure you want to delete this song")) {
      deleteSong(id);
    }
  }


  return (
    <div className='min-h-screen bg-green-100 p-5 text-black'>
      <Link
        to="/"
        className="bg-green-500 text-black font-bold py-3 px-6 rounded-full"
      >
        Go to home page
      </Link>

      {/* album ke liye */}
      <form action=""
        className='m-10 bg-emerald-100 text-black p-5 shadow-lg shadow-green-500/50'
        onSubmit={handleAlbum}
      >
        <div className='mb-4'>
          <label htmlFor="title" className='block text-2xl pl-1 mb-2'>Title</label>
          <input type="text"
            name='title'
            placeholder='Title'
            className='px-2 py-4 bg-green-500 w-full rounded-lg text-xl'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="description" className='block text-2xl pl-1 mb-2'>Description</label>
          <input type="text"
            name='description'
            placeholder='Description'
            value={description}
            className='px-2 py-4 bg-green-500 w-full rounded-lg text-xl'
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor='thumbnail' className="block text-2xl pl-1 mb-2">Thumbnail</label>
          <input
            type="file"
            name='file'
            className="px-2 py-4 bg-green-500 w-full rounded-lg text-xl
            file:bg-white file:text-green-500 file:border file:border-green-500 
               file:px-4 file:py-0 file:rounded-lg file:cursor-pointer"
            accept="image/*"
            required
            onChange={addThumbnailAlbum}
          />
        </div>
        <button className="bg-green-500 text-black font-bold py-3 px-6 rounded-full"> {loading ? "Please Wait..." : "Add Album"} </button>
      </form>

      {/* song ke liye */}
      <form action=""
        className='m-10 bg-emerald-100 text-black p-5 shadow-lg shadow-green-500/50'
        onSubmit={handleSong}
      >
        <div className='mb-4'>
          <label htmlFor="title" className='block text-2xl pl-1 mb-2'>Title</label>
          <input type="text"
            name='title'
            placeholder='Title'
            value={title}
            className='px-2 py-4 bg-green-500 w-full rounded-lg text-xl'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="description" className='block text-2xl pl-1 mb-2'>Description</label>
          <input type="text"
            name='description'
            placeholder='Description'
            value={description}
            className='px-2 py-4 bg-green-500 w-full rounded-lg text-xl'
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="singer" className='block text-2xl pl-1 mb-2'>Singer</label>
          <input type="text"
            name='singer'
            placeholder='Singer'
            value={singer}
            className='px-2 py-4 bg-green-500 w-full rounded-lg text-xl'
            onChange={(e) => setSinger(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor='thumbnail' className="block text-2xl pl-1 mb-2">Audio</label>
          <input
            type="file"
            name='file'
            className="px-2 py-4 bg-green-500 w-full rounded-lg text-xl
            file:bg-white file:text-green-500 file:border file:border-green-500 
               file:px-4 file:py-0 file:rounded-lg file:cursor-pointer"
            accept="audio/*"
            onChange={addThumbnailAlbum}
            required
          />
        </div>
        <select
          className="px-2 py-4 bg-green-500 w-full rounded-lg text-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-300 text-black"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        >
          <option value="" className='bg-green-300'>Choose Album</option>
          {albums &&
            albums.map((e, i) => (
              <option value={e._id} key={i}>
                {e.title}
              </option>
            ))}
        </select>
        <button className="bg-green-500 text-black font-bold py-3 px-6 rounded-full"> {loading ? "Please Wait..." : "Add Song"} </button>
      </form>

      <div className='m-10 bg-emerald-100 text-black p-5 shadow-lg shadow-green-500/50'>
        <h1 className='text-2xl pl-1 mb-2'>Added Songs</h1>
        <div className='flex justify-center md:justify-start gap-2 items-center flex-wrap'>
          {songs && songs.map((e) => (
            <div className='rounded-md shadow-lg shadow-emerald-500/60 mb-3 p-3'>
              {e.thumbnail ? (
                <img src={e.thumbnail.url} alt="thumbnail" className='w-[150px]' />
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <input type="file" onChange={addThumbnailAlbum}
                    className='file:bg-white file:text-green-500 file:border file:border-green-500 
               file:px-4 file:py-0 file:rounded-lg file:cursor-pointer'
                  />
                  <button
                    onClick={() => thumnailSongHandler(e._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Add Thumbnail
                  </button>
                </div>
              )}
              <h3>{e.title}</h3>
              <h3>{e.singer}</h3>
              <h3>{e.description}</h3>
              <button className='px-1 py-2 bg-emerald-200 rounded-md'
                onClick={() => handleDelete(e._id)}
              >
                <MdOutlineDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Adminpage
