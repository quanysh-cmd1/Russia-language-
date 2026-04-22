import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LogOut, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function LessonPage() {
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
          <Button
            onClick={() => setLocation("/student/dashboard")}
            variant="outline"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к урокам
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Урок (скоро)</CardTitle>
              <CardDescription>
                Видео-урок и тест будут здесь
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Загрузка урока...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
