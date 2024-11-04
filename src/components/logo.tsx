
import React from "react";

const Logo = ({ width = 40, height = 40 }) => {
  return <div className="logo">
    <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    >

    <circle cx="50" cy="50" r="45" fill="url(#grad1)" />

    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#56CCF2', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2F80ED', stopOpacity: 1 }} />
        </linearGradient>
    </defs>

    <path d="M20,50 a1,1 0 0,1 60,0 a1,1 0 0,1 -60,0" fill="white" />

    <text
        x="50"
        y="57"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fill="#2F80ED"
        textAnchor="middle"
        fontWeight="bold"
      >
        GPT
      </text>
    </svg>
  </div>;
};

export default Logo;