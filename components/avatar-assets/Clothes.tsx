import React from "react";

export const ClothesOptions: Record<
  string,
  React.FC<{ clothesColor: string }>
> = {
  "shirt-crew": ({ clothesColor }) => (
    <g id="clothes-shirt-crew">
      {/* Body / Shoulders */}
      <path
        d="M 120 500 Q 120 400 230 430 L 270 430 Q 380 400 380 500 Z"
        fill={clothesColor}
        stroke="black"
        strokeWidth="4"
      />
      {/* Collar */}
      <path
        d="M 230 430 Q 250 450 270 430"
        fill="none"
        stroke="black"
        strokeWidth="4"
      />
    </g>
  ),
  "suit-jacket": ({ clothesColor }) => (
    <g id="clothes-suit-jacket">
      {/* Inner Shirt */}
      <path
        d="M 120 500 Q 120 400 230 430 L 270 430 Q 380 400 380 500 Z"
        fill="#ffffff"
        stroke="black"
        strokeWidth="4"
      />
      {/* Tie */}
      <path
        d="M 245 440 L 255 440 L 255 500 L 250 510 L 245 500 Z"
        fill="#b91c1c"
      />
      {/* Jacket */}
      <path
        d="M 100 500 Q 110 390 230 430 L 240 500 Z"
        fill={clothesColor}
        stroke="black"
        strokeWidth="4"
      />
      <path
        d="M 400 500 Q 390 390 270 430 L 260 500 Z"
        fill={clothesColor}
        stroke="black"
        strokeWidth="4"
      />
    </g>
  ),
};
