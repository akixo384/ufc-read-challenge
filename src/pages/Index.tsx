import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            UFC READING CHALLENGE
          </h1>
          <p className="text-2xl text-muted-foreground mb-4">
            Интерактивная платформа для турниров по читательской грамотности
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Создайте увлекательные соревнования в стиле UFC, где участники соревнуются
            в решении задач на понимание текста, анализ данных и критическое мышление
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">📺</span>
              </div>
              <CardTitle className="text-xl">Экран проектора</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Основной экран для демонстрации турнира с участниками,
                заданиями, таймером и результатами
              </p>
              <Link to="/projector">
                <Button className="w-full bg-gradient-primary hover:shadow-glow">
                  Открыть экран
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 mx-auto bg-gradient-gold rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">⚙️</span>
              </div>
              <CardTitle className="text-xl">Панель администратора</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Управление участниками, создание заданий
                и контроль хода турнира
              </p>
              <Link to="/admin">
                <Button className="w-full bg-gradient-gold hover:shadow-gold-glow">
                  Войти как админ
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <CardTitle className="text-xl">Мобильный интерфейс</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Интерфейс для участников турнира.
                Вход и ответы на задания со смартфона
              </p>
              <Link to="/student">
                <Button className="w-full bg-gradient-primary hover:shadow-glow">
                  Войти как участник
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Как это работает?</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Для организаторов:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Добавьте участников с фотографиями</li>
                  <li>2. Создайте задания разных типов</li>
                  <li>3. Запустите турнир и управляйте раундами</li>
                  <li>4. Наблюдайте за результатами в реальном времени</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Для участников:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Войдите со своего смартфона</li>
                  <li>2. Ждите начала турнира</li>
                  <li>3. Отвечайте на задания быстро и точно</li>
                  <li>4. Боритесь за звание чемпиона!</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
