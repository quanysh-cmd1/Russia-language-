import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookOpen, Users, Trophy } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    userType: "student",
    group: "Жамбыл",
    grade: "5",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Redirect based on user type
    const redirectUrl =
      user.userType === "teacher"
        ? "/teacher/dashboard"
        : user.userType === "admin"
          ? "/admin/panel"
          : "/student/dashboard";

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Добро пожаловать!</CardTitle>
            <CardDescription>Перенаправление на ваш кабинет...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-black text-gray-900">РусскийЯзык</h1>
          </div>
          <p className="text-sm text-gray-600">Платформа для изучения русского языка</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Изучайте русский язык с удовольствием
              </h2>
              <p className="text-lg text-gray-600">
                Интерактивная платформа для учащихся 5-11 классов с видео-уроками, играми и отслеживанием прогресса.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="pt-6">
                  <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Видео-уроки</h3>
                  <p className="text-sm text-gray-700">
                    Профессиональные видео-уроки по всем темам русского языка
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="pt-6">
                  <Trophy className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Интерактивные игры</h3>
                  <p className="text-sm text-gray-700">
                    Практикуйте грамматику через веселые и увлекательные игры
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Рейтинги</h3>
                  <p className="text-sm text-gray-700">
                    Соревнуйтесь с одноклассниками и поднимайтесь в рейтинге
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="pt-6">
                  <Loader2 className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Прогресс</h3>
                  <p className="text-sm text-gray-700">
                    Отслеживайте свой прогресс и достижения в реальном времени
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div>
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Начните обучение</CardTitle>
                <CardDescription className="text-blue-100">
                  Войдите или создайте новый аккаунт
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin">Вход</TabsTrigger>
                    <TabsTrigger value="signup">Регистрация</TabsTrigger>
                  </TabsList>

                  {/* Sign In Tab */}
                  <TabsContent value="signin" className="space-y-4">
                    <div className="space-y-4">
                      <Button
                        onClick={() => window.location.href = getLoginUrl()}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all"
                      >
                        Войти через Manus
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Используйте вашу учетную запись Manus для входа
                      </p>
                    </div>
                  </TabsContent>

                  {/* Sign Up Tab */}
                  <TabsContent value="signup" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 font-semibold">
                          Полное имя
                        </Label>
                        <Input
                          id="name"
                          placeholder="Иван Петров"
                          value={signUpData.name}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, name: e.target.value })
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-semibold">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="ivan@example.com"
                          value={signUpData.email}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, email: e.target.value })
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="userType" className="text-gray-700 font-semibold">
                          Тип пользователя
                        </Label>
                        <Select
                          value={signUpData.userType}
                          onValueChange={(value) =>
                            setSignUpData({ ...signUpData, userType: value })
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Студент</SelectItem>
                            <SelectItem value="teacher">Учитель</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {signUpData.userType === "student" && (
                        <>
                          <div>
                            <Label htmlFor="grade" className="text-gray-700 font-semibold">
                              Класс
                            </Label>
                            <Select
                              value={signUpData.grade}
                              onValueChange={(value) =>
                                setSignUpData({ ...signUpData, grade: value })
                              }
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[5, 6, 7, 8, 9, 10, 11].map((grade) => (
                                  <SelectItem key={grade} value={grade.toString()}>
                                    {grade} класс
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="group" className="text-gray-700 font-semibold">
                              Группа
                            </Label>
                            <Select
                              value={signUpData.group}
                              onValueChange={(value) =>
                                setSignUpData({ ...signUpData, group: value })
                              }
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Жамбыл">Жамбыл</SelectItem>
                                <SelectItem value="Абай">Абай</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      <Button
                        onClick={() => setIsSigningUp(true)}
                        disabled={isSigningUp}
                        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-all"
                      >
                        {isSigningUp ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Регистрация...
                          </>
                        ) : (
                          "Создать аккаунт"
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Создав аккаунт, вы согласны с нашими условиями использования
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>
            © 2026 РусскийЯзык. Платформа для изучения русского языка | Школа имени Ж. Жабаева
          </p>
        </div>
      </footer>
    </div>
  );
}
