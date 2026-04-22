
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import GameEngine from './components/GameEngine';
import GroupDistribution from './components/GroupDistribution';
import LessonPage from './components/LessonPage';
import { AuthScreens } from './components/AuthScreens';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AIGrammarAssistant } from './components/AIGrammarAssistant';
import { PREDEFINED_USERS } from './constants';
import { questions } from './data/questions';
import { lessons } from './data/lessons';
import { User, GameState, GameType, Difficulty, UserStats, Lesson } from './types';
import { audioEngine } from './utils/AudioEngine';
import { Database } from './utils/Database';

type Screen = 'AUTH' | 'LOADING' | 'WELCOME' | 'GAME' | 'RESULTS' | 'MISTAKE_REVIEW' | 'PROFILE' | 'LESSONS' | 'VIDEO_LESSON' | 'SIGNUP' | 'TEACHER_DASHBOARD';

const Confetti = () => {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const newPieces = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 4 + 's',
      size: Math.random() * 14 + 6 + 'px',
      rotation: Math.random() * 360 + 'deg'
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotation})`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('AUTH');
  const [user, setUser] = useState<User | null>(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [finalState, setFinalState] = useState<GameState | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.MIXED);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    totalGames: 0,
    totalCorrect: 0,
    highestScore: 0,
    bestAccuracy: 0,
    lessonsCompleted: 0
  });

  useEffect(() => {
    if (user) {
      const savedStats = localStorage.getItem(`stats_${user.username}`);
      if (savedStats) {
        setUserStats(JSON.parse(savedStats));
      }
    }
  }, [user]);

  const navigateTo = (screen: Screen) => {
    audioEngine.playTransition();
    setCurrentScreen(screen);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignup) {
      if (!login || !password || !confirmPassword) {
        setError('Заполните все поля.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Пароли не совпадают.');
        return;
      }
      if (password.length < 4) {
        setError('Пароль должен быть не менее 4 символов.');
        return;
      }
      const existingUser = PREDEFINED_USERS.find(u => u.login === login);
      if (existingUser) {
        setError('Этот логин уже занят.');
        return;
      }
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      registeredUsers.push({ login, password });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      setUser({ username: login });
      navigateTo('LOADING');
      setError('');
      setIsSignup(false);
      setLogin('');
      setPassword('');
      setConfirmPassword('');
    } else {
      const foundUser = PREDEFINED_USERS.find(u => u.login === login && u.password === password);
      if (foundUser) {
        setUser({ username: foundUser.login });
        navigateTo('LOADING');
        setError('');
        return;
      }
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const registeredUser = registeredUsers.find((u: any) => u.login === login && u.password === password);
      if (registeredUser) {
        setUser({ username: registeredUser.login });
        navigateTo('LOADING');
        setError('');
      } else {
        setError('Неверный логин или пароль.');
      }
    }
  };

  const logout = () => {
    setUser(null);
    setLogin('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setIsSignup(false);
    navigateTo('AUTH');
  };

  const startPlaying = (diff: Difficulty) => {
    setSelectedDifficulty(diff);
    navigateTo('GAME');
  };

  const onGameComplete = (state: GameState) => {
    setFinalState(state);
    
    if (user) {
      const totalPlayed = state.score + state.mistakes;
      const accuracy = Math.round((state.score / totalPlayed) * 100) || 0;
      const newStats: UserStats = {
        totalGames: userStats.totalGames + 1,
        totalCorrect: userStats.totalCorrect + state.score,
        highestScore: Math.max(userStats.highestScore, state.score),
        bestAccuracy: Math.max(userStats.bestAccuracy, accuracy),
      };
      setUserStats(newStats);
      localStorage.setItem(`stats_${user.username}`, JSON.stringify(newStats));
      
      // Save to database
      Database.updateGameStats(user.username, state.score, totalPlayed);
      
      // Mark lesson as completed if one was selected
      if (selectedLesson) {
        Database.markLessonCompleted(user.username, selectedLesson.id);
      }

      if (accuracy >= 70) {
        audioEngine.playVictory();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);
      }
    }
    
    navigateTo('RESULTS');
  };

  const restartGame = () => {
    setFinalState(null);
    navigateTo('WELCOME');
  };

  const goBackToWelcome = () => {
    navigateTo('WELCOME');
  };

  const openReview = () => navigateTo('MISTAKE_REVIEW');
  const closeReview = () => navigateTo('RESULTS');
  const openProfile = () => navigateTo('PROFILE');

  const [selectedGameType, setSelectedGameType] = useState<GameType | null>(null);

  const filteredQuestions = React.useMemo(() => {
    let base = [...questions];
    if (selectedLesson) {
      base = base.filter(q => q.lessonId === selectedLesson.id);
      if (base.length === 0) base = [...questions].slice(0, 10); // Fallback
    } else if (selectedGameType) {
      base = base.filter(q => q.type === selectedGameType);
    } else if (selectedDifficulty !== Difficulty.MIXED) {
      base = base.filter(q => q.difficulty === selectedDifficulty);
    }
    // Shuffle and take 10
    return base.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [selectedDifficulty, selectedGameType, selectedLesson]);

  const getCategoryName = (type: GameType) => {
    switch (type) {
      case GameType.MULTIPLE_CHOICE: return 'Распознавание частей речи';
      case GameType.TRUE_FALSE: return 'Пунктуация и запятые';
      case GameType.DRAG_DROP: return 'Правописание суффиксов';
      case GameType.ERROR_DETECTION: return 'Культура речи';
      case GameType.SENTENCE_COMPARISON: return 'Синтаксис';
      default: return 'Общее правило';
    }
  };

  const renderAuth = () => (
    <AuthScreens
      isSignup={isSignup}
      login={login}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      onLoginChange={setLogin}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleLogin}
      onToggleSignup={(value) => {
        setIsSignup(value);
        setError('');
        setLogin('');
        setPassword('');
        setConfirmPassword('');
      }}
    />
  );

  const renderAuthOld = () => (
    <div className="flex items-center justify-center py-10 animate-fadeIn w-full px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-12 lg:p-16 w-full max-w-md border border-gray-100 transition-all hover:shadow-blue-200/50 duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-transform hover:scale-110 duration-500 rotate-3">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-4.514A9.01 9.01 0 0012 21a9.003 9.003 0 008.313-12.454M15.514 5.514a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L12 6.586l2.086-2.086a1 1 0 011.414 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Авторизация</h2>
          <p className="text-sm text-gray-400 font-bold mt-2 uppercase tracking-widest">Открытый урок русского языка</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-blue-400 focus:ring-8 focus:ring-blue-50 transition-all outline-none bg-gray-50/50 font-black text-lg text-gray-700"
              placeholder="Введите логин"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-blue-400 focus:ring-8 focus:ring-blue-50 transition-all outline-none bg-gray-50/50 font-black text-lg text-gray-700"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 animate-pulse flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="text-red-500 text-xs font-black uppercase tracking-wider">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-5 rounded-2xl text-xl shadow-xl hover:shadow-blue-200 transform transition-all active:scale-95 duration-200 mt-4"
          >
            Войти в игру
          </button>
        </form>
      </div>
    </div>
  );

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center py-6 animate-fadeIn w-full px-4">
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] shadow-2xl p-6 sm:p-10 lg:p-12 w-full max-w-4xl border-b-[12px] border-blue-500 relative transition-all duration-500 hover:shadow-blue-100">
        
        {/* User Info Bar - Responsive & Non-Overlapping */}
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={logout}
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-xl flex items-center justify-center text-gray-500 shadow-sm transition-all active:scale-95 group border border-gray-100"
              title="Выйти"
            >
              <svg className="w-5 h-5 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
            <div className="ml-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Ученик</p>
              <p className="text-base md:text-xl font-black text-blue-900 leading-none">{user?.username}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {user?.username === 'rosa_apai' ? (
              <button 
                onClick={() => navigateTo('TEACHER_DASHBOARD')}
                className="px-4 py-2.5 md:px-6 md:py-3 bg-purple-50 hover:bg-purple-100 active:bg-purple-200 rounded-xl flex items-center gap-3 text-purple-600 shadow-sm transition-all active:scale-95 border border-purple-100 group"
              >
                <span className="text-xs md:text-sm font-black uppercase tracking-widest">Панель</span>
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </button>
            ) : (
              <button 
                onClick={openProfile}
                className="px-4 py-2.5 md:px-6 md:py-3 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-xl flex items-center gap-3 text-blue-600 shadow-sm transition-all active:scale-95 border border-blue-100 group"
              >
                <span className="text-xs md:text-sm font-black uppercase tracking-widest">Статистика</span>
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </button>
            )}
          </div>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4 leading-[1.1] tracking-tighter">
            Готовы к игре? 🚀
          </h2>
          <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto font-bold leading-relaxed">
            Сегодня мы закрепляем знания по теме: <br className="hidden sm:block"/>
            <span className="text-blue-600 font-black text-xl md:text-2xl lg:text-3xl block mt-3 uppercase tracking-tight bg-blue-50 py-2 rounded-xl border border-blue-100">
              "Причастие и деепричастие"
            </span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {[
            { diff: Difficulty.EASY, label: 'Основы', icon: '🌱', color: 'green', sub: 'Теория' },
            { diff: Difficulty.MEDIUM, label: 'Практика', icon: '⚡', color: 'amber', sub: 'Правила' },
            { diff: Difficulty.CHALLENGING, label: 'Мастер', icon: '🔥', color: 'red', sub: 'Анализ' },
            { diff: Difficulty.MIXED, label: 'Сортировка', icon: '📦', color: 'purple', sub: 'Категории', type: GameType.SORTING },
            { diff: Difficulty.MIXED, label: 'Конструктор', icon: '🛠️', color: 'indigo', sub: 'Сборка слов', type: GameType.WORD_CONSTRUCTOR },
            { diff: Difficulty.MIXED, label: 'Экзамен', icon: '🎓', color: 'blue', sub: 'Все темы' }
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setSelectedGameType(item.type || null);
                if (item.type) {
                  setSelectedDifficulty(Difficulty.MIXED);
                  navigateTo('GAME');
                } else {
                  startPlaying(item.diff);
                }
              }}
              className={`group flex flex-col items-center p-4 md:p-6 bg-${item.color === 'green' ? 'emerald' : item.color === 'amber' ? 'orange' : item.color === 'blue' ? 'blue' : item.color === 'purple' ? 'purple' : item.color === 'indigo' ? 'indigo' : 'rose'}-50 hover:bg-${item.color === 'green' ? 'emerald' : item.color === 'amber' ? 'orange' : item.color === 'blue' ? 'blue' : item.color === 'purple' ? 'purple' : item.color === 'indigo' ? 'indigo' : 'rose'}-100 active:bg-${item.color === 'green' ? 'emerald' : item.color === 'amber' ? 'orange' : item.color === 'blue' ? 'blue' : item.color === 'purple' ? 'purple' : item.color === 'indigo' ? 'indigo' : 'rose'}-200 border-2 border-${item.color === 'green' ? 'emerald' : item.color === 'amber' ? 'orange' : item.color === 'blue' ? 'blue' : item.color === 'purple' ? 'purple' : item.color === 'indigo' ? 'indigo' : 'rose'}-100 rounded-[1.5rem] transition-all transform hover:-translate-y-1 shadow-sm hover:shadow-md active:scale-95 duration-300`}
            >
              <span className="text-3xl md:text-4xl mb-3 transition-transform group-hover:scale-110 duration-500 drop-shadow-sm">{item.icon}</span>
              <h4 className={`text-base md:text-lg font-black uppercase tracking-tight text-gray-800`}>{item.label}</h4>
              <p className={`text-[9px] font-bold mt-1 uppercase tracking-[0.2em] opacity-60 text-gray-500`}>{item.sub}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 text-gray-300 font-black uppercase text-[10px] tracking-[0.3em] opacity-40 select-none">
          <div className="w-12 h-0.5 bg-gray-200 rounded-full"></div>
          Школа имени Ж. Жабаева
          <div className="w-12 h-0.5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderLessons = () => {
    const userGrade = user?.username === 'rosa_apai' ? null : parseInt(user?.username?.match(/\d+/)?.[0] || '5');
    const filteredLessons = userGrade ? lessons.filter(l => l.grade === userGrade) : lessons;

    return (
      <div className="flex flex-col items-center py-6 animate-fadeIn w-full px-4">
        <div className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl p-8 sm:p-12 md:p-20 w-full max-w-5xl border-t-[16px] border-blue-500">
          <div className="flex items-center gap-6 mb-16 border-b border-gray-100 pb-10">
            <button 
              onClick={goBackToWelcome}
              className="w-14 h-14 md:w-20 md:h-20 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-2xl shadow-sm flex items-center justify-center text-blue-600 transition-all active:scale-90 border border-blue-100 duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">Уроки 📚</h2>
              <p className="text-base md:text-2xl text-gray-400 font-bold">Выбери урок для изучения</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson);
                  navigateTo('VIDEO_LESSON');
                }}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl border-2 border-blue-100 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform">📖</span>
                  <span className="text-xs font-bold bg-blue-200 text-blue-800 px-3 py-1 rounded-full">{lesson.grade} класс</span>
                </div>
                <h3 className="text-lg font-black text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{lesson.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>{lesson.category}</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderVideoLesson = () => {
    if (!selectedLesson) return null;
    return (
      <LessonPage
        lesson={selectedLesson}
        onSkip={() => navigateTo('GAME')}
        onComplete={() => navigateTo('GAME')}
      />
    );
  };

  const renderProfile = () => (
    <div className="flex flex-col items-center py-6 animate-fadeIn w-full px-4">
      <div className="bg-white rounded-[3rem] md:rounded-[4rem] lg:rounded-[5rem] shadow-2xl p-8 sm:p-12 md:p-20 w-full max-w-5xl border-t-[16px] border-blue-500 transition-all duration-500">
        <div className="flex items-center gap-6 mb-16 border-b border-gray-100 pb-10">
          <button 
            onClick={goBackToWelcome}
            className="w-14 h-14 md:w-20 md:h-20 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-2xl shadow-sm flex items-center justify-center text-blue-600 transition-all active:scale-90 border border-blue-100 duration-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">Твой прогресс 📊</h2>
            <p className="text-base md:text-2xl text-gray-400 font-bold">Личный кабинет ученика: <span className="text-blue-600">{user?.username}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Игр сыграно', val: userStats.totalGames, icon: '🎮', bg: 'blue' },
            { label: 'Всего верных', val: userStats.totalCorrect, icon: '🎯', bg: 'emerald' },
            { label: 'Лучший счет', val: userStats.highestScore, icon: '🏆', bg: 'purple' },
            { label: 'Макс. точность', val: `${userStats.bestAccuracy}%`, icon: '⚡', bg: 'orange' }
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center transition-all hover:scale-[1.05] hover:shadow-lg duration-300 group">
              <div className={`w-16 h-16 bg-${stat.bg}-100 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform shadow-inner`}>{stat.icon}</div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">{stat.label}</p>
              <p className="text-4xl md:text-5xl font-black text-gray-800 tabular-nums tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Ты на верном пути! ✨</h3>
            <p className="text-blue-100 text-lg md:text-2xl leading-relaxed font-bold opacity-90">
              Знание русского языка открывает множество дверей. <br className="hidden md:block"/>
              Твоя настойчивость в изучении темы «Причастие и деепричастие» обязательно принесет плоды!
            </p>
          </div>
          <div className="absolute -right-16 -bottom-16 text-[15rem] md:text-[20rem] opacity-10 pointer-events-none transform rotate-12 select-none">🎓</div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!finalState) return null;
    const accuracy = Math.round((finalState.score / (finalState.score + finalState.mistakes)) * 100) || 0;
    
    return (
      <div className="flex flex-col items-center py-6 animate-fadeIn relative w-full px-4">
        {showConfetti && <Confetti />}
        
        {accuracy >= 70 && (
          <div className="fixed top-24 z-50 pointer-events-none animate-bounce">
             <span className="text-7xl md:text-9xl font-black text-yellow-400 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]">УРА! 🎉</span>
          </div>
        )}

        <div className="bg-white rounded-[3rem] md:rounded-[4rem] lg:rounded-[5rem] shadow-2xl p-10 md:p-16 lg:p-24 w-full max-w-4xl border-t-[16px] border-green-500 z-10 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <span className="text-9xl">🌟</span>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-gray-800 mb-6 leading-none tracking-tighter animate-fadeIn">
              {accuracy >= 80 ? 'Браво! 🏆' : accuracy >= 50 ? 'Хорошо! ⭐' : 'Молодец! 📈'}
            </h2>
            <div className="inline-flex items-center px-8 py-3 bg-blue-50 text-blue-600 rounded-full border-2 border-blue-100 shadow-sm">
              <p className="text-lg md:text-2xl font-black uppercase tracking-widest">
                Точность: <span className="text-blue-700">{accuracy}%</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Верно', val: finalState.score, color: 'emerald' },
              { label: 'Ошибки', val: finalState.mistakes, color: 'rose' },
              { label: 'Всего', val: finalState.score + finalState.mistakes, color: 'blue' }
            ].map((res, i) => (
              <div key={i} className={`bg-${res.color}-50 p-8 rounded-[2.5rem] text-center border-2 border-${res.color}-100 shadow-sm animate-slideIn`} style={{ animationDelay: `${i * 0.1}s` }}>
                <p className={`text-gray-500 font-black uppercase text-xs tracking-[0.2em] mb-2`}>{res.label}</p>
                <p className={`text-4xl md:text-6xl font-black text-gray-800 tabular-nums tracking-tighter`}>{res.val}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <button
              onClick={restartGame}
              className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-6 md:py-8 px-10 rounded-[2rem] text-xl md:text-3xl shadow-xl transform transition-all active:scale-95 duration-200 flex items-center justify-center gap-4 group"
            >
              🚀 Снова
            </button>
            {finalState.mistakes > 0 && (
              <button
                onClick={openReview}
                className="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black py-6 md:py-8 px-10 rounded-[2rem] text-xl md:text-3xl shadow-xl transform transition-all active:scale-95 duration-200 flex items-center justify-center gap-4 group"
              >
                🔍 Анализ
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMistakeReview = () => {
    if (!finalState) return null;
    const mistakesHistory = finalState.history.filter(h => !h.isCorrect);

    return (
      <div className="flex flex-col items-center py-6 w-full animate-fadeIn px-4">
        <div className="w-full max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 px-4 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-6">
              <button 
                onClick={closeReview}
                className="w-14 h-14 md:w-20 md:h-20 bg-white hover:bg-gray-50 active:bg-gray-100 rounded-2xl shadow-md flex items-center justify-center transition-all group border border-gray-100 active:scale-95 duration-300"
              >
                <svg className="w-8 h-8 text-blue-600 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </button>
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight leading-none">Анализ ошибок</h2>
                <p className="text-sm md:text-xl text-gray-400 font-bold italic mt-2 uppercase tracking-wider">Разбор сложных случаев</p>
              </div>
            </div>
            <div className="bg-red-50 px-8 py-3 rounded-2xl border-2 border-red-100 shadow-sm text-center min-w-[140px]">
               <span className="text-red-600 font-black text-xl md:text-2xl tabular-nums">{mistakesHistory.length}</span>
               <p className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none mt-1">ошибок</p>
            </div>
          </div>

          <div className="space-y-10 md:space-y-16">
            {mistakesHistory.map((historyItem, idx) => {
              const q = questions.find(item => item.id === historyItem.questionId);
              if (!q) return null;

              const formatAnswer = (ans: any) => {
                if (typeof ans === 'boolean') return ans ? 'Верно' : 'Неверно';
                if (q.type === GameType.SENTENCE_COMPARISON || q.type === GameType.ERROR_DETECTION) {
                    return q.options?.[ans as number] || ans;
                }
                return ans;
              };

              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-xl p-8 md:p-14 lg:p-20 border-l-[12px] md:border-l-[20px] border-red-500 animate-slideIn transition-all duration-500 hover:shadow-2xl"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="mb-8">
                    <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs md:text-sm font-black uppercase tracking-[0.15em] border border-blue-100 shadow-inner">
                      {getCategoryName(q.type)}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-12 leading-tight tracking-tight">
                    {q.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
                    <div className="p-8 bg-red-50 rounded-[2rem] border-2 border-red-100 relative group transition-all hover:bg-red-100/50">
                      <p className="text-[10px] text-red-400 font-black uppercase mb-3 tracking-widest select-none">Ваш выбор</p>
                      <p className="text-lg md:text-2xl text-red-900 font-black italic">{formatAnswer(historyItem.userAnswer)}</p>
                    </div>
                    <div className="p-8 bg-green-50 rounded-[2rem] border-2 border-green-100 relative group transition-all hover:bg-green-100/50">
                      <p className="text-[10px] text-green-400 font-black uppercase mb-3 tracking-widest select-none">Правильно</p>
                      <p className="text-lg md:text-2xl text-green-900 font-black">{formatAnswer(q.correctAnswer)}</p>
                    </div>
                  </div>

                  <div className="p-10 md:p-16 bg-blue-50/30 rounded-[2.5rem] border-4 border-dotted border-blue-100 transition-colors hover:bg-white duration-300">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                      <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl md:text-6xl shrink-0 transition-transform hover:scale-110 duration-500">🎓</div>
                      <div className="text-center md:text-left">
                        <p className="text-gray-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 opacity-70">Комментарий учителя</p>
                        <p className="text-lg md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-bold italic">
                          "{q.explanation}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 md:mt-24 text-center pb-20">
            <button
              onClick={restartGame}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-6 md:py-8 px-16 md:px-32 rounded-[2.5rem] text-2xl md:text-4xl shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 duration-300"
            >
              🔄 Пройти заново
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {currentScreen === 'AUTH' && renderAuth()}
      {currentScreen === 'LOADING' && user && (
        <GroupDistribution 
          username={user.username} 
          onComplete={() => navigateTo('WELCOME')} 
        />
      )}
      {currentScreen === 'WELCOME' && renderWelcome()}
      {currentScreen === 'LESSONS' && renderLessons()}
      {currentScreen === 'VIDEO_LESSON' && renderVideoLesson()}
      {currentScreen === 'PROFILE' && renderProfile()}
      {currentScreen === 'GAME' && (
        <div className="relative animate-fadeIn w-full px-2">
          <div className="flex items-center justify-between mb-8 md:mb-12 w-full max-w-4xl mx-auto px-2">
             <button 
              onClick={() => {
                if (selectedLesson) {
                  navigateTo('VIDEO_LESSON');
                } else {
                  goBackToWelcome();
                }
              }}
              className="px-5 md:px-10 py-3 md:py-4 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-500 hover:text-blue-600 font-black rounded-2xl shadow-sm transition-all text-sm md:text-lg border border-gray-100 flex items-center gap-3 active:scale-95 duration-200"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
              Назад
            </button>
            <div className="px-4 py-2 md:px-6 md:py-3 bg-white text-blue-600 rounded-2xl text-xs md:text-lg font-black uppercase tracking-widest border border-blue-50 shadow-sm flex items-center gap-3">
               <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
               {user?.username}
            </div>
          </div>
          <GameEngine questions={filteredQuestions} onComplete={onGameComplete} />
        </div>
      )}
      {currentScreen === 'RESULTS' && renderResults()}
      {currentScreen === 'MISTAKE_REVIEW' && renderMistakeReview()}
      {currentScreen === 'TEACHER_DASHBOARD' && <TeacherDashboard onLogout={logout} />}

      {/* AI Assistant Button */}
      {currentScreen === 'WELCOME' && (
        <button
          onClick={() => setShowAIAssistant(!showAIAssistant)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all active:scale-90 hover:scale-110 duration-300 z-40 border-4 border-white"
          title="Грамматический помощник"
        >
          🤖
        </button>
      )}

      {/* AI Grammar Assistant Modal */}
      {showAIAssistant && <AIGrammarAssistant onClose={() => setShowAIAssistant(false)} />}
    </Layout>
  );
};

export default App;
