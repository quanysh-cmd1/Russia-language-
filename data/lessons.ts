import { Lesson, Difficulty } from '../types';

export const lessons: Lesson[] = [
  // Grade 5 Lessons
  {
    id: 'grade5-nouns',
    title: 'Имена существительные (5 класс)',
    description: 'Основные понятия о существительных, род, число, падеж.',
    videoUrl: 'https://www.youtube.com/embed/fW8_vX8S7uI',
    category: 'Морфология',
    difficulty: Difficulty.EASY,
    grade: 5
  },
  {
    id: 'grade5-adjectives',
    title: 'Имена прилагательные (5 класс)',
    description: 'Качественные, относительные и притяжательные прилагательные.',
    videoUrl: 'https://www.youtube.com/embed/Xp_N9Nn_6vE',
    category: 'Морфология',
    difficulty: Difficulty.EASY,
    grade: 5
  },
  {
    id: 'grade5-verbs',
    title: 'Глаголы (5 класс)',
    description: 'Вид глагола, время, лицо и число.',
    videoUrl: 'https://www.youtube.com/embed/7X8_L_6_S_o',
    category: 'Морфология',
    difficulty: Difficulty.EASY,
    grade: 5
  },
  {
    id: 'grade5-punctuation',
    title: 'Пунктуация в простом предложении',
    description: 'Правила расстановки знаков препинания в простых предложениях.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Синтаксис',
    difficulty: Difficulty.EASY,
    grade: 5
  },

  // Grade 6 Lessons
  {
    id: 'grade6-pronouns',
    title: 'Местоимения (6 класс)',
    description: 'Личные, притяжательные, указательные и другие типы местоимений.',
    videoUrl: 'https://www.youtube.com/embed/fW8_vX8S7uI',
    category: 'Морфология',
    difficulty: Difficulty.MEDIUM,
    grade: 6
  },
  {
    id: 'grade6-numerals',
    title: 'Числительные (6 класс)',
    description: 'Количественные и порядковые числительные, их склонение.',
    videoUrl: 'https://www.youtube.com/embed/Xp_N9Nn_6vE',
    category: 'Морфология',
    difficulty: Difficulty.MEDIUM,
    grade: 6
  },
  {
    id: 'grade6-compound-sentence',
    title: 'Сложное предложение (6 класс)',
    description: 'Сложносочиненные и сложноподчиненные предложения.',
    videoUrl: 'https://www.youtube.com/embed/7X8_L_6_S_o',
    category: 'Синтаксис',
    difficulty: Difficulty.MEDIUM,
    grade: 6
  },

  // Grade 7 Lessons
  {
    id: 'grade7-participles',
    title: 'Причастия (7 класс)',
    description: 'Причастие как часть речи, причастный оборот.',
    videoUrl: 'https://www.youtube.com/embed/fW8_vX8S7uI',
    category: 'Морфология',
    difficulty: Difficulty.MEDIUM,
    grade: 7
  },
  {
    id: 'grade7-gerunds',
    title: 'Деепричастия (7 класс)',
    description: 'Деепричастие как часть речи, деепричастный оборот.',
    videoUrl: 'https://www.youtube.com/embed/Xp_N9Nn_6vE',
    category: 'Морфология',
    difficulty: Difficulty.MEDIUM,
    grade: 7
  },
  {
    id: 'grade7-prepositions',
    title: 'Предлоги и союзы (7 класс)',
    description: 'Служебные части речи: предлоги, союзы, частицы.',
    videoUrl: 'https://www.youtube.com/embed/7X8_L_6_S_o',
    category: 'Морфология',
    difficulty: Difficulty.MEDIUM,
    grade: 7
  },
  {
    id: 'grade7-punctuation-advanced',
    title: 'Пунктуация при причастных оборотах',
    description: 'Правила расстановки запятых при причастных оборотах.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Синтаксис',
    difficulty: Difficulty.CHALLENGING,
    grade: 7
  },

  // Grade 8 Lessons
  {
    id: 'grade8-complex-sentences',
    title: 'Сложные синтаксические конструкции (8 класс)',
    description: 'Многоуровневые сложные предложения и их анализ.',
    videoUrl: 'https://www.youtube.com/embed/fW8_vX8S7uI',
    category: 'Синтаксис',
    difficulty: Difficulty.CHALLENGING,
    grade: 8
  },
  {
    id: 'grade8-direct-speech',
    title: 'Прямая и косвенная речь (8 класс)',
    description: 'Оформление прямой речи, диалога, цитат.',
    videoUrl: 'https://www.youtube.com/embed/Xp_N9Nn_6vE',
    category: 'Синтаксис',
    difficulty: Difficulty.CHALLENGING,
    grade: 8
  },
  {
    id: 'grade8-spelling-nn',
    title: 'Правописание Н и НН',
    description: 'Правила написания одной и двух букв Н в разных частях речи.',
    videoUrl: 'https://www.youtube.com/embed/7X8_L_6_S_o',
    category: 'Орфография',
    difficulty: Difficulty.CHALLENGING,
    grade: 8
  },

  // Grade 9 Lessons
  {
    id: 'grade9-stylistics',
    title: 'Стилистика русского языка (9 класс)',
    description: 'Функциональные стили речи и их особенности.',
    videoUrl: 'https://www.youtube.com/embed/fW8_vX8S7uI',
    category: 'Стилистика',
    difficulty: Difficulty.CHALLENGING,
    grade: 9
  },
  {
    id: 'grade9-text-analysis',
    title: 'Анализ текста (9 класс)',
    description: 'Методика анализа художественного и публицистического текста.',
    videoUrl: 'https://www.youtube.com/embed/Xp_N9Nn_6vE',
    category: 'Литература',
    difficulty: Difficulty.CHALLENGING,
    grade: 9
  },

  // Grade 10 Lessons
  {
    id: 'grade10-rhetoric',
    title: 'Риторика и ораторское искусство (10 класс)',
    description: 'Основы публичного выступления и убедительной речи.',
    videoUrl: 'https://www.youtube.com/embed/7X8_L_6_S_o',
    category: 'Риторика',
    difficulty: Difficulty.CHALLENGING,
    grade: 10
  },
  {
    id: 'grade10-etymology',
    title: 'Этимология слов (10 класс)',
    description: 'Происхождение слов и развитие их значений.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Лексикология',
    difficulty: Difficulty.CHALLENGING,
    grade: 10
  },

  // Grade 11 Lessons
  {
    id: 'grade11-exam-prep',
    title: 'Подготовка к ЕГЭ: часть 1 (11 класс)',
    description: 'Разбор заданий 1-26 ЕГЭ по русскому языку.',
    videoUrl: 'https://www.youtube.com/embed/fW8_vX8S7uI',
    category: 'ЕГЭ',
    difficulty: Difficulty.CHALLENGING,
    grade: 11
  },
  {
    id: 'grade11-essay',
    title: 'Написание сочинения-рассуждения (11 класс)',
    description: 'Структура и методика написания сочинения на ЕГЭ.',
    videoUrl: 'https://www.youtube.com/embed/Xp_N9Nn_6vE',
    category: 'ЕГЭ',
    difficulty: Difficulty.CHALLENGING,
    grade: 11
  },
  {
    id: 'grade11-common-mistakes',
    title: 'Типичные ошибки на ЕГЭ (11 класс)',
    description: 'Анализ самых распространенных ошибок учащихся.',
    videoUrl: 'https://www.youtube.com/embed/7X8_L_6_S_o',
    category: 'ЕГЭ',
    difficulty: Difficulty.CHALLENGING,
    grade: 11
  }
];
