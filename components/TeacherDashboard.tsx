import React, { useState, useEffect } from 'react';
import { Database, UserProgress } from '../utils/Database';
import { PREDEFINED_USERS } from '../constants';

interface TeacherDashboardProps {
  onLogout: () => void;
}

const STUDENT_GROUPS: Record<string, string[]> = {
  'Жамбыл': ['kuanysh', 'zhako76', 'zhako_cr7', 'uldana', 'aidana', 'alinur'],
  'Абай': ['altai86', 'adilet', 'dinmukhamed76', 'elnur', 'ramazan_q', 'ramazan_n', 'nurzhan', 'nursultan', 'ozzi', 'perizat', 'ramazan', 'rauan', 'sezim', 'ayau', 'rasul']
};

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onLogout }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('Жамбыл');
  const [studentStats, setStudentStats] = useState<Record<string, UserProgress>>({});
  const [overallStats, setOverallStats] = useState({
    totalStudents: 0,
    avgAccuracy: 0,
    totalGamesPlayed: 0,
    lessonsCompleted: 0,
  });

  useEffect(() => {
    loadStudentStats();
  }, [selectedGroup]);

  const loadStudentStats = () => {
    const groupStudents = STUDENT_GROUPS[selectedGroup] || [];
    const stats: Record<string, UserProgress> = {};
    let totalAccuracy = 0;
    let totalGames = 0;
    let totalLessons = 0;

    groupStudents.forEach(studentLogin => {
      const progress = Database.getUserProgress(studentLogin);
      if (progress) {
        stats[studentLogin] = progress;
        totalAccuracy += progress.gameStats.bestAccuracy;
        totalGames += progress.gameStats.totalGames;
        totalLessons += progress.lessonsCompleted.length;
      }
    });

    setStudentStats(stats);
    setOverallStats({
      totalStudents: groupStudents.length,
      avgAccuracy: groupStudents.length > 0 ? Math.round(totalAccuracy / groupStudents.length) : 0,
      totalGamesPlayed: totalGames,
      lessonsCompleted: totalLessons,
    });
  };

  const getStudentName = (login: string): string => {
    const user = PREDEFINED_USERS.find(u => u.login === login);
    return user?.login || login;
  };

  const groupStudents = STUDENT_GROUPS[selectedGroup] || [];

  return (
    <div className="flex flex-col items-center py-6 animate-fadeIn w-full px-4">
      <div className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl p-8 sm:p-12 md:p-20 w-full max-w-6xl border-t-[16px] border-purple-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 border-b border-gray-100 pb-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={onLogout}
              className="w-14 h-14 md:w-20 md:h-20 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded-2xl shadow-sm flex items-center justify-center text-red-600 transition-all active:scale-90 border border-red-100 duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">Панель учителя 👨‍🏫</h2>
              <p className="text-base md:text-2xl text-gray-400 font-bold">Аналитика прогресса студентов</p>
            </div>
          </div>
        </div>

        {/* Group Selection */}
        <div className="mb-12">
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Выберите группу</p>
          <div className="flex gap-4">
            {Object.keys(STUDENT_GROUPS).map(group => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-8 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 ${
                  selectedGroup === group
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Студентов', val: overallStats.totalStudents, icon: '👥', bg: 'blue' },
            { label: 'Средняя точность', val: `${overallStats.avgAccuracy}%`, icon: '🎯', bg: 'emerald' },
            { label: 'Всего игр', val: overallStats.totalGamesPlayed, icon: '🎮', bg: 'purple' },
            { label: 'Уроков завершено', val: overallStats.lessonsCompleted, icon: '📚', bg: 'orange' }
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center transition-all hover:scale-[1.05] hover:shadow-lg duration-300 group">
              <div className={`w-16 h-16 bg-${stat.bg}-100 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform shadow-inner`}>{stat.icon}</div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">{stat.label}</p>
              <p className="text-4xl md:text-5xl font-black text-gray-800 tabular-nums tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Students List */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2.5rem] p-8 md:p-12 border border-gray-200">
          <h3 className="text-2xl font-black text-gray-800 mb-8">Список студентов группы "{selectedGroup}"</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left px-4 py-4 font-black text-gray-600 uppercase text-sm">Студент</th>
                  <th className="text-center px-4 py-4 font-black text-gray-600 uppercase text-sm">Игр сыграно</th>
                  <th className="text-center px-4 py-4 font-black text-gray-600 uppercase text-sm">Верных ответов</th>
                  <th className="text-center px-4 py-4 font-black text-gray-600 uppercase text-sm">Лучший счет</th>
                  <th className="text-center px-4 py-4 font-black text-gray-600 uppercase text-sm">Макс. точность</th>
                  <th className="text-center px-4 py-4 font-black text-gray-600 uppercase text-sm">Уроков</th>
                </tr>
              </thead>
              <tbody>
                {groupStudents.map((studentLogin, idx) => {
                  const progress = studentStats[studentLogin];
                  const stats = progress?.gameStats || { totalGames: 0, totalCorrect: 0, highestScore: 0, bestAccuracy: 0 };
                  const lessonsCount = progress?.lessonsCompleted.length || 0;

                  return (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-white/50 transition-colors">
                      <td className="px-4 py-4 font-bold text-gray-800">{getStudentName(studentLogin)}</td>
                      <td className="text-center px-4 py-4 font-black text-gray-700">{stats.totalGames}</td>
                      <td className="text-center px-4 py-4 font-black text-emerald-600">{stats.totalCorrect}</td>
                      <td className="text-center px-4 py-4 font-black text-blue-600">{stats.highestScore}</td>
                      <td className="text-center px-4 py-4">
                        <span className={`px-3 py-1 rounded-full font-black text-sm ${
                          stats.bestAccuracy >= 80 ? 'bg-emerald-100 text-emerald-700' :
                          stats.bestAccuracy >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {stats.bestAccuracy}%
                        </span>
                      </td>
                      <td className="text-center px-4 py-4 font-black text-purple-600">{lessonsCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {groupStudents.length === 0 && (
            <p className="text-center text-gray-500 font-bold py-8">Нет студентов в этой группе</p>
          )}
        </div>
      </div>
    </div>
  );
};
