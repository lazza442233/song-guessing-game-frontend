import React from "react";

const Scoreboard = ({ score, total, currentSong }) => {
  const calculatePercentage = () => {
    if (currentSong === 1 && score === 0) return 0;
    return Math.round((score / (currentSong - 1)) * 100) || 0;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-lg font-bold text-gray-800">Scoreboard</h2>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xl">Score: {score}</p>
        <span className="text-sm text-gray-500">
          {calculatePercentage()}% correct
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 w-full bg-gray-200 rounded-full">
        <div
          className="h-2 bg-primary rounded-full transition-all duration-300"
          style={{ width: `${(score / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Scoreboard;
