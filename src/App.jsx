import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SongCard from "./components/SongCard";
import GuessInput from "./components/GuessInput";
import GameControls from "./components/GameControls";
import Scoreboard from "./components/Scoreboard";
import AudioPlayer from "./components/AudioPlayer";
import ArtistInput from "./components/ArtistInput";

function App() {
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (artist) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/songs/${artist}`)
        .then((response) => {
          setSongs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch songs");
          setLoading(false);
        });
    }
  }, [artist]);

  const handleGuess = useCallback(
    (guess) => {
      const currentSong = songs[currentIndex];
      if (
        currentSong &&
        guess.toLowerCase() === currentSong.trackName.toLowerCase()
      ) {
        setScore((prevScore) => prevScore + 1);
        nextSong();
      }
    },
    [currentIndex, songs]
  );

  const resetGame = useCallback(() => {
    setScore(0);
    setCurrentIndex(0);
    setArtist(null);
  }, []);

  const nextSong = useCallback(() => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You've completed the list!");
    }
  }, [currentIndex, songs.length]);

  const handleArtistSubmit = (artistName) => {
    setArtist(artistName);
    setSongs([]);
    setError(null);
    setScore(0);
    setCurrentIndex(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app">
      <h1>Guess the Song</h1>
      {artist ? (
        songs.length > 0 && (
          <>
            <SongCard artwork={songs[currentIndex].artwork} isPlaying={false}>
              <AudioPlayer previewUrl={songs[currentIndex].previewUrl} />
            </SongCard>
            <GuessInput onGuess={handleGuess} />
            <GameControls onReset={resetGame} />
            <Scoreboard score={score} />
          </>
        )
      ) : (
        <ArtistInput onArtistSubmit={handleArtistSubmit} />
      )}
    </div>
  );
}

export default App;
