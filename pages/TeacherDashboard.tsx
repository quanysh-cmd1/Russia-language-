import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, LogOut, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function TeacherDashboard() {
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
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl">Учительница Роза</CardTitle>
              <CardDescription className="text-purple-100">
                Панель управления для учителя
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="groups" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="groups">Группы</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
              <TabsTrigger value="content">Контент</TabsTrigger>
            </TabsList>

            <TabsContent value="groups" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Группа Жамбыл
                    </CardTitle>
                    <CardDescription>Студенты в группе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Загрузка студентов...</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Группа Абай
                    </CardTitle>
                    <CardDescription>Студенты в группе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Загрузка студентов...</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Аналитика (скоро)</CardTitle>
                  <CardDescription>
                    Статистика по прогрессу студентов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Графики и статистика будут здесь</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Управление контентом (скоро)</CardTitle>
                  <CardDescription>
                    Добавление и редактирование уроков
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Форма управления контентом будет здесь</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
