import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = ({ previewUrl, onPlay, onPause }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // Reset player when URL changes
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }, [previewUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      onPause?.();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;

    if (duration) {
      setProgress((current / duration) * 100);
      setCurrentTime(current);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
    setProgress(clickPosition * 100);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full bg-gray-100 rounded-lg p-4 shadow-md">
      <audio
        ref={audioRef}
        src={previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-primary text-white hover:bg-opacity-90 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <div className="flex-1">
          <div
            ref={progressBarRef}
            className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div
              className="bg-primary h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
