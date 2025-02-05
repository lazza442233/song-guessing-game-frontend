import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState("Drake");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/songs/${artist}`).then((response) => {
      setSongs(response.data);
    });
  }, [artist]);

  return (
    <div>
      <h1>Guess the Song!</h1>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Enter artist name"
      />
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <img src={song.artwork} alt={song.trackName} />
            <p>
              {song.artistName} - {song.trackName}
            </p>
            <audio controls>
              <source src={song.previewUrl} type="audio/mpeg" />
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
