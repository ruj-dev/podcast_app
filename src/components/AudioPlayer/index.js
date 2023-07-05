import React, { useRef, useState } from 'react'
import "./style.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

function AudioPlayer({ audioSrc,image }) {
  const audioRef = useRef();
  const [duration, setDuration] = useState("");
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const handleDuration = (e) => {
    setDuration(e.target.value);
    
  }
  const tooglePlay = () => {
     playing?
      setPlaying(false):setPlaying(true);
    
  }
  const toggleMute = () => {
    isMute ? setIsMute(false) : setIsMute(true);
  };
  return (
    <div className="custom-audio-player">
      <img src={image} className="display-image-player" />
      <audio ref={audioRef} src={audioSrc} />
      <p onClick={tooglePlay}>{playing ? <FaPlay /> : <FaPause />}</p>

      <div className="duration-flex">
        <p>0:00</p>
        <input
          type="range"
          onChange={handleDuration}
          className="duration-range"
        />
        <p>21:00</p>
        <p className="audio-btn" onClick={toggleMute}>
          {!isMute ? <FaVolumeUp /> : <FaVolumeMute />}
        </p>
      </div>
    </div>
  );
}

export default AudioPlayer