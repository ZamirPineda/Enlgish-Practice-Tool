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
    <label className="flex items-center cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          role="switch"
          aria-checked={checked}
          aria-label={label}
        />
        <div
          className={`block w-10 h-6 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background ${
            checked ? "bg-accent" : "bg-surface-hover"
          }`}
          aria-hidden="true"
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? "transform translate-x-4" : ""}`}
          aria-hidden="true"
        ></div>
      </div>
      <div className="ml-3 text-sm font-bold text-text-secondary">{label}</div>
    </label>
  );
};

export default ToggleSwitch;
