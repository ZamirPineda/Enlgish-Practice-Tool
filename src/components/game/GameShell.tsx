import React from "react";

interface GameShellProps {
  hasStarted: boolean;
  startScreen: React.ReactNode;
  children: React.ReactNode;
  pageClassName?: string;
  contentClassName?: string;
}

const DEFAULT_PAGE_CLASSNAME =
  "flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-4 sm:pb-8";
const DEFAULT_CONTENT_CLASSNAME = "max-w-4xl mx-auto space-y-6";

const GameShell: React.FC<GameShellProps> = ({
  hasStarted,
  startScreen,
  children,
  pageClassName = DEFAULT_PAGE_CLASSNAME,
  contentClassName = DEFAULT_CONTENT_CLASSNAME,
}) => {
  return (
    <div className={pageClassName}>
      {!hasStarted ? startScreen : null}
      {hasStarted ? <div className={contentClassName}>{children}</div> : null}
    </div>
  );
};

export default GameShell;

