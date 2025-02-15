import React from 'react'
import Layout from '../components/Layout'
import { useSongContext } from '../context/Songcontext'
import Albumitem from '../components/Albumitem'
import Songitem from '../components/Songitem'
import PlaylistCard from '../components/PlaylistCard'
import { useNavigate } from 'react-router'

const Homepage = () => {

  const { searchResults, songs, albums } = useSongContext();
  // console.log(albums)
  // console.log(songs)
  const navigate= useNavigate()
  const displayedSongs = searchResults.length > 0 && searchResults
  return (
    <div className='h-screen'>
      <Layout>
        <div className='bg-gradient-to-b from-[#172B2B] to-zinc-900 w-[100%] md:w-[74%] m-2 md:m-0 rounded-xl h-full overflow-y-auto p-2 scrollbar-hidden'>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl mx-3">Featured Charts</h1>
            <div onClick={() => navigate("/playlist")} className='md:hidden block'>
              <PlaylistCard />
            </div>
            <div className=" text-slate-300 text-2xl font-bold my-5 mx-3">
              <h1>Albums</h1>
            </div>
            <div className="flex overflow-auto">
              {albums.map((e, i) => (
                <Albumitem
                  key={i}
                  image={e.thumbnail.url}
                  name={e.title}
                  desc={e.description}
                  id={e._id}
                />
              ))}
            </div>
            {displayedSongs.length > 0 && (
              <div>
                <div className="text-slate-300 text-2xl font-bold my-5 mx-3">
                  <h1>Search songs...</h1>
                </div>
                <div className="flex overflow-auto">
                  {displayedSongs.map((e, i) => (
                    <Songitem
                      key={i}
                      image={e.thumbnail.url}
                      name={e.title}
                      singer={e.singer}
                      id={e._id}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className=" text-slate-300 text-2xl font-bold my-5 mx-3">
              <h1>Today Biggest hit's</h1>
            </div>
            <div className="flex overflow-auto">
              {songs && songs.map((e, i) => (
                <Songitem
                  key={i}
                  image={e.thumbnail.url}
                  name={e.title}
                  singer={e.singer}
                  id={e._id}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Homepage
