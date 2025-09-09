import { cn } from "@/lib/utils";

interface ParticipantCardProps {
  id: number;
  name: string;
  photo?: string;
  status?: "active" | "eliminated" | "winner";
  className?: string;
}

export const ParticipantCard = ({ 
  id, 
  name, 
  photo, 
  status = "active", 
  className 
}: ParticipantCardProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center p-4 rounded-lg transition-all duration-300",
        status === "active" && "bg-card border border-border",
        status === "eliminated" && "bg-muted/50 opacity-60",
        status === "winner" && "bg-gradient-gold animate-pulse-glow",
        className
      )}
    >
      <div
        className={cn(
          "w-20 h-20 rounded-full overflow-hidden border-2 mb-2",
          status === "active" && "border-primary",
          status === "eliminated" && "border-muted",
          status === "winner" && "border-accent"
        )}
      >
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <h3
        className={cn(
          "text-sm font-semibold text-center",
          status === "eliminated" && "text-muted-foreground",
          status === "winner" && "text-accent-foreground"
        )}
      >
        {name}
      </h3>
      
      {status === "winner" && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
          <span className="text-xs">👑</span>
        </div>
      )}
    </div>
  );
};