import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import App from "@/App";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";
import { installGlobalErrorLogging } from "@/lib/logger";
import { initializeSentry } from "@/lib/sentry";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
initializeSentry();
installGlobalErrorLogging();
root.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>,
);
