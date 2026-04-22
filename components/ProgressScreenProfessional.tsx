import React from 'react';

interface ProgressItem {
  id: number;
  title: string;
  completed: boolean;
}

interface ProgressScreenProps {
  items: ProgressItem[];
  onClose: () => void;
}

export const ProgressScreenProfessional: React.FC<ProgressScreenProps> = ({
  items,
  onClose,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Прогресс</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Overall Progress */}
          <div className="bg-white rounded-2xl p-8 mb-12 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Общий прогресс</h2>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-600">Завершено</span>
                <span className="text-2xl font-bold text-gray-900">45%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">15</p>
              <p className="text-sm text-gray-600 font-semibold">Всего вопросов</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">7</p>
              <p className="text-sm text-gray-600 font-semibold">Правильных</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <p className="text-3xl font-bold text-orange-600 mb-2">3</p>
              <p className="text-sm text-gray-600 font-semibold">Серия</p>
            </div>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Темы</h3>
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4 hover:border-gray-300 transition"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  item.completed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.completed ? '✓' : item.id}
                </div>
                <span className={`flex-1 font-semibold ${
                  item.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {item.title}
                </span>
                {item.completed && (
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
