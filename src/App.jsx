import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SongCard from "./components/SongCard";
import GuessInput from "./components/GuessInput";
import GameControls from "./components/GameControls";
import Scoreboard from "./components/Scoreboard";
import AudioPlayer from "./components/AudioPlayer";
import ArtistInput from "./components/ArtistInput";
import Toast from "./components/Toast";

function App() {
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const [gameState, setGameState] = useState("input"); // input, playing, won, lost
  const [attempts, setAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const MAX_ATTEMPTS = 3;

  useEffect(() => {
    if (artist) {
      setLoading(true);
      setGameState("loading");

      axios
        .get(`http://localhost:5000/api/songs/artist/${artist}`)
        .then((response) => {
          if (response.data.length === 0) {
            setError("No songs found for this artist");
            setGameState("input");
          } else {
            // Shuffle songs for more fun gameplay
            const shuffledSongs = [...response.data].sort(
              () => Math.random() - 0.5
            );
            setSongs(shuffledSongs);
            setGameState("playing");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("API error:", error);
          setError(
            error.response?.status === 404
              ? "Artist not found"
              : "Failed to fetch songs. Please check your connection and try again."
          );
          setGameState("input");
          setLoading(false);
        });
    }
  }, [artist]);

  const handleGuess = useCallback(
    (guess) => {
      const currentSong = songs[currentIndex];
      setAttempts((prev) => prev + 1);

      if (!currentSong) return;

      // Make comparison case-insensitive and trim whitespace
      const normalizedGuess = guess.toLowerCase().trim();
      const normalizedTrackName = currentSong.trackName.toLowerCase().trim();

      if (normalizedGuess === normalizedTrackName) {
        // Correct guess
        setScore((prevScore) => prevScore + 1);
        setToast({
          visible: true,
          message: "Correct! Great job!",
          type: "success",
        });

        setTimeout(() => {
          setToast({ visible: false, message: "", type: "" });
          nextSong();
        }, 1500);
      } else if (attempts >= MAX_ATTEMPTS - 1) {
        // Used all attempts
        setToast({
          visible: true,
          message: `The song was "${currentSong.trackName}"`,
          type: "error",
        });

        setTimeout(() => {
          setToast({ visible: false, message: "", type: "" });
          nextSong();
        }, 2000);
      } else {
        // Incorrect but has more attempts
        setToast({
          visible: true,
          message: `Try again! ${MAX_ATTEMPTS - attempts - 1} attempts left`,
          type: "warning",
        });

        setTimeout(() => {
          setToast({ visible: false, message: "", type: "" });
        }, 1500);
      }
    },
    [currentIndex, songs, attempts]
  );

  const resetGame = useCallback(() => {
    setScore(0);
    setCurrentIndex(0);
    setArtist(null);
    setAttempts(0);
    setGameState("input");
    setError(null);
  }, []);

  const nextSong = useCallback(() => {
    setAttempts(0);

    if (currentIndex < songs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // Game completed
      setGameState("won");
      setToast({
        visible: true,
        message: `Game over! Final score: ${score}/${songs.length}`,
        type: "success",
      });
    }
  }, [currentIndex, songs.length, score]);

  const skipSong = useCallback(() => {
    setToast({
      visible: true,
      message: `Skipped! The song was "${songs[currentIndex]?.trackName}"`,
      type: "info",
    });

    setTimeout(() => {
      setToast({ visible: false, message: "", type: "" });
      nextSong();
    }, 2000);
  }, [currentIndex, songs, nextSong]);

  const handleArtistSubmit = (artistName) => {
    setArtist(artistName);
    setSongs([]);
    setError(null);
    setScore(0);
    setCurrentIndex(0);
    setAttempts(0);
  };

  const getCurrentSong = () => {
    return songs[currentIndex];
  };

  if (loading) {
    return (
      <div className="app flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-primary mb-8">Guess the Song</h1>
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-600">Loading songs...</p>
      </div>
    );
  }

  return (
    <div className="app flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Guess the Song</h1>

      {toast.visible && <Toast message={toast.message} type={toast.type} />}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
          <p>{error}</p>
        </div>
      )}

      {gameState === "input" && (
        <div className="w-full max-w-md">
          <ArtistInput onArtistSubmit={handleArtistSubmit} />
        </div>
      )}

      {gameState === "playing" && songs.length > 0 && (
        <div className="w-full max-w-md space-y-6">
          <SongCard artwork={getCurrentSong()?.artwork} isPlaying={isPlaying}>
            <AudioPlayer
              previewUrl={getCurrentSong()?.previewUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </SongCard>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500 mb-2">
              Attempt {attempts + 1} of {MAX_ATTEMPTS}
            </p>
            <GuessInput
              onGuess={handleGuess}
              disabled={attempts >= MAX_ATTEMPTS}
            />
          </div>

          <GameControls
            onReset={resetGame}
            onSkip={skipSong}
            songCount={songs.length}
            currentIndex={currentIndex}
          />

          <Scoreboard
            score={score}
            total={songs.length}
            currentSong={currentIndex + 1}
          />
        </div>
      )}

      {gameState === "won" && (
        <div className="text-center space-y-6 w-full max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Game Completed!
            </h2>
            <p className="text-lg">
              Your final score: {score}/{songs.length}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {score === songs.length
                ? "Perfect score! You're a music expert!"
                : `You got ${Math.round(
                    (score / songs.length) * 100
                  )}% correct!`}
            </p>
          </div>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-opacity-90 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
