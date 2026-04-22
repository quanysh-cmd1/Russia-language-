import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIGrammarAssistantProps {
  onClose: () => void;
}

export const AIGrammarAssistant: React.FC<AIGrammarAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я ваш помощник по русской грамматике. Задайте мне любой вопрос о грамматике, орфографии или пунктуации. Я помогу вам разобраться! 📚',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Grammar rules database
    const grammarResponses: Record<string, string> = {
      'причастие': 'Причастие - это часть речи, которая обозначает признак предмета по действию. Например: "Читающий мальчик" (мальчик, который читает). Причастия бывают действительные и страдательные, совершенного и несовершенного вида.',
      'деепричастие': 'Деепричастие - это неизменяемая форма глагола, которая обозначает добавочное действие при основном действии. Например: "Читая книгу, он улыбался" (основное действие - улыбался, добавочное - читая).',
      'запятая': 'Запятая ставится: 1) между однородными членами; 2) перед союзами в сложных предложениях; 3) при обращении; 4) при вводных словах. Например: "Мальчик, девочка и кот пошли в лес."',
      'орфография': 'Орфография - это правила написания слов. Основные правила: 1) правописание безударных гласных; 2) правописание согласных; 3) правописание приставок; 4) правописание суффиксов и окончаний.',
      'пунктуация': 'Пунктуация - это система правил расстановки знаков препинания. Основные знаки: точка (.), запятая (,), точка с запятой (;), двоеточие (:), тире (-), вопросительный (?) и восклицательный (!) знаки.',
      'существительное': 'Существительное - это часть речи, которая обозначает предмет. Существительные бывают: одушевленные/неодушевленные, собственные/нарицательные, мужского/женского/среднего рода, единственного/множественного числа.',
      'прилагательное': 'Прилагательное - это часть речи, которая обозначает признак предмета. Прилагательные отвечают на вопросы: какой? какая? какое? какие? Например: "красивый цветок", "синее небо".',
      'глагол': 'Глагол - это часть речи, которая обозначает действие или состояние. Глаголы имеют вид (совершенный/несовершенный), время (прошедшее/настоящее/будущее), лицо, число и род.',
      'спряжение': 'Спряжение - это изменение глагола по лицам и числам. В русском языке два спряжения: I спряжение (окончания -ю, -ешь, -ет...) и II спряжение (окончания -у, -ишь, -ит...).',
      'склонение': 'Склонение - это изменение имени существительного, прилагательного или местоимения по падежам и числам. В русском языке 6 падежей: именительный, родительный, дательный, винительный, творительный, предложный.',
    };

    // Check for keywords in user message
    for (const [keyword, response] of Object.entries(grammarResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default responses for common questions
    if (lowerMessage.includes('привет') || lowerMessage.includes('привет')) {
      return 'Привет! Я здесь, чтобы помочь вам с русской грамматикой. Что вас интересует? 😊';
    }

    if (lowerMessage.includes('спасибо')) {
      return 'Пожалуйста! Рад помочь. Есть ещё вопросы по грамматике? 📖';
    }

    if (lowerMessage.includes('как') && lowerMessage.includes('писать')) {
      return 'Чтобы правильно писать, нужно: 1) знать правила орфографии; 2) помнить исключения; 3) практиковаться. Какое конкретное слово или правило вас интересует?';
    }

    if (lowerMessage.includes('как') && lowerMessage.includes('говорить')) {
      return 'Правильная речь - это использование правильных форм слов, правильного порядка слов в предложении и правильной интонации. Какой конкретный вопрос у вас есть?';
    }

    if (lowerMessage.includes('помощь') || lowerMessage.includes('помогите')) {
      return 'Я помогу! Вы можете спросить меня о: причастиях, деепричастиях, пунктуации, орфографии, частях речи, спряжении, склонении и других аспектах русской грамматики.';
    }

    // Generic response
    return 'Интересный вопрос! К сожалению, я не уверен в ответе на этот конкретный вопрос. Попробуйте спросить о причастиях, деепричастиях, пунктуации, орфографии или других аспектах русской грамматики. 🤔';
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-[2rem] shadow-2xl border border-gray-200 flex flex-col z-50 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-[2rem] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
          <div>
            <h3 className="font-black text-lg">Грамматический помощник</h3>
            <p className="text-xs text-blue-100">Всегда онлайн</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all active:scale-90"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 rounded-b-[2rem]">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
