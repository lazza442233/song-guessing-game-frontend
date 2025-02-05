import React, { useState } from "react";

const GuessInput = ({ onGuess, disabled }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(guess);
    setGuess("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={disabled}
        className="flex-1 px-4 py-2 rounded border"
        placeholder="Enter your guess..."
      />
      <button
        type="submit"
        disabled={disabled}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Guess
      </button>
    </form>
  );
};

export default GuessInput;
