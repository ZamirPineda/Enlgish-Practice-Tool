import React from "react";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="flex items-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-full text-left"
    >
      <div className="relative" aria-hidden="true">
        <div
          className={`block w-10 h-6 rounded-full transition-colors ${
            checked ? "bg-accent" : "bg-surface-hover"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? "transform translate-x-4" : ""}`}
        ></div>
      </div>
      <div
        className="ml-3 text-sm font-bold text-text-secondary"
        aria-hidden="true"
      >
        {label}
      </div>
    </button>
  );
};

export default ToggleSwitch;
