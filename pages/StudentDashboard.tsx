import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="border-b border-blue-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-black text-gray-900">РусскийЯзык</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Выход
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl">Добро пожаловать, {user?.name}!</CardTitle>
              <CardDescription className="text-blue-100">
                Группа: {user?.group} | Класс: {user?.grade}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Выберите урок для начала обучения или продолжите с того, где вы остановились.
              </p>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card>
            <CardHeader>
              <CardTitle>Уроки (скоро)</CardTitle>
              <CardDescription>
                Список уроков по вашему классу будет здесь
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Загрузка уроков...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
