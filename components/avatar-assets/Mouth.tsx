import React from "react";

export const MouthOptions: Record<string, React.FC> = {
  "mouth-smile": () => (
    <g id="mouth-smile">
      <path
        d="M 220 330 Q 250 360 280 330"
        fill="none"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  ),
  "mouth-open": () => (
    <g id="mouth-open">
      <path
        d="M 230 330 Q 250 320 270 330 Q 270 360 250 360 Q 230 360 230 330 Z"
        fill="#b91c1c"
        stroke="black"
        strokeWidth="4"
      />
      {/* Teeth */}
      <path d="M 233 331 Q 250 335 267 331" fill="#fff" strokeWidth="0" />
    </g>
  ),
  "mouth-serious": () => (
    <g id="mouth-serious">
      <line
        x1="230"
        y1="340"
        x2="270"
        y2="340"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  ),
};
