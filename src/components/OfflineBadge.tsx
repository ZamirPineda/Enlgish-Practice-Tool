import React from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { WifiOff } from "lucide-react";

export const OfflineBadge: React.FC = () => {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#ef4444",
        color: "white",
        padding: "8px 16px",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 9999,
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        fontWeight: 500,
        fontSize: "14px",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
      role="alert"
    >
      <WifiOff size={16} />
      <span>Estás sin conexión</span>
    </div>
  );
};
