import mysql from 'mysql2/promise';

const lessonsData = [
  // Grade 5 - Причастие (Participles)
  {
    title: 'Причастие: Определение и классификация',
    description: 'Узнайте, что такое причастие и как его классифицировать',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    grade: 5,
    topic: 'Причастие',
    order: 1,
  },
  {
    title: 'Действительные причастия настоящего времени',
    description: 'Изучение действительных причастий настоящего времени',
    youtubeUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    grade: 5,
    topic: 'Причастие',
    order: 2,
  },
  {
    title: 'Страдательные причастия настоящего времени',
    description: 'Изучение страдательных причастий настоящего времени',
    youtubeUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    grade: 5,
    topic: 'Причастие',
    order: 3,
  },

  // Grade 5 - Деепричастие (Gerunds)
  {
    title: 'Деепричастие: Введение',
    description: 'Основные понятия о деепричастиях',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    grade: 5,
    topic: 'Деепричастие',
    order: 1,
  },
  {
    title: 'Деепричастия совершенного вида',
    description: 'Изучение деепричастий совершенного вида',
    youtubeUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    grade: 5,
    topic: 'Деепричастие',
    order: 2,
  },

  // Grade 6 - Пунктуация (Punctuation)
  {
    title: 'Запятая в сложных предложениях',
    description: 'Правила использования запятой в сложных предложениях',
    youtubeUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    grade: 6,
    topic: 'Пунктуация',
    order: 1,
  },
  {
    title: 'Точка с запятой и двоеточие',
    description: 'Когда использовать точку с запятой и двоеточие',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    grade: 6,
    topic: 'Пунктуация',
    order: 2,
  },

  // Grade 6 - Орфография (Spelling)
  {
    title: 'Правописание безударных гласных',
    description: 'Правила написания безударных гласных в корне слова',
    youtubeUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    grade: 6,
    topic: 'Орфография',
    order: 1,
  },
  {
    title: 'Правописание согласных',
    description: 'Правила написания согласных букв',
    youtubeUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    grade: 6,
    topic: 'Орфография',
    order: 2,
  },

  // Grade 7 - Синтаксис (Syntax)
  {
    title: 'Простое предложение',
    description: 'Структура и виды простых предложений',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    grade: 7,
    topic: 'Синтаксис',
    order: 1,
  },
  {
    title: 'Сложное предложение',
    description: 'Виды сложных предложений и их структура',
    youtubeUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    grade: 7,
    topic: 'Синтаксис',
    order: 2,
  },

  // Grade 8 - Морфология (Morphology)
  {
    title: 'Части речи: Существительное',
    description: 'Определение и классификация существительных',
    youtubeUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    grade: 8,
    topic: 'Морфология',
    order: 1,
  },
  {
    title: 'Части речи: Прилагательное',
    description: 'Определение и классификация прилагательных',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    grade: 8,
    topic: 'Морфология',
    order: 2,
  },

  // Grade 9 - Стилистика (Stylistics)
  {
    title: 'Стили речи',
    description: 'Разговорный, официально-деловой, научный стили',
    youtubeUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    grade: 9,
    topic: 'Стилистика',
    order: 1,
  },
  {
    title: 'Выразительные средства языка',
    description: 'Метафора, сравнение, олицетворение и другие средства',
    youtubeUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    grade: 9,
    topic: 'Стилистика',
    order: 2,
  },

  // Grade 10 - Лексика (Vocabulary)
  {
    title: 'Синонимы и антонимы',
    description: 'Использование синонимов и антонимов в речи',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    grade: 10,
    topic: 'Лексика',
    order: 1,
  },
  {
    title: 'Фразеологизмы',
    description: 'Устойчивые выражения и их значение',
    youtubeUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    grade: 10,
    topic: 'Лексика',
    order: 2,
  },

  // Grade 11 - Углубленное изучение (Advanced)
  {
    title: 'Сложные случаи пунктуации',
    description: 'Трудные правила расстановки знаков препинания',
    youtubeUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    grade: 11,
    topic: 'Пунктуация',
    order: 1,
  },
  {
    title: 'Анализ текста',
    description: 'Методика комплексного анализа текста',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    grade: 11,
    topic: 'Анализ текста',
    order: 2,
  },
];

async function seedLessons() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'russia_language',
  });

  try {
    for (const lesson of lessonsData) {
      await connection.execute(
        'INSERT INTO lessons (title, description, youtubeUrl, grade, topic, `order`) VALUES (?, ?, ?, ?, ?, ?)',
        [lesson.title, lesson.description, lesson.youtubeUrl, lesson.grade, lesson.topic, lesson.order]
      );
    }
    console.log('✅ Lessons seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding lessons:', error);
  } finally {
    await connection.end();
  }
}

seedLessons();
