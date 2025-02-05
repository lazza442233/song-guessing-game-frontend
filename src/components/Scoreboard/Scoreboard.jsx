import React from "react";

const Scoreboard = ({ score }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-bold">Scoreboard</h2>
      <p className="text-xl">Score: {score}</p>
    </div>
  );
};

export default Scoreboard;
