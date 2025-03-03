import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "info", duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 max-w-xs ${typeStyles[type]} text-white py-2 px-4 rounded shadow-lg animate-fade-in`}
    >
      <div className="flex items-center">
        {type === "success" && <span className="mr-2">✓</span>}
        {type === "error" && <span className="mr-2">✗</span>}
        {type === "warning" && <span className="mr-2">⚠</span>}
        {type === "info" && <span className="mr-2">ℹ</span>}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
