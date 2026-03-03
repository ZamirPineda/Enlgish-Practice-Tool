import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface GameStartPanelProps {
  title: string;
  description: string;
  onStart: () => void;
  startLabel?: string;
  children?: React.ReactNode;
}

const GameStartPanel: React.FC<GameStartPanelProps> = ({
  title,
  description,
  onStart,
  startLabel = "Iniciar",
  children,
}) => {
  return (
    <Card className="max-w-3xl mx-auto text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-text-primary">{title}</h2>
        <p className="text-text-secondary">{description}</p>
      </div>

      {children ? <div className="space-y-4">{children}</div> : null}

      <Button variant="primary" size="lg" onClick={onStart}>
        {startLabel}
      </Button>
    </Card>
  );
};

export default GameStartPanel;
