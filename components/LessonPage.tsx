import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';

interface LessonPageProps {
  lesson: Lesson;
  onSkip: () => void;
  onComplete: () => void;
}

const LessonPage: React.FC<LessonPageProps> = ({ lesson, onSkip, onComplete }) => {
  const [videoWatched, setVideoWatched] = useState(false);
  const [watchTime, setWatchTime] = useState(0);

  useEffect(() => {
    // Simulate video watching progress
    const interval = setInterval(() => {
      setWatchTime(prev => {
        if (prev >= 100) {
          setVideoWatched(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 scale-75 origin-top-left">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
          <p className="text-lg text-gray-600">{lesson.description}</p>
          <div className="flex gap-4 mt-4">
            <span className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded-full font-semibold">
              {lesson.category}
            </span>
            {lesson.grade && (
              <span className="inline-block bg-green-200 text-green-800 px-4 py-2 rounded-full font-semibold">
                {lesson.grade} класс
              </span>
            )}
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="relative w-full bg-black rounded-lg overflow-hidden mb-6" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={lesson.videoUrl}
              title={lesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Прогресс видео</span>
              <span className="text-sm font-semibold text-gray-700">{Math.round(watchTime)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${watchTime}%` }}
              />
            </div>
          </div>

          {/* Video Status */}
          {videoWatched && (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-green-700 font-semibold">✓ Видео просмотрено полностью!</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onSkip}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Пропустить видео
            </button>
            <button
              onClick={onComplete}
              disabled={!videoWatched}
              className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors duration-200 ${
                videoWatched
                  ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {videoWatched ? 'Перейти к тесту' : 'Просмотрите видео полностью'}
            </button>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">О этом уроке</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-2">КАТЕГОРИЯ</p>
              <p className="text-lg text-gray-800">{lesson.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-2">УРОВЕНЬ СЛОЖНОСТИ</p>
              <p className="text-lg text-gray-800">{lesson.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
