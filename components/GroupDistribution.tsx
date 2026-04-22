
import React, { useState, useEffect } from 'react';

interface GroupDistributionProps {
  username: string;
  onComplete: () => void;
}

const GroupDistribution: React.FC<GroupDistributionProps> = ({ username, onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<'Жамбыл' | 'Абай' | null>(null);
  const isTeacher = username === 'rosa_apai';

  useEffect(() => {
    const minDelay = isTeacher ? 4000 : 2000;
    const randomDelay = Math.floor(Math.random() * 1000) + minDelay;

    const timer = setTimeout(() => {
      const jambylGroup = ['kuanysh', 'zhako76', 'zhako_cr7', 'nursultan', 'rasul', 'sezim', 'uldana', 'adilet', 'ramazan', 'rauan', 'perizat'];
      const abaiGroup = ['elnur', 'ramazan_q', 'dinmukhamed76', 'alinur', 'ozzi', 'aidana', 'ayau', 'ramazan_n', 'nurzhan', 'altai86'];

      if (jambylGroup.includes(username)) {
        setGroup('Жамбыл');
      } else if (abaiGroup.includes(username)) {
        setGroup('Абай');
      }
      
      setLoading(false);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [username, isTeacher]);

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-10 border border-gray-100 flex flex-col items-center text-center">
        {loading ? (
          <>
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-8 border-blue-50 rounded-full"></div>
              <div className={`absolute inset-0 border-8 border-blue-600 border-t-transparent rounded-full animate-spin ${isTeacher ? 'duration-[4000ms]' : 'duration-1000'}`}></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-4 animate-pulse">
              Идёт распределение по группам…
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              Пожалуйста, подождите
            </p>
            {isTeacher && (
              <p className="mt-4 text-blue-500 font-black italic animate-bounce">
                Подбор оптимальной группы…
              </p>
            )}
          </>
        ) : isTeacher ? (
          <div className="animate-fadeIn w-full">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-6">Добро пожаловать, Учительница Роза!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-left">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <p className="text-green-600 font-black uppercase text-xs mb-2">Группа: Жамбыл</p>
                <p className="text-gray-600 text-sm leading-relaxed">Куаныш, Жандаулет, Нурсултан, Расул, Сезим, Улдана, Адилет, Рамазан, Рауан, Перизат</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-blue-600 font-black uppercase text-xs mb-2">Группа: Абай</p>
                <p className="text-gray-600 text-sm leading-relaxed">Елнур, Рамазан К., Димаш, Алинур, Олжас, Айдана, Аяулым, Рамазан Н., Касиет, Алтай</p>
              </div>
            </div>
            <button
              onClick={onComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-5 rounded-2xl text-xl shadow-xl hover:shadow-blue-200 transform transition-all active:scale-95 duration-200"
            >
              Начать урок
            </button>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
              Вы зачислены в группу:
            </h2>
            <p className="text-4xl md:text-5xl font-black text-blue-600 mb-10 tracking-tight">
              {group}
            </p>
            <button
              onClick={onComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-5 rounded-2xl text-xl shadow-xl hover:shadow-blue-200 transform transition-all active:scale-95 duration-200"
            >
              Перейти к игре
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDistribution;
