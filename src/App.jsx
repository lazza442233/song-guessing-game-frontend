import React, { useEffect, useState } from "react";
import axios from "axios";
import SongCard from "./components/SongCard";
import GuessInput from "./components/GuessInput";
import GameControls from "./components/GameControls";
import Scoreboard from "./components/Scoreboard";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState("Drake");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/songs/${artist}`).then((response) => {
      setSongs(response.data);
    });
  }, [artist]);

  const handleGuess = (guess) => {
    const currentSong = songs[currentIndex];
    if (
      currentSong &&
      guess.toLowerCase() === currentSong.trackName.toLowerCase()
    ) {
      setScore(score + 1);
      nextSong();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const nextSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("You've completed the list!");
    }
  };

  return (
    <div className="app">
      <h1>Guess the Song</h1>
      {songs.length > 0 && (
        <>
          <SongCard artwork={songs[currentIndex].artwork} isPlaying={isPlaying}>
            <AudioPlayer
              previewUrl={songs[currentIndex].previewUrl}
              onPlay={handlePlayPause}
              onPause={handlePlayPause}
            />
          </SongCard>
          <GuessInput
            onGuess={handleGuess}
            disabled={!isPlaying || currentIndex >= songs.length}
          />
          <GameControls
            onPlayPause={handlePlayPause}
            isPlaying={isPlaying}
            onNext={nextSong}
            onReset={resetGame}
          />
          <Scoreboard score={score} />
        </>
      )}
    </div>
  );
}

export default App;
