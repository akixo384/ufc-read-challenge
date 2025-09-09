import { cn } from "@/lib/utils";

interface TaskDisplayProps {
  task: {
    id: number;
    type: "text" | "pie_chart" | "table" | "graph";
    question: string;
    content?: string;
    image?: string;
  };
  className?: string;
}

export const TaskDisplay = ({ task, className }: TaskDisplayProps) => {
  return (
    <div className={cn("bg-card rounded-lg p-8 border border-border", className)}>
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Задание #{task.id}
        </h2>
        
        <div className="text-xl text-foreground leading-relaxed">
          {task.question}
        </div>
        
        {task.image && (
          <div className="flex justify-center my-8">
            <img
              src={task.image}
              alt="Task content"
              className="max-w-full max-h-96 rounded-lg border border-border"
            />
          </div>
        )}
        
        {task.content && (
          <div className="text-lg text-muted-foreground mt-6 whitespace-pre-wrap">
            {task.content}
          </div>
        )}
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Участники отвечают на своих телефонах
          </p>
        </div>
      </div>
    </div>
  );
};