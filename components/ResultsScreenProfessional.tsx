import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onNext: () => void;
  onReview: () => void;
  onHome: () => void;
}

export const ResultsScreenProfessional: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  onNext,
  onReview,
  onHome,
}) => {
  const accuracy = Math.round((score / totalQuestions) * 100);
  const isSuccess = accuracy >= 70;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Success/Failure Icon */}
        <div className="flex justify-center mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl ${
            isSuccess ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            {isSuccess ? '✓' : '!'}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          {isSuccess ? 'Правильно!' : 'Хороший результат!'}
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          {isSuccess 
            ? 'Вы хорошо усвоили материал по причастиям.'
            : 'Рекомендуем повторить материал и попробовать еще раз.'}
        </p>

        {/* Explanation */}
        <div className="bg-white rounded-2xl p-8 mb-12 border border-gray-200">
          <p className="text-gray-700 text-base leading-relaxed">
            <strong>«Читающий»</strong> — это действительное причастие настоящего времени. Причастие — это особая форма глагола, которая обозначает признак предмета по действию и отвечает на вопросы какой? какая? какое? какие?
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">⭐</div>
            <p className="text-sm text-gray-600 font-semibold">+10 баллов</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">🎯</div>
            <p className="text-sm text-gray-600 font-semibold">Серия 4</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">🏆</div>
            <p className="text-sm text-gray-600 font-semibold">120 всего баллов</p>
          </div>
        </div>

        {/* Main Score */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 mb-12 border border-blue-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-4">Ваш результат</p>
            <div className="text-6xl font-bold text-blue-600 mb-4">{accuracy}%</div>
            <p className="text-gray-700 text-lg font-semibold">{score} из {totalQuestions} правильных ответов</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={onNext}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Следующий вопрос →
          </button>
          <button
            onClick={onReview}
            className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:bg-gray-50 transition-all"
          >
            Посмотреть объяснение
          </button>
          <button
            onClick={onHome}
            className="w-full px-6 py-4 rounded-xl bg-gray-100 text-gray-700 font-semibold text-lg hover:bg-gray-200 transition-all"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};
