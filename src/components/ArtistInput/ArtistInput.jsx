import React, { useState } from "react";

const ArtistInput = ({ onArtistSubmit }) => {
  const [artistName, setArtistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onArtistSubmit(artistName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter artist name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ArtistInput;
