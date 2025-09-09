import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParticipantCard } from "@/components/ui/participant-card";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with your backend integration
const mockParticipants = [
  { id: 1, name: "Арузхан", photo: "/api/placeholder/80/80" },
  { id: 2, name: "Диас", photo: "/api/placeholder/80/80" },
  { id: 3, name: "Асель", photo: "/api/placeholder/80/80" },
];

const mockTasks = [
  {
    id: 1,
    question: "Диаграммаға қарап қорытынды жаса",
    type: "pie_chart",
    correct_answer: "35% күнде оқиды"
  },
  {
    id: 2,
    question: "Мәтінді талдаңыз",
    type: "text",
    correct_answer: "Дұрыс жауап мысалы"
  }
];

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [participants, setParticipants] = useState(mockParticipants);
  const [tasks, setTasks] = useState(mockTasks);
  const [tournamentStatus, setTournamentStatus] = useState<"waiting" | "active" | "finished">("waiting");
  const { toast } = useToast();

  // New participant form
  const [newParticipant, setNewParticipant] = useState({ name: "", photo: "" });
  
  // New task form
  const [newTask, setNewTask] = useState({
    question: "",
    type: "text",
    content: "",
    correct_answer: ""
  });

  const handleAuth = () => {
    if (authCode === "admin123") { // Replace with your auth logic
      setIsAuthenticated(true);
      toast({
        title: "Авторизация успешна",
        description: "Добро пожаловать в панель администратора",
      });
    } else {
      toast({
        title: "Ошибка авторизации",
        description: "Неверный код доступа",
        variant: "destructive",
      });
    }
  };

  const addParticipant = () => {
    if (newParticipant.name.trim()) {
      const participant = {
        id: participants.length + 1,
        name: newParticipant.name,
        photo: newParticipant.photo || "/api/placeholder/80/80"
      };
      setParticipants([...participants, participant]);
      setNewParticipant({ name: "", photo: "" });
      toast({
        title: "Участник добавлен",
        description: `${participant.name} добавлен в турнир`,
      });
    }
  };

  const addTask = () => {
    if (newTask.question.trim() && newTask.correct_answer.trim()) {
      const task = {
        id: tasks.length + 1,
        question: newTask.question,
        type: newTask.type,
        content: newTask.content,
        correct_answer: newTask.correct_answer
      };
      setTasks([...tasks, task]);
      setNewTask({ question: "", type: "text", content: "", correct_answer: "" });
      toast({
        title: "Задание добавлено",
        description: "Новое задание создано",
      });
    }
  };

  const startTournament = () => {
    setTournamentStatus("active");
    toast({
      title: "Турнир начат",
      description: "Участники могут начать отвечать на вопросы",
    });
  };

  const showResults = () => {
    toast({
      title: "Показаны результаты",
      description: "Результаты раунда отображены на экране",
    });
  };

  const nextRound = () => {
    toast({
      title: "Следующий раунд",
      description: "Переход к следующему раунду турнира",
    });
  };

  const finishTournament = () => {
    setTournamentStatus("finished");
    toast({
      title: "Турнир завершен",
      description: "Показан финальный экран с победителем",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Панель Администратора
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Введите код доступа"
              type="password"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAuth()}
            />
            <Button onClick={handleAuth} className="w-full">
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            UFC Reading Challenge
          </h1>
          <p className="text-muted-foreground">Панель управления турниром</p>
        </div>

        <Tabs defaultValue="participants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="participants">Участники</TabsTrigger>
            <TabsTrigger value="tasks">Задания</TabsTrigger>
            <TabsTrigger value="tournament">Турнир</TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить участника</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Имя участника"
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                  />
                  <Input
                    placeholder="URL фото (опционально)"
                    value={newParticipant.photo}
                    onChange={(e) => setNewParticipant({...newParticipant, photo: e.target.value})}
                  />
                </div>
                <Button onClick={addParticipant}>
                  Добавить участника
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список участников ({participants.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {participants.map((participant) => (
                    <ParticipantCard
                      key={participant.id}
                      {...participant}
                      status="active"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Создать задание</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Текст задания"
                  value={newTask.question}
                  onChange={(e) => setNewTask({...newTask, question: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newTask.type}
                    onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                  >
                    <option value="text">Текст</option>
                    <option value="pie_chart">Диаграмма</option>
                    <option value="table">Таблица</option>
                    <option value="graph">График</option>
                  </select>
                  <Input
                    placeholder="Правильный ответ"
                    value={newTask.correct_answer}
                    onChange={(e) => setNewTask({...newTask, correct_answer: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="Дополнительный контент (опционально)"
                  value={newTask.content}
                  onChange={(e) => setNewTask({...newTask, content: e.target.value})}
                />
                <Button onClick={addTask}>
                  Создать задание
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список заданий ({tasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">Задание #{task.id}</h4>
                        <span className="text-sm bg-primary/20 px-2 py-1 rounded">
                          {task.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {task.question}
                      </p>
                      <p className="text-sm font-medium text-success">
                        Ответ: {task.correct_answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tournament" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление турниром</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm text-muted-foreground">Статус:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tournamentStatus === "waiting" ? "bg-muted text-muted-foreground" :
                    tournamentStatus === "active" ? "bg-success/20 text-success" :
                    "bg-primary/20 text-primary"
                  }`}>
                    {tournamentStatus === "waiting" ? "Ожидание" :
                     tournamentStatus === "active" ? "Активен" : "Завершен"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={startTournament}
                    disabled={tournamentStatus === "active"}
                    className="bg-gradient-primary"
                  >
                    Начать тур
                  </Button>
                  
                  <Button 
                    onClick={showResults}
                    disabled={tournamentStatus !== "active"}
                    variant="secondary"
                  >
                    Показать результаты
                  </Button>
                  
                  <Button 
                    onClick={nextRound}
                    disabled={tournamentStatus !== "active"}
                    variant="outline"
                  >
                    Следующий тур
                  </Button>
                  
                  <Button 
                    onClick={finishTournament}
                    disabled={tournamentStatus === "finished"}
                    className="bg-gradient-gold"
                  >
                    Финал
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Статистика</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Участников:</span>
                      <span className="ml-2 font-medium">{participants.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Заданий:</span>
                      <span className="ml-2 font-medium">{tasks.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Статус:</span>
                      <span className="ml-2 font-medium">{tournamentStatus}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;