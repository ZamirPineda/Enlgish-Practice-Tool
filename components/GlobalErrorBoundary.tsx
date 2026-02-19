import React from "react";
import { APP_VERSION } from "../utils/appVersion";
import { createIssueReport, logError } from "../utils/logger";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: unknown;
  componentStack?: string;
  copied: boolean;
};

class GlobalErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    copied: false,
  };

  static getDerivedStateFromError(error: unknown): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    this.setState({ componentStack: info.componentStack });
    logError("react.errorboundary", error, {
      componentStack: info.componentStack,
    });
  }

  private handleReportIssue = async () => {
    const report = createIssueReport(
      this.state.error,
      this.state.componentStack,
    );
    try {
      await navigator.clipboard.writeText(report);
      this.setState({ copied: true });
    } catch (error) {
      logError("report.copy.failed", error, { report });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-slate-300 mb-4">
              The app hit an unexpected error. You can reload or report the
              issue.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 font-semibold"
              >
                Reload
              </button>
              <button
                type="button"
                onClick={this.handleReportIssue}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 font-semibold"
              >
                Report issue
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              {this.state.copied ? "Copied report to clipboard." : "Version"}:{" "}
              {APP_VERSION}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
