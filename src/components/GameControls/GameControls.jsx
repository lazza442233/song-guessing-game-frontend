import React from "react";

const GameControls = ({ onReset, onSkip, songCount, currentIndex }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-500">
          Song {currentIndex + 1} of {songCount}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Skip
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-opacity-90 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
