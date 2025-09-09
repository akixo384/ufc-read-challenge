import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  className?: string;
}

export const Timer = ({ duration, onComplete, className }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && onComplete) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div
        className={cn(
          "text-6xl font-bold text-center min-w-[200px]",
          timeLeft <= 10 && "text-destructive animate-countdown",
          timeLeft > 10 && "text-primary"
        )}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      
      <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-linear",
            timeLeft <= 10 ? "bg-destructive" : "bg-primary"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-sm text-muted-foreground">
        {isRunning ? "Время на выполнение" : "Время истекло"}
      </div>
    </div>
  );
};