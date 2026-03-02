import React from "react";

export const EyesOptions: Record<string, React.FC<{ eyeColor: string }>> = {
  "eyes-happy": ({ eyeColor }) => (
    <g id="eyes-happy">
      {/* Left Eye */}
      <path
        d="M 180 250 Q 200 220 220 250"
        fill="none"
        stroke="black"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Right Eye */}
      <path
        d="M 280 250 Q 300 220 320 250"
        fill="none"
        stroke="black"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  ),
  "eyes-anime": ({ eyeColor }) => (
    <g id="eyes-anime">
      {/* Eyebrows */}
      <path
        d="M 170 210 Q 200 200 230 215"
        fill="none"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 330 210 Q 300 200 270 215"
        fill="none"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Left Eye */}
      <ellipse
        cx="200"
        cy="250"
        rx="15"
        ry="25"
        fill="white"
        stroke="black"
        strokeWidth="4"
      />
      <ellipse cx="200" cy="250" rx="10" ry="18" fill={eyeColor} />
      <circle cx="195" cy="240" r="4" fill="white" />

      {/* Right Eye */}
      <ellipse
        cx="300"
        cy="250"
        rx="15"
        ry="25"
        fill="white"
        stroke="black"
        strokeWidth="4"
      />
      <ellipse cx="300" cy="250" rx="10" ry="18" fill={eyeColor} />
      <circle cx="295" cy="240" r="4" fill="white" />
    </g>
  ),
};
