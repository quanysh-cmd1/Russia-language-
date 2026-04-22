import mysql from 'mysql2/promise';

const testsData = [
  // Grade 5 - Причастие Tests
  {
    lessonId: 1,
    title: 'Тест: Причастие - Определение',
    description: 'Проверьте знание определения причастия',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Укажите причастие в предложении: "Читающий книгу мальчик сидел у окна."',
        options: ['Читающий', 'книгу', 'мальчик', 'окна'],
        correct: 0,
        explanation: '"Читающий" - это действительное причастие настоящего времени, обозначающее признак предмета по действию.',
      },
      {
        id: 2,
        question: 'Какое причастие называется действительным?',
        options: [
          'Причастие, обозначающее действие, совершаемое самим предметом',
          'Причастие, обозначающее действие, совершаемое над предметом',
          'Причастие, обозначающее состояние предмета',
          'Причастие, обозначающее качество предмета',
        ],
        correct: 0,
        explanation: 'Действительное причастие обозначает действие, которое совершает сам предмет.',
      },
    ]),
  },
  {
    lessonId: 2,
    title: 'Тест: Действительные причастия настоящего времени',
    description: 'Проверьте знание действительных причастий настоящего времени',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Образуйте действительное причастие настоящего времени от глагола "писать":',
        options: ['пишущий', 'написанный', 'писавший', 'пишемый'],
        correct: 0,
        explanation: 'От глагола "писать" образуется причастие "пишущий" (3-е лицо, множественное число).',
      },
      {
        id: 2,
        question: 'Какое окончание имеют действительные причастия настоящего времени?',
        options: ['-ущий/-ющий', '-анный/-янный', '-авший/-евший', '-аемый/-яемый'],
        correct: 0,
        explanation: 'Действительные причастия настоящего времени имеют окончания -ущий/-ющий.',
      },
    ]),
  },

  // Grade 5 - Деепричастие Tests
  {
    lessonId: 4,
    title: 'Тест: Деепричастие - Введение',
    description: 'Проверьте базовые знания о деепричастиях',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Что такое деепричастие?',
        options: [
          'Неизменяемая форма глагола, обозначающая добавочное действие',
          'Изменяемая форма глагола, обозначающая признак предмета',
          'Часть речи, обозначающая признак действия',
          'Форма глагола, обозначающая состояние предмета',
        ],
        correct: 0,
        explanation: 'Деепричастие - это неизменяемая форма глагола, обозначающая добавочное действие при основном действии.',
      },
    ]),
  },

  // Grade 6 - Пунктуация Tests
  {
    lessonId: 7,
    title: 'Тест: Запятая в сложных предложениях',
    description: 'Проверьте знание правил использования запятой',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Где нужна запятая? "Когда наступила весна [,] птицы начали петь."',
        options: ['Нужна запятая', 'Запятая не нужна', 'Нужна точка с запятой', 'Нужно двоеточие'],
        correct: 0,
        explanation: 'В сложноподчиненном предложении запятая ставится между главной и придаточной частями.',
      },
    ]),
  },

  // Grade 6 - Орфография Tests
  {
    lessonId: 9,
    title: 'Тест: Правописание безударных гласных',
    description: 'Проверьте знание правил написания безударных гласных',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Выберите правильное написание: "м_лодой"',
        options: ['молодой', 'малодой', 'мелодой', 'миладой'],
        correct: 0,
        explanation: 'Безударная гласная "о" в корне слова проверяется словом "молод".',
      },
    ]),
  },

  // Grade 7 - Синтаксис Tests
  {
    lessonId: 11,
    title: 'Тест: Простое предложение',
    description: 'Проверьте знание структуры простых предложений',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Какое предложение является простым?',
        options: [
          'Когда наступила весна, птицы начали петь.',
          'Птицы поют.',
          'Птицы поют, и цветы расцветают.',
          'Хотя было холодно, дети играли.',
        ],
        correct: 1,
        explanation: 'Простое предложение содержит одну грамматическую основу (подлежащее и сказуемое).',
      },
    ]),
  },

  // Grade 8 - Морфология Tests
  {
    lessonId: 13,
    title: 'Тест: Существительное',
    description: 'Проверьте знание существительных',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Какое слово является существительным?',
        options: ['красивый', 'красота', 'красиво', 'краснеть'],
        correct: 1,
        explanation: 'Существительное - это часть речи, обозначающая предмет. "Красота" - существительное.',
      },
    ]),
  },

  // Grade 9 - Стилистика Tests
  {
    lessonId: 15,
    title: 'Тест: Стили речи',
    description: 'Проверьте знание стилей речи',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Какой стиль используется в научных работах?',
        options: ['Разговорный', 'Научный', 'Официально-деловой', 'Художественный'],
        correct: 1,
        explanation: 'Научный стиль используется в научных работах, учебниках и статьях.',
      },
    ]),
  },

  // Grade 10 - Лексика Tests
  {
    lessonId: 17,
    title: 'Тест: Синонимы и антонимы',
    description: 'Проверьте знание синонимов и антонимов',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Найдите синоним к слову "красивый":',
        options: ['уродливый', 'прекрасный', 'маленький', 'большой'],
        correct: 1,
        explanation: 'Синонимы - это слова, близкие по значению. "Прекрасный" - синоним к "красивый".',
      },
    ]),
  },

  // Grade 11 - Advanced Tests
  {
    lessonId: 19,
    title: 'Тест: Сложные случаи пунктуации',
    description: 'Проверьте знание сложных правил пунктуации',
    passingScore: 70,
    questions: JSON.stringify([
      {
        id: 1,
        question: 'Где нужна запятая? "Несмотря на усталость [,] он продолжал работать."',
        options: ['Нужна запятая', 'Запятая не нужна', 'Нужна точка с запятой', 'Нужно двоеточие'],
        correct: 0,
        explanation: 'Деепричастный оборот отделяется запятой от остальной части предложения.',
      },
    ]),
  },
];

async function seedTests() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'russia_language',
  });

  try {
    for (const test of testsData) {
      await connection.execute(
        'INSERT INTO tests (lessonId, title, description, questions, passingScore) VALUES (?, ?, ?, ?, ?)',
        [test.lessonId, test.title, test.description, test.questions, test.passingScore]
      );
    }
    console.log('✅ Tests seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding tests:', error);
  } finally {
    await connection.end();
  }
}

seedTests();
