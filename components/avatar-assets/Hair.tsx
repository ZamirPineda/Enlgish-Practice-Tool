import React from "react";

export const BackHairOptions: Record<
  string,
  React.FC<{ hairColor: string }>
> = {
  "back-short": ({ hairColor }) => (
    <g id="back-short">
      <path
        d="M 130 250 Q 150 100 250 80 Q 350 100 370 250 Q 370 300 350 320 Q 300 250 250 280 Q 200 250 150 320 Q 130 300 130 250 Z"
        fill={hairColor}
        stroke="black"
        strokeWidth="4"
      />
    </g>
  ),
  "back-long": ({ hairColor }) => (
    <g id="back-long">
      <path
        d="M 140 200 L 100 450 L 170 450 L 150 280 L 350 280 L 330 450 L 400 450 L 360 200 Q 350 80 250 80 Q 150 80 140 200"
        fill={hairColor}
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </g>
  ),
  none: () => <g id="back-none"></g>,
};

export const FrontHairOptions: Record<
  string,
  React.FC<{ hairColor: string }>
> = {
  "bangs-straight": ({ hairColor }) => (
    <g id="front-bangs-straight">
      <path
        d="M 140 180 Q 250 150 360 180 L 350 210 L 320 190 L 300 210 L 250 180 L 200 210 L 180 190 L 150 210 Z"
        fill={hairColor}
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </g>
  ),
  "bangs-spiky": ({ hairColor }) => (
    <g id="front-bangs-spiky">
      <path
        d="M 130 180 L 160 120 L 180 160 L 230 90 L 260 170 L 320 110 L 340 170 L 380 130 L 360 220 L 330 190 L 300 240 L 270 190 L 230 230 L 190 190 L 150 220 Z"
        fill={hairColor}
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </g>
  ),
  none: () => <g id="front-none"></g>,
};
