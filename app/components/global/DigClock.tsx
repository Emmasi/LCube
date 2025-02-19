"use client"
import { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex px-20 text-[#282a36] text-xs">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[#282a36]"
          viewBox="0 0 40 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default DigitalClock;
