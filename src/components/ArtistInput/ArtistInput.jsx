import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtistInput = ({ onArtistSubmit }) => {
  const [artistName, setArtistName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentArtists, setRecentArtists] = useState([]);

  useEffect(() => {
    // Load recent artists from localStorage
    const savedArtists = localStorage.getItem("recentArtists");
    if (savedArtists) {
      setRecentArtists(JSON.parse(savedArtists));
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (artistName.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // You would implement this endpoint on your server
        const response = await axios.get(
          `http://localhost:5000/api/artists/search?q=${encodeURIComponent(artistName)}`
        );
        setSuggestions(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [artistName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artistName.trim()) return;

    // Save to recent artists
    const updatedRecents = [
      artistName,
      ...recentArtists.filter(artist => artist !== artistName)
    ].slice(0, 5);
    
    setRecentArtists(updatedRecents);
    localStorage.setItem("recentArtists", JSON.stringify(updatedRecents));
    
    onArtistSubmit(artistName);
  };

  const selectArtist = (name) => {
    setArtistName(name);
    setSuggestions([]);
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter artist name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          {isLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
              {suggestions.map((artist, index) => (
                <div 
                  key={index}
                  onClick={() => selectArtist(artist.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {artist.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button 
          type="submit"
          className="w-full p-3 bg-primary text-white rounded hover:bg-opacity-90 transition"
        >
          Start Game
        </button>
      </form>
      
      {recentArtists.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm text-gray-500 mb-2">Recent Artists</h3>
          <div className="flex flex-wrap gap-2">
            {recentArtists.map((artist, index) => (
              <button
                key={index}
                onClick={() => selectArtist(artist)}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition"
              >
                {artist}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistInput;