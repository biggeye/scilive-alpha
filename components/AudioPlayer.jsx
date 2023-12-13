'use client'

import { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@/app/icons'; // Adjust the path as necessary

function AudioPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
  
    // Update audio play/pause state when isPlaying changes
    useEffect(() => {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying]);
  
    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
    };
  
    return (
        <button
        onClick={handlePlayPause}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <audio ref={audioRef} src={src} hidden />
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    );
  }
  
  export default AudioPlayer;