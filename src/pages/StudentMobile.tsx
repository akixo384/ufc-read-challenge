import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with your backend integration
const mockTask = {
  id: 1,
  question: "Диаграммаға қарап қорытынды жаса: Қанша пайыз оқушы күнде кітап оқиды?",
  type: "pie_chart",
  image: "/api/placeholder/300/200"
};

type ViewMode = "login" | "waiting" | "task" | "result";
type ResultType = "passed" | "eliminated" | "waiting";

const StudentMobile = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("login");
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<ResultType>("waiting");
  const [currentRound, setCurrentRound] = useState(1);
  const { toast } = useToast();

  const handleLogin = () => {
    if (studentName.trim() || studentCode.trim()) {
      setViewMode("waiting");
      toast({
        title: "Вход выполнен",
        description: `Добро пожаловать, ${studentName || 'Участник'}!`,
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Введите имя или код участника",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      // Mock answer checking - replace with your backend logic
      const isCorrect = Math.random() > 0.5; // Random for demo
      setResult(isCorrect ? "passed" : "eliminated");
      setViewMode("result");
      
      toast({
        title: "Ответ отправлен",
        description: "Ожидайте результатов...",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Введите ответ на задание",
        variant: "destructive",
      });
    }
  };

  const renderLoginView = () => (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            UFC Reading Challenge
          </CardTitle>
          <p className="text-muted-foreground">Вход участника</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ваше имя</label>
            <Input
              placeholder="Введите ваше имя"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          
          <div className="text-center text-muted-foreground">или</div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Код участника</label>
            <Input
              placeholder="Введите код"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleLogin} 
            className="w-full bg-gradient-primary hover:shadow-glow"
          >
            Войти в турнир
          </Button>
          
          <div className="text-center text-xs text-muted-foreground mt-4">
            Убедитесь, что у вас стабильное интернет-соединение
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWaitingView = () => (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-xl">
            Добро пожаловать, {studentName || 'Участник'}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
            <span className="text-3xl">⏳</span>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Ожидание начала турнира</h3>
            <p className="text-muted-foreground text-sm">
              Турнир скоро начнется. Следите за экраном и будьте готовы отвечать на вопросы.
            </p>
          </div>
          
          <div className="p-4 bg-muted/20 rounded-lg">
            <h4 className="font-medium mb-2">Правила турнира:</h4>
            <ul className="text-xs text-muted-foreground space-y-1 text-left">
              <li>• Внимательно читайте задания</li>
              <li>• Отвечайте быстро и точно</li>
              <li>• Неправильный ответ = выбывание</li>
              <li>• Последний участник = победитель</li>
            </ul>
          </div>
          
          <Button 
            onClick={() => setViewMode("task")}
            className="w-full bg-gradient-primary"
          >
            Готов к заданию!
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTaskView = () => (
    <div className="min-h-screen bg-gradient-dark p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">
              Раунд {currentRound} - Задание #{mockTask.id}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {studentName || 'Участник'}
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-base leading-relaxed">
                {mockTask.question}
              </h3>
              
              {mockTask.image && (
                <div className="flex justify-center">
                  <img
                    src={mockTask.image}
                    alt="Task content"
                    className="max-w-full rounded-lg border border-border"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ваш ответ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Введите ваш ответ здесь..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[100px]"
            />
            
            <Button 
              onClick={handleSubmitAnswer}
              className="w-full bg-gradient-primary hover:shadow-glow"
              disabled={!answer.trim()}
            >
              Отправить ответ
            </Button>
            
            <div className="text-center text-xs text-muted-foreground">
              Проверьте ответ перед отправкой. Изменить его будет нельзя!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResultView = () => (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          {result === "passed" ? (
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto bg-success rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-4xl">✅</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-success">
                  Поздравляем!
                </h3>
                <p className="text-success-foreground">
                  Вы прошли в следующий раунд!
                </p>
              </div>
              
              <div className="p-4 bg-success/20 rounded-lg">
                <p className="text-sm text-success-foreground">
                  Ваш ответ: <span className="font-semibold">"{answer}"</span>
                </p>
              </div>
              
              <Button 
                onClick={() => {
                  setCurrentRound(currentRound + 1);
                  setAnswer("");
                  setViewMode("waiting");
                }}
                className="w-full bg-gradient-primary"
              >
                Готов к следующему раунду
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto bg-destructive rounded-full flex items-center justify-center animate-pulse">
                <span className="text-4xl">❌</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-destructive">
                  Вы выбыли
                </h3>
                <p className="text-destructive-foreground">
                  К сожалению, ваш ответ неверный
                </p>
              </div>
              
              <div className="p-4 bg-destructive/20 rounded-lg">
                <p className="text-sm text-destructive-foreground">
                  Ваш ответ: <span className="font-semibold">"{answer}"</span>
                </p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Спасибо за участие в турнире! Следите за финалом на экране.
              </div>
              
              <Button 
                onClick={() => {
                  setViewMode("login");
                  setStudentName("");
                  setStudentCode("");
                  setAnswer("");
                  setCurrentRound(1);
                  setResult("waiting");
                }}
                variant="outline"
                className="w-full"
              >
                Новый турнир
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderView = () => {
    switch (viewMode) {
      case "login":
        return renderLoginView();
      case "waiting":
        return renderWaitingView();
      case "task":
        return renderTaskView();
      case "result":
        return renderResultView();
      default:
        return renderLoginView();
    }
  };

  return renderView();
};

export default StudentMobile;