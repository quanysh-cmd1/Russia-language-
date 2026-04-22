import React from 'react';

interface AuthScreensProps {
  isSignup: boolean;
  login: string;
  password: string;
  confirmPassword: string;
  error: string;
  onLoginChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleSignup: (value: boolean) => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  isSignup,
  login,
  password,
  confirmPassword,
  error,
  onLoginChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onToggleSignup,
}) => {
  return isSignup ? (
    <div className="flex items-center justify-center py-10 animate-fadeIn w-full px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-12 lg:p-16 w-full max-w-md border border-gray-100 transition-all hover:shadow-green-200/50 duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-transform hover:scale-110 duration-500 rotate-3">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Регистрация</h2>
          <p className="text-sm text-gray-400 font-bold mt-2 uppercase tracking-widest">Создайте новый аккаунт</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => onLoginChange(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-green-400 focus:ring-8 focus:ring-green-50 transition-all outline-none bg-gray-50/50 font-black text-lg text-gray-700"
              placeholder="Введите логин"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-green-400 focus:ring-8 focus:ring-green-50 transition-all outline-none bg-gray-50/50 font-black text-lg text-gray-700"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Подтвердите пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-green-400 focus:ring-8 focus:ring-green-50 transition-all outline-none bg-gray-50/50 font-black text-lg text-gray-700"
              placeholder="••••••••"
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
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-black py-5 rounded-2xl text-xl shadow-xl hover:shadow-green-200 transform transition-all active:scale-95 duration-200 mt-4"
          >
            Создать аккаунт
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 font-bold mb-3">Уже есть аккаунт?</p>
          <button
            onClick={() => onToggleSignup(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-black py-3 rounded-2xl text-lg transition-all active:scale-95 duration-200"
          >
            Вернуться к входу
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center py-10 animate-fadeIn w-full px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-12 lg:p-16 w-full max-w-md border border-gray-100 transition-all hover:shadow-blue-200/50 duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-transform hover:scale-110 duration-500 rotate-3">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-4.514A9.01 9.01 0 0012 21a9.003 9.003 0 008.313-12.454M15.514 5.514a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L12 6.586l2.086-2.086a1 1 0 011.414 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Авторизация</h2>
          <p className="text-sm text-gray-400 font-bold mt-2 uppercase tracking-widest">Открытый урок русского языка</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => onLoginChange(e.target.value)}
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
              onChange={(e) => onPasswordChange(e.target.value)}
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

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 font-bold mb-3">Нет аккаунта?</p>
          <button
            onClick={() => onToggleSignup(true)}
            className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-black py-3 rounded-2xl text-lg transition-all active:scale-95 duration-200"
          >
            Создать аккаунт
          </button>
        </div>
      </div>
    </div>
  );
};
