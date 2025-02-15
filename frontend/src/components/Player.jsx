import React, { useEffect, useRef, useState } from 'react'
import { useSongContext } from '../context/Songcontext'
import { GrChapterNext, GrChapterPrevious, } from 'react-icons/gr'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaVolumeDown } from 'react-icons/fa'

const Player = () => {
  const { singleSong, fetchSingleSong, setSelectedSong, setIsPlaying, isPlaying, selectedSong, nextMusic,
    prevMusic, setVolume, volume, progress, setProgress, audioRef, } = useSongContext()
  // const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log("Playback error:", err));
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }
    const handleTimeUpdate = () => setProgress(audio.currentTime)
    const handleEnded = () => {
      setIsPlaying(false)
      nextMusic()
      setTimeout(() => setIsPlaying(true), 100)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    };
  }, [singleSong, selectedSong]);


  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // audio.currentTime = progress

    // console.log("volume",volume,"volume/100",volume/100)
    audio.volume = volume / 100

    if (isPlaying) {
      audio.play().catch((err) => console.log("Playback error:", err));
    } else {
      audio.pause();
    }
  }, [singleSong, isPlaying]);

  const handleProgress = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  }

  const formatTime = (time) => {
    if (!time || NaN) return "0:00";
    else {
      const minute = Math.floor(time / 60)
      const second = Math.floor(time % 60)
      return `${minute}:${second < 10 ? "0" : ""}${second}`
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    audioRef.current.volume = newVolume / 100
  }

  return (
    <div className='h-[100%] p-4 flex'>
      {singleSong &&
        <div className="h-full lg:flex items-center gap-4 md:w-[30%] md-[20%]">
          <img
            src={
              singleSong.thumbnail
                ? singleSong.thumbnail.url
                : ""
            }
            className="w-12 h-13 rounded-full"
            alt=""
          />
          <div className="md:block hidden">
            <p className='text-[16px] font-bold'>{singleSong.title && singleSong.title.slice(0, 20)}...</p>
            <p className='text-[12px] text-gray-500 capitalize'>{singleSong.description && singleSong.description.slice(0, 30)}...</p>
          </div>

          <div className="flex flex-col items-center gap-1 m-auto">
            {singleSong && singleSong.audio && (
              <audio ref={audioRef} src={singleSong.audio.url} />
            )}
          </div>

        </div>
      }

      <div className="flex flex-col items-center gap-2 m-auto">
        <div className="flex justify-between w-full text-xs text-gray-400">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          className="w-[120px] md:w-[300px] appearance-none h-1 rounded-lg transition-all"
          // {...console.log("progress",progress)}
          value={(progress / duration) * 100 || 0}
          onChange={handleProgress}
          style={{
            background: `linear-gradient(to right,
      #bbf7d0 0%, 
      #22c55e ${(progress / duration) * 100}%, 
      #374151 ${(progress / duration) * 100}%, 
      #374151 100%)`,
          }}
        />

        <div className="flex justify-center items-center gap-4">
          <span className="cursor-pointer text-gray-300 hover:text-white" onClick={prevMusic}>
            <GrChapterPrevious className='md:size-[24px] size-4' />
          </span>
          <button
            className="bg-white text-black rounded-full p-2"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause className='md:size-[24px] size-3' color='green' /> : <FaPlay className='md:size-[24px] size-3' />}
          </button>
          <span className="cursor-pointer text-gray-300 hover:text-white" onClick={nextMusic}>
            <GrChapterNext className='md:size-[24px] size-4' />
          </span>
        </div>
      </div>
      <div className='md:w-[15%] w-[90px] flex items-center gap-2'>
        {volume === 0 ? (
          <FaVolumeMute size={20} />
        ) : volume < 50 ? (
          <FaVolumeDown size={20} />
        ) : (
          <FaVolumeUp size={20} />
        )}
        <input type="range"
          className='md:w-[120px] w-full h-1'
          max={100}
          min={0}
          value={volume}
          step={1}
          onChange={handleVolumeChange}
        />
      </div>
    </div>

  )
}

export default Player
