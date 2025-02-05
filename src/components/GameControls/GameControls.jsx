import React from "react";

const GameControls = ({ onReset }) => {
  return (
    <div className="flex gap-4">
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
