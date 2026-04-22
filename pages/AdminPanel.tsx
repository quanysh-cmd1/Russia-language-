import React, { useState } from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";

export default function AdminPanel() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'lessons' | 'tests' | 'users' | 'analytics'>('lessons');
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    grade: 5,
    topic: '',
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Доступ запрещен</h1>
          <p className="text-gray-600">Только администраторы могут получить доступ к этой странице.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
          <p className="text-gray-600 mt-1">Управление контентом и пользователями</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {(['lessons', 'tests', 'users', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'lessons' && '📚 Сабақтар'}
                {tab === 'tests' && '✅ Тестлер'}
                {tab === 'users' && '👥 Пользователи'}
                {tab === 'analytics' && '📊 Аналитика'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Lesson Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Добавить сабақ</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Название
                    </label>
                    <input
                      type="text"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Название сабақ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Описание
                    </label>
                    <textarea
                      value={newLesson.description}
                      onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Описание сабақ"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={newLesson.youtubeUrl}
                      onChange={(e) => setNewLesson({ ...newLesson, youtubeUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      placeholder="https://youtube.com/embed/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Сынып
                    </label>
                    <select
                      value={newLesson.grade}
                      onChange={(e) => setNewLesson({ ...newLesson, grade: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    >
                      {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                        <option key={g} value={g}>
                          {g}-сынып
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Тақырыбы
                    </label>
                    <input
                      type="text"
                      value={newLesson.topic}
                      onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Причастие, Деепричастие..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Добавить сабақ
                  </button>
                </form>
              </div>
            </div>

            {/* Lessons List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Сабақтар</h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Причастие: Определение и классификация</h3>
                          <p className="text-sm text-gray-600 mt-1">Сынып: 5 | Тақырыбы: Причастие</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                            Өңдеу
                          </button>
                          <button className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                            Өшіру
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Тестлер</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Тест: Причастие - Определение</h3>
                      <p className="text-sm text-gray-600 mt-1">Сабақ: Причастие | Сұрақтар: 5</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        Өңдеу
                      </button>
                      <button className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                        Өшіру
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Пользователи</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Аты</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Рөлі</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Сынып</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Топ</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Әрекет</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-gray-900">Қуаныш</td>
                      <td className="py-3 px-4 text-gray-600">kuanysh@example.com</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                          Студент
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">5</td>
                      <td className="py-3 px-4 text-gray-600">Жамбыл</td>
                      <td className="py-3 px-4">
                        <button className="text-red-600 hover:text-red-700 font-semibold">Өшіру</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Барлық студенттер', value: '156' },
              { label: 'Аяқталған сабақтар', value: '2,340' },
              { label: 'Орташа дәлдік', value: '78%' },
              { label: 'Активті пайдаланушылар', value: '89' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-600 text-sm font-semibold mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
