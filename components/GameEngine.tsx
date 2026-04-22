
import React, { useState } from 'react';
import { GameType, GameState, Difficulty, Question } from '../types';
import { audioEngine } from '../utils/AudioEngine';

interface GameEngineProps {
  questions: Question[];
  onComplete: (finalState: GameState) => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ questions, onComplete }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    mistakes: 0,
    history: [],
  });
  
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean; explanation: string } | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [sortingState, setSortingState] = useState<{ [key: string]: string }>({});
  const [constructorState, setConstructorState] = useState<string[]>([]);

  const currentQuestion = questions[gameState.currentQuestionIndex];

  React.useEffect(() => {
    setSortingState({});
    setConstructorState([]);
  }, [currentQuestion?.id]);

  const handleAnswer = (answer: any) => {
    if (feedback?.show) return;

    setSelectedOption(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      audioEngine.playCorrect();
    } else {
      audioEngine.playIncorrect();
    }

    setFeedback({
      isCorrect,
      show: true,
      explanation: currentQuestion.explanation,
    });

    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      mistakes: isCorrect ? prev.mistakes : prev.mistakes + 1,
      history: [...prev.history, {
        questionId: currentQuestion.id,
        isCorrect,
        userAnswer: answer,
        category: currentQuestion.type,
      }]
    }));
  };

  const nextQuestion = () => {
    audioEngine.playTransition();
    setFeedback(null);
    setSelectedOption(null);
    if (gameState.currentQuestionIndex + 1 < questions.length) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    } else {
      onComplete(gameState);
    }
  };

  const renderGameMechanic = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case GameType.MULTIPLE_CHOICE:
      case GameType.ERROR_DETECTION:
      case GameType.SENTENCE_COMPARISON:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 w-full max-w-3xl">
            {currentQuestion.options?.map((option, idx) => {
              const value = (currentQuestion.type === GameType.SENTENCE_COMPARISON || currentQuestion.type === GameType.ERROR_DETECTION) ? idx : option;
              const isCorrectOption = value === currentQuestion.correctAnswer;
              const isSelected = selectedOption === value;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(value)}
                  disabled={feedback?.show}
                  className={`p-4 md:p-6 lg:p-8 text-sm sm:text-base md:text-lg lg:text-xl text-left border-2 md:border-4 rounded-xl md:rounded-[1.5rem] transition-all duration-300 transform shadow-md hover:shadow-xl active:scale-[0.98] animate-slideIn ${
                    feedback?.show && isCorrectOption
                      ? 'bg-green-100 border-green-500 text-green-900 scale-[1.03] z-10'
                      : feedback?.show && isSelected && !isCorrectOption
                      ? 'bg-red-100 border-red-500 text-red-900 opacity-90 scale-[0.97]'
                      : 'bg-white border-blue-50 hover:border-blue-400 text-blue-900 active:bg-blue-50'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <span className="font-black mr-3 text-blue-300 select-none">
                    {String.fromCharCode(65 + idx)})
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        );

      case GameType.TRUE_FALSE:
        return (
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full max-w-2xl justify-center">
            {[
              { label: 'Верно', value: true, color: 'emerald' },
              { label: 'Неверно', value: false, color: 'rose' }
            ].map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                disabled={feedback?.show}
                className={`flex-1 p-6 md:p-8 lg:p-10 text-xl md:text-2xl lg:text-3xl font-black border-4 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 animate-slideIn shadow-lg transform active:scale-95 ${
                  feedback?.show && option.value === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800 scale-105 z-10'
                    : feedback?.show && selectedOption === option.value
                    ? 'bg-red-100 border-red-500 text-red-800 scale-95 opacity-80'
                    : 'bg-white border-blue-50 hover:border-blue-400 text-blue-900 active:bg-blue-50'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {option.label}
              </button>
            ))}
          </div>
        );

      case GameType.DRAG_DROP:
        return (
          <div className="flex flex-col gap-6 w-full items-center">
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              {currentQuestion.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={feedback?.show}
                  className={`px-6 md:px-10 py-4 md:py-6 text-xl md:text-3xl lg:text-4xl font-black border-4 rounded-xl md:rounded-[2rem] transition-all duration-300 animate-slideIn shadow-xl transform active:scale-90 ${
                    feedback?.show && option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800 scale-110 z-10'
                      : feedback?.show && selectedOption === option
                      ? 'bg-red-100 border-red-500 text-red-800 scale-90 opacity-80'
                      : 'bg-white border-blue-50 hover:border-blue-400 text-blue-900 active:bg-blue-50'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case GameType.SORTING:
        const words = currentQuestion.question.split(': ')[1].split(', ');
        const categories = currentQuestion.options || [];
        return (
          <div className="flex flex-col gap-8 w-full max-w-4xl items-center">
            <div className="flex flex-wrap justify-center gap-4">
              {words.map((word, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-lg border-2 border-blue-50 flex flex-col gap-3 min-w-[150px]">
                  <span className="font-black text-xl text-blue-900">{word}</span>
                  <select 
                    disabled={feedback?.show}
                    className="bg-gray-50 border-2 border-gray-100 rounded-xl p-3 text-sm font-black outline-none focus:border-blue-400 appearance-none cursor-pointer"
                    value={sortingState[word] || ''}
                    onChange={(e) => setSortingState({ ...sortingState, [word]: e.target.value })}
                  >
                    <option value="">Выбрать...</option>
                    {categories.map((cat, cIdx) => (
                      <option key={cIdx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {!feedback?.show && (
              <button
                onClick={() => {
                  const answer = categories.map(cat => 
                    Object.keys(sortingState).filter(word => sortingState[word] === cat).sort().join(',')
                  ).join('|');
                  handleAnswer(answer);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-16 rounded-[2rem] font-black text-2xl shadow-xl transform transition-all active:scale-95"
              >
                Проверить
              </button>
            )}
          </div>
        );

      case GameType.WORD_CONSTRUCTOR:
        const parts = currentQuestion.options || [];
        return (
          <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
            <div className="bg-gray-50 p-10 rounded-[3rem] border-4 border-dashed border-blue-100 min-h-[120px] w-full flex flex-wrap justify-center gap-4 shadow-inner">
              {constructorState.map((part, idx) => (
                <button 
                  key={idx} 
                  disabled={feedback?.show}
                  onClick={() => setConstructorState(constructorState.filter((_, i) => i !== idx))}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-3xl shadow-lg animate-fadeIn transform hover:scale-105 active:scale-95"
                >
                  {part}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {parts.map((part, idx) => (
                <button
                  key={idx}
                  disabled={feedback?.show || constructorState.includes(part)}
                  onClick={() => setConstructorState([...constructorState, part])}
                  className={`px-8 py-4 rounded-2xl font-black text-3xl shadow-md transition-all transform active:scale-90 ${
                    constructorState.includes(part) 
                      ? 'bg-gray-100 text-gray-300 border-2 border-gray-200' 
                      : 'bg-white text-blue-600 border-4 border-blue-50 hover:border-blue-400'
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>
            {!feedback?.show && (
              <button
                onClick={() => handleAnswer(constructorState.join(''))}
                className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-16 rounded-[2rem] font-black text-2xl shadow-xl transform transition-all active:scale-95"
              >
                Собрать слово
              </button>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch(diff) {
      case Difficulty.EASY: return 'text-green-600 bg-green-50 border-green-200';
      case Difficulty.MEDIUM: return 'text-orange-600 bg-orange-50 border-orange-200';
      case Difficulty.CHALLENGING: return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn px-2 md:px-4">
      <div className="w-full max-w-4xl mb-8 md:mb-12">
        <div className="flex justify-between items-center mb-4 px-3">
          <p className="text-sm md:text-lg font-black text-gray-400 uppercase tracking-[0.2em] select-none">
            Вопрос {gameState.currentQuestionIndex + 1} <span className="text-gray-300 mx-1">/</span> {questions.length}
          </p>
          <span className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border-2 shadow-sm transition-colors ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty === Difficulty.EASY ? 'Легко' : currentQuestion.difficulty === Difficulty.MEDIUM ? 'Средне' : 'Сложно'}
          </span>
        </div>
        <div className="w-full bg-white rounded-full h-3 md:h-6 shadow-inner overflow-hidden border border-gray-100 p-1">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${((gameState.currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] shadow-2xl p-6 sm:p-10 md:p-12 lg:p-16 w-full max-w-4xl min-h-[350px] md:min-h-[450px] lg:min-h-[500px] flex flex-col items-center justify-center relative border border-gray-50 overflow-hidden transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-blue-600 opacity-20"></div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-center text-gray-800 mb-8 md:mb-12 lg:mb-16 leading-[1.2] px-2 tracking-tight">
          {currentQuestion.question}
        </h2>

        <div className="w-full flex justify-center">
          {renderGameMechanic()}
        </div>

        {feedback?.show && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/40 backdrop-blur-md">
             <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-16 w-full max-w-2xl max-h-[90%] flex flex-col items-center shadow-2xl border border-gray-100 animate-fadeIn overflow-y-auto">
                <div className={`flex-shrink-0 w-16 h-16 sm:w-24 md:w-32 sm:h-24 md:h-32 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-8 shadow-lg ${feedback.isCorrect ? 'bg-green-50 text-green-500 border border-green-100' : 'bg-red-50 text-red-500 border border-red-100'}`}>
                  {feedback.isCorrect ? (
                    <svg className="w-10 h-10 sm:w-16 md:w-20 sm:h-16 md:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <svg className="w-10 h-10 sm:w-16 md:w-20 sm:h-16 md:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                  )}
                </div>
                <p className={`flex-shrink-0 text-2xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tighter ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {feedback.isCorrect ? 'Верно! ✨' : 'Ошибка! 💡'}
                </p>
                <div className="flex-shrink-0 bg-blue-50/50 p-4 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-dashed border-blue-100 mb-6 sm:mb-10 md:mb-12 w-full transition-colors hover:bg-white duration-300">
                  <p className="text-sm sm:text-lg md:text-2xl text-gray-700 text-center leading-relaxed font-bold italic">
                    {feedback.explanation}
                  </p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="flex-shrink-0 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-4 sm:py-6 md:py-8 px-10 sm:px-16 md:px-24 rounded-[1.2rem] sm:rounded-[2rem] text-lg sm:text-2xl md:text-3xl shadow-xl hover:shadow-blue-200 transform transition-all active:scale-95 duration-200"
                >
                  Дальше
                </button>
             </div>
          </div>
        )}
      </div>

      <div className="mt-8 md:mt-12 lg:mt-16 flex gap-6 md:gap-12 lg:gap-20 w-full justify-center px-4">
        <div className="bg-white px-8 md:px-14 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border-b-8 border-green-500 text-center flex-1 max-w-[220px] transition-transform hover:-translate-y-2 duration-300">
          <p className="text-gray-400 text-[10px] md:text-xs uppercase font-black tracking-widest mb-1 select-none">Верно</p>
          <p className="text-3xl md:text-5xl lg:text-6xl font-black text-green-500 tabular-nums">{gameState.score}</p>
        </div>
        <div className="bg-white px-8 md:px-14 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border-b-8 border-red-500 text-center flex-1 max-w-[220px] transition-transform hover:-translate-y-2 duration-300">
          <p className="text-gray-400 text-[10px] md:text-xs uppercase font-black tracking-widest mb-1 select-none">Ошибки</p>
          <p className="text-3xl md:text-5xl lg:text-6xl font-black text-red-500 tabular-nums">{gameState.mistakes}</p>
        </div>
      </div>
    </div>
  );
};

export default GameEngine;
