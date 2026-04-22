import React from 'react';

interface GameScreenProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  isAnswered: boolean;
  correctAnswer: string;
}

export const GameScreenProfessional: React.FC<GameScreenProps> = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  isAnswered,
  correctAnswer,
}) => {
  const progressPercent = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button className="text-gray-400 hover:text-gray-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Причастие</h1>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-red-500 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Вопрос {questionNumber} из {totalQuestions}</span>
              <span className="text-sm font-semibold text-gray-600">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Question */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {question}
            </h2>
            <p className="text-gray-500 text-lg">
              Читающий книгу мальчик сидел у окна.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-12">
            {options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = selectedAnswer === option;
              const isCorrect = option === correctAnswer;
              const showCorrect = isAnswered && isCorrect;
              const showIncorrect = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => !isAnswered && onSelectAnswer(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl font-semibold text-lg text-left transition-all duration-200 flex items-center gap-4 ${
                    showCorrect
                      ? 'bg-green-50 border-2 border-green-500 text-green-900'
                      : showIncorrect
                      ? 'bg-red-50 border-2 border-red-500 text-red-900'
                      : isSelected
                      ? 'bg-blue-50 border-2 border-blue-500 text-blue-900'
                      : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-300'
                  } ${!isAnswered && !isSelected ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base ${
                    showCorrect
                      ? 'bg-green-500 text-white'
                      : showIncorrect
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {letter}
                  </div>
                  <span>{option}</span>
                  {showCorrect && (
                    <svg className="w-6 h-6 ml-auto text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {showIncorrect && (
                    <svg className="w-6 h-6 ml-auto text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint & Next Button */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">
              💡 Подсказка
            </button>
            <button 
              onClick={onNext}
              disabled={!isAnswered}
              className={`flex-1 px-6 py-4 rounded-xl font-semibold text-lg text-white transition-all ${
                isAnswered
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Следующий вопрос →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
