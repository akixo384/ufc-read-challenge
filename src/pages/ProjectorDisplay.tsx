import { useState } from "react";
import { ParticipantCard } from "@/components/ui/participant-card";
import { Timer } from "@/components/ui/timer";
import { TaskDisplay } from "@/components/ui/task-display";
import { Button } from "@/components/ui/button";

// Mock data - replace with your backend integration
const mockParticipants = [
  { id: 1, name: "Арузхан", photo: "/api/placeholder/80/80", status: "active" as const },
  { id: 2, name: "Диас", photo: "/api/placeholder/80/80", status: "active" as const },
  { id: 3, name: "Асель", photo: "/api/placeholder/80/80", status: "active" as const },
  { id: 4, name: "Ерлан", photo: "/api/placeholder/80/80", status: "active" as const },
  { id: 5, name: "Дина", photo: "/api/placeholder/80/80", status: "active" as const },
  { id: 6, name: "Болат", photo: "/api/placeholder/80/80", status: "active" as const },
];

const mockTask = {
  id: 1,
  type: "pie_chart" as const,
  question: "Диаграммаға қарап қорытынды жаса: Қанша пайыз оқушы күнде кітап оқиды?",
  image: "/api/placeholder/400/300"
};

type ViewMode = "start" | "task" | "results" | "winners" | "final";

const ProjectorDisplay = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("start");
  const [participants, setParticipants] = useState(mockParticipants);
  const [currentRound, setCurrentRound] = useState(1);

  const handleTimerComplete = () => {
    setViewMode("results");
  };

  const renderStartView = () => (
    <div className="min-h-screen bg-gradient-dark text-foreground p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          UFC READING CHALLENGE
        </h1>
        <p className="text-2xl text-muted-foreground">
          Турнир по читательской грамотности
        </p>
        <div className="text-lg text-accent mt-4">
          Участников: {participants.length}
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-6 max-w-6xl mx-auto">
        {participants.map((participant) => (
          <ParticipantCard
            key={participant.id}
            {...participant}
            status="active"
            className="transform hover:scale-105 transition-transform"
          />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button
          onClick={() => setViewMode("task")}
          className="text-xl px-12 py-6 bg-gradient-primary hover:shadow-glow"
        >
          Начать Турнир
        </Button>
      </div>
    </div>
  );

  const renderTaskView = () => (
    <div className="min-h-screen bg-gradient-dark text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Раунд {currentRound}
          </h1>
          <div className="text-lg text-muted-foreground">
            Участников в игре: {participants.length}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 items-start">
          <div>
            <Timer
              duration={60}
              onComplete={handleTimerComplete}
              className="sticky top-8"
            />
          </div>
          
          <div className="col-span-2">
            <TaskDisplay task={mockTask} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderResultsView = () => (
    <div className="min-h-screen bg-gradient-dark text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">
          Результаты Раунда {currentRound}
        </h1>
        
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-success mb-6 text-center">
              Прошли в следующий раунд
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {participants.slice(0, 3).map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  {...participant}
                  status="active"
                  className="bg-success/20 border-success"
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-destructive mb-6 text-center">
              Выбыли из турнира
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {participants.slice(3).map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  {...participant}
                  status="eliminated"
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 space-x-6">
          <Button
            onClick={() => setViewMode("winners")}
            className="text-xl px-8 py-4 bg-gradient-gold hover:shadow-gold-glow"
          >
            Показать Победителей
          </Button>
        </div>
      </div>
    </div>
  );

  const renderWinnersView = () => (
    <div className="min-h-screen bg-gradient-dark text-foreground p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-12">
          ПОБЕДИТЕЛИ РАУНДА {currentRound}
        </h1>
        
        <div className="flex justify-center space-x-12">
          {participants.slice(0, 3).map((participant, index) => (
            <div key={participant.id} className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-accent mb-4 mx-auto animate-pulse-glow">
                <img
                  src={participant.photo}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-accent">
                {participant.name}
              </h2>
              {index === 0 && (
                <div className="text-6xl mt-4">🏆</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 space-x-6">
          <Button
            onClick={() => {
              setCurrentRound(currentRound + 1);
              setViewMode("task");
            }}
            className="text-xl px-8 py-4 bg-gradient-primary hover:shadow-glow"
          >
            Следующий Раунд
          </Button>
          <Button
            onClick={() => setViewMode("final")}
            className="text-xl px-8 py-4 bg-gradient-gold hover:shadow-gold-glow"
          >
            Финал
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFinalView = () => (
    <div className="min-h-screen bg-gradient-dark text-foreground p-8 relative overflow-hidden">
      {/* Fireworks animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-accent rounded-full animate-fireworks"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="text-center relative z-10">
        <h1 className="text-8xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-8">
          ЧЕМПИОН
        </h1>
        <h2 className="text-6xl font-bold text-accent mb-12">
          UFC READING CHALLENGE
        </h2>
        
        <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-accent mx-auto mb-8 shadow-gold-glow">
          <img
            src={participants[0].photo}
            alt={participants[0].name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-5xl font-bold text-accent mb-4">
          {participants[0].name}
        </h3>
        
        <div className="text-8xl mb-8">🏆👑🏆</div>
        
        <p className="text-2xl text-muted-foreground">
          Поздравляем победителя турнира!
        </p>
        
        <Button
          onClick={() => setViewMode("start")}
          className="mt-12 text-xl px-12 py-6 bg-gradient-primary hover:shadow-glow"
        >
          Новый Турнир
        </Button>
      </div>
    </div>
  );

  const renderView = () => {
    switch (viewMode) {
      case "start":
        return renderStartView();
      case "task":
        return renderTaskView();
      case "results":
        return renderResultsView();
      case "winners":
        return renderWinnersView();
      case "final":
        return renderFinalView();
      default:
        return renderStartView();
    }
  };

  return renderView();
};

export default ProjectorDisplay;