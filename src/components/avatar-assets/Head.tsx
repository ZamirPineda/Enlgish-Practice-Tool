import React from "react";

export const HeadOptions: Record<string, React.FC<{ skinColor: string }>> = {
  "base-round": ({ skinColor }) => (
    <g id="head-base-round">
      {/* Neck */}
      <path
        d="M 230 400 L 230 450 L 270 450 L 270 400 Z"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
      />
      <path
        d="M 230 400 L 270 400 L 270 420 L 230 420 Z"
        fill="rgba(0,0,0,0.1)"
      />{" "}
      {/* Neck shadow */}
      {/* Face */}
      <path
        d="M 150 200 Q 150 400 250 420 Q 350 400 350 200 Q 350 100 250 100 Q 150 100 150 200"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
      />
      {/* Ears */}
      <circle
        cx="140"
        cy="270"
        r="25"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
      />
      <circle
        cx="360"
        cy="270"
        r="25"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
      />
    </g>
  ),
  "base-sharp": ({ skinColor }) => (
    <g id="head-base-sharp">
      {/* Neck */}
      <path
        d="M 235 400 L 235 450 L 265 450 L 265 400 Z"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
      />
      <path
        d="M 235 400 L 265 400 L 265 420 L 235 420 Z"
        fill="rgba(0,0,0,0.1)"
      />{" "}
      {/* Neck shadow */}
      {/* Face */}
      <path
        d="M 160 200 L 160 330 L 250 440 L 340 330 L 340 200 Q 340 100 250 100 Q 160 100 160 200"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Ears */}
      <path
        d="M 160 250 L 130 260 L 130 290 L 160 300 Z"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
      />
      <path
        d="M 340 250 L 370 260 L 370 290 L 340 300 Z"
        fill={skinColor}
        stroke="black"
        strokeWidth="4"
      />
    </g>
  ),
};
