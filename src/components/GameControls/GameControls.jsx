import React, { useState } from "react";

const GameControls = ({ onReset, onPlayPause, isPlaying }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onPlayPause}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-secondary text-white rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default GameControls;
