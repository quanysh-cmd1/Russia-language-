
import { GameType, Difficulty, Question } from '../types';

export const questions: Question[] = [
  // EASY: Multiple Choice (Identify Participle vs Gerund)
  {
    id: 1,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.EASY,
    question: "Определите часть речи: 'Читающий'",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Причастие",
    explanation: "Причастие отвечает на вопрос 'какой?' и обозначает признак предмета по действию.",
    lessonId: "prichastie-basics"
  },
  {
    id: 2,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.EASY,
    question: "Определите часть речи: 'Прочитав'",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Деепричастие",
    explanation: "Деепричастие отвечает на вопросы 'что сделав?', 'как?' и обозначает добавочное действие.",
    lessonId: "deeprichastie-basics"
  },
  {
    id: 3,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.EASY,
    question: "Определите часть речи: 'Смеющийся'",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Причастие",
    explanation: "Суффикс -ющ- указывает на действительное причастие настоящего времени."
  },
  {
    id: 4,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.EASY,
    question: "Определите часть речи: 'Улыбаясь'",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Деепричастие",
    explanation: "Суффикс -я- указывает на деепричастие несовершенного вида."
  },
  {
    id: 5,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.EASY,
    question: "Определите часть речи: 'Увиденный'",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Причастие",
    explanation: "Это страдательное причастие прошедшего времени с суффиксом -нн-."
  },
  {
    id: 31,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.EASY,
    question: "Определите часть речи: 'Сделанный'",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Причастие",
    explanation: "Отвечает на вопрос 'какой?' и имеет суффикс -нн-."
  },
  {
    id: 32,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.EASY,
    question: "Определите часть речи: 'Прыгая'",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Деепричастие",
    explanation: "Обозначает добавочное действие, отвечает на вопрос 'что делая?'."
  },

  // MEDIUM: True / False (Punctuation)
  {
    id: 6,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.MEDIUM,
    question: "Нужна ли запятая в предложении: 'Он шел (,) не оглядываясь'?",
    correctAnswer: true,
    explanation: "Одиночные деепричастия, сохраняющие значение глагольности, обычно обособляются."
  },
  {
    id: 7,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.MEDIUM,
    question: "Нужна ли запятая в предложении: 'Листья (,) падающие с деревьев (,) устилали тропинку'?",
    correctAnswer: true,
    explanation: "Причастный оборот стоит после определяемого слова 'листья', поэтому обособляется с двух сторон."
  },
  {
    id: 8,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.MEDIUM,
    question: "Нужна ли запятая: 'Падающие с деревьев (,) листья устилали тропинку'?",
    correctAnswer: false,
    explanation: "Причастный оборот стоит ПЕРЕД определяемым словом и не имеет добавочного значения, поэтому запятая не нужна."
  },
  {
    id: 9,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.MEDIUM,
    question: "Нужна ли запятая: 'Мальчик бежал (,) сломя голову'?",
    correctAnswer: false,
    explanation: "Фразеологизмы с деепричастиями (сломя голову, затаив дыхание) не обособляются."
  },
  {
    id: 10,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.MEDIUM,
    question: "Нужна ли запятая: 'Отражаясь в воде (,) звезды казались ближе'?",
    correctAnswer: true,
    explanation: "Деепричастный оборот всегда обособляется, независимо от места в предложении."
  },
  {
    id: 33,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.MEDIUM,
    question: "Нужна ли запятая: 'Он работал (,) спустя рукава'?",
    correctAnswer: false,
    explanation: "Фразеологизм 'спустя рукава' не обособляется."
  },
  {
    id: 34,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.MEDIUM,
    question: "Нужна ли запятая: 'Солнце (,) вышедшее из-за туч (,) осветило поляну'?",
    correctAnswer: true,
    explanation: "Причастный оборот стоит после определяемого слова."
  },

  // MEDIUM: Drag & Drop / Suffix Completion
  {
    id: 11,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Вставьте правильный суффикс: Стро...щий дом рабочий.",
    options: ["ящ", "ущ"],
    correctAnswer: "ящ",
    explanation: "Глагол 'строить' — II спряжения, поэтому причастие имеет суффикс -ящ-."
  },
  {
    id: 12,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Вставьте суффикс: Бор...щийся за свободу народ.",
    options: ["ющ", "ящ"],
    correctAnswer: "ющ",
    explanation: "Глагол 'бороться' — I спряжения, поэтому суффикс -ющ-."
  },
  {
    id: 13,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Выберите форму: Сдела... работу, он ушел.",
    options: ["в", "вши"],
    correctAnswer: "в",
    explanation: "Наиболее употребительная форма деепричастия прошедшего времени."
  },
  {
    id: 14,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Вставьте суффикс: Завис...мый от погоды результат.",
    options: ["имы", "емы"],
    correctAnswer: "имы",
    explanation: "Глагол 'зависеть' — исключение II спряжения."
  },
  {
    id: 15,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Вставьте: Чита... книгу, я делал заметки.",
    options: ["я", "в"],
    correctAnswer: "я",
    explanation: "Для несовершенного вида (что делая?) используем суффикс -я-."
  },
  {
    id: 35,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Вставьте суффикс: Слыш...мый издалека звук.",
    options: ["имый", "емый"],
    correctAnswer: "имый",
    explanation: "Слышать — глагол-исключение II спряжения."
  },
  {
    id: 36,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Вставьте суффикс: Кол...щий дрова старик.",
    options: ["ющ", "ящ"],
    correctAnswer: "ющ",
    explanation: "Колоть — I спряжение."
  },

  // CHALLENGING: Error Detection
  {
    id: 16,
    type: GameType.ERROR_DETECTION,
    difficulty: Difficulty.CHALLENGING,
    question: "Найдите ошибку: 'Подходя к дому, у меня слетела шляпа.'",
    options: ["Правильно", "Ошибка в деепричастии"],
    correctAnswer: "Ошибка в деепричастии",
    explanation: "Действие деепричастия и сказуемого должно относиться к одному подлежащему. Здесь 'шляпа' не может подходить к дому."
  },
  {
    id: 17,
    type: GameType.ERROR_DETECTION,
    difficulty: Difficulty.CHALLENGING,
    question: "Найдите ошибку: 'Прочитанная книга мальчиком была интересной.'",
    options: ["Правильно", "Ошибка в причастном обороте"],
    correctAnswer: "Ошибка в причастном обороте",
    explanation: "Определяемое слово 'книга' не должно находиться внутри причастного оборота. Верно: 'Прочитанная мальчиком книга'."
  },
  {
    id: 18,
    type: GameType.ERROR_DETECTION,
    difficulty: Difficulty.CHALLENGING,
    question: "Найдите ошибку: 'Рисуя картину, художник использовал уголь.'",
    options: ["Правильно", "Ошибка"],
    correctAnswer: "Правильно",
    explanation: "Художник — и подлежащее, и исполнитель добавочного действия (рисуя)."
  },
  {
    id: 19,
    type: GameType.ERROR_DETECTION,
    difficulty: Difficulty.CHALLENGING,
    question: "Найдите ошибку: 'Оглянувшись назад, путь казался долгим.'",
    options: ["Правильно", "Ошибка в деепричастии"],
    correctAnswer: "Ошибка в деепричастии",
    explanation: "Путь не может оглядываться. Ошибка в употреблении деепричастного оборота."
  },
  {
    id: 20,
    type: GameType.ERROR_DETECTION,
    difficulty: Difficulty.CHALLENGING,
    question: "Найдите ошибку: 'Засеянные поля пшеницей дали хороший урожай.'",
    options: ["Правильно", "Ошибка в обороте"],
    correctAnswer: "Ошибка в обороте",
    explanation: "Снова определяемое слово 'поля' внутри оборота. Правильно: 'Засеянные пшеницей поля'."
  },
  {
    id: 37,
    type: GameType.ERROR_DETECTION,
    difficulty: Difficulty.CHALLENGING,
    question: "Найдите ошибку: 'Улыбаясь, лицо ребенка светилось радостью.'",
    options: ["Правильно", "Ошибка в деепричастии"],
    correctAnswer: "Ошибка в деепричастии",
    explanation: "Лицо не может улыбаться само по себе как субъект действия."
  },

  // CHALLENGING: Sentence Comparison
  {
    id: 21,
    type: GameType.SENTENCE_COMPARISON,
    difficulty: Difficulty.CHALLENGING,
    question: "Выберите ГРАММАТИЧЕСКИ ПРАВИЛЬНЫЙ вариант:",
    options: [
      "Закончив работу, мы пошли домой.",
      "Закончив работу, начался дождь."
    ],
    correctAnswer: 0,
    explanation: "В первом варианте 'мы' совершают оба действия. Во втором — 'дождь' не может закончить работу."
  },
  {
    id: 22,
    type: GameType.SENTENCE_COMPARISON,
    difficulty: Difficulty.CHALLENGING,
    question: "Выберите правильное предложение:",
    options: [
      "Охотник, увидевший зверя, затаился.",
      "Охотник увидевший зверя затаился."
    ],
    correctAnswer: 0,
    explanation: "Причастный оборот после определяемого слова должен выделяться запятыми."
  },
  {
    id: 23,
    type: GameType.SENTENCE_COMPARISON,
    difficulty: Difficulty.CHALLENGING,
    question: "Выберите правильное предложение:",
    options: [
      "Подъезжая к станции, я потерял билет.",
      "Подъезжая к станции, с меня слетела кепка."
    ],
    correctAnswer: 0,
    explanation: "Подлежащее 'я' выполняет и основное действие, и добавочное."
  },
  {
    id: 24,
    type: GameType.SENTENCE_COMPARISON,
    difficulty: Difficulty.CHALLENGING,
    question: "Где верно расставлены знаки препинания?",
    options: [
      "Он шел, не смотря по сторонам.",
      "Он шел не смотря, по сторонам."
    ],
    correctAnswer: 0,
    explanation: "Запятая отделяет деепричастный оборот от сказуемого."
  },
  {
    id: 25,
    type: GameType.SENTENCE_COMPARISON,
    difficulty: Difficulty.CHALLENGING,
    question: "Выберите верный вариант:",
    options: [
      "Сделанное задание учителем было проверено.",
      "Задание, сделанное учеником, было проверено."
    ],
    correctAnswer: 1,
    explanation: "Второй вариант стилистически и грамматически верный."
  },
  {
    id: 38,
    type: GameType.SENTENCE_COMPARISON,
    difficulty: Difficulty.CHALLENGING,
    question: "Выберите верный вариант:",
    options: [
      "Вернувшись домой, мне стало грустно.",
      "Когда я вернулся домой, мне стало грустно."
    ],
    correctAnswer: 1,
    explanation: "В безличном предложении деепричастный оборот употреблять нельзя."
  },

  // NEW QUESTIONS FOR VARIETY
  {
    id: 39,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.MEDIUM,
    question: "Какое слово является причастием?",
    options: ["Красивый", "Красиво", "Украшенный", "Украшая"],
    correctAnswer: "Украшенный",
    explanation: "Украшенный — признак по действию (украсить)."
  },
  {
    id: 40,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.CHALLENGING,
    question: "Верно ли, что деепричастие не изменяется?",
    correctAnswer: true,
    explanation: "Да, деепричастие — неизменяемая часть речи."
  },
  {
    id: 41,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.CHALLENGING,
    question: "Вставьте Н или НН: Жаре...ый в масле картофель.",
    options: ["нн", "н"],
    correctAnswer: "нн",
    explanation: "Есть зависимое слово 'в масле', поэтому пишется НН."
  },
  {
    id: 42,
    type: GameType.MULTIPLE_CHOICE,
    difficulty: Difficulty.MEDIUM,
    question: "Выберите деепричастие совершенного вида:",
    options: ["Читая", "Прочитав", "Читающий", "Прочитанный"],
    correctAnswer: "Прочитав",
    explanation: "Отвечает на вопрос 'что сделав?'."
  },
  {
    id: 43,
    type: GameType.TRUE_FALSE,
    difficulty: Difficulty.EASY,
    question: "Причастие имеет краткую форму?",
    correctAnswer: true,
    explanation: "Страдательные причастия могут иметь краткую форму (сделан, открыт)."
  },
  {
    id: 44,
    type: GameType.DRAG_DROP,
    difficulty: Difficulty.MEDIUM,
    question: "Вставьте суффикс: Слыш...щий шорох.",
    options: ["ащ", "ущ"],
    correctAnswer: "ащ",
    explanation: "Слышать — II спряжение."
  },
  {
    id: 45,
    type: GameType.ERROR_DETECTION,
    difficulty: Difficulty.MEDIUM,
    question: "Есть ли ошибка? 'Мама, готовя обед, пела песню.'",
    options: ["Нет ошибки", "Ошибка"],
    correctAnswer: "Нет ошибки",
    explanation: "Все верно: мама готовит и мама поет."
  },
  // SORTING
  {
    id: 46,
    type: GameType.SORTING,
    difficulty: Difficulty.MEDIUM,
    question: "Распределите слова: Читающий, Смеясь, Бегущий, Улыбнувшись",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Читающий,Бегущий|Смеясь,Улыбнувшись",
    explanation: "Причастия: Читающий, Бегущий. Деепричастия: Смеясь, Улыбнувшись."
  },
  {
    id: 47,
    type: GameType.SORTING,
    difficulty: Difficulty.CHALLENGING,
    question: "Распределите: Сделанный, Сделав, Видимый, Видя",
    options: ["Причастие", "Деепричастие"],
    correctAnswer: "Сделанный,Видимый|Сделав,Видя",
    explanation: "Причастия: Сделанный, Видимый. Деепричастия: Сделав, Видя."
  },
  // WORD CONSTRUCTOR
  {
    id: 48,
    type: GameType.WORD_CONSTRUCTOR,
    difficulty: Difficulty.MEDIUM,
    question: "Соберите причастие: ЧИТА + ЮЩ + ИЙ",
    options: ["ЧИТА", "ЮЩ", "ИЙ"],
    correctAnswer: "ЧИТАЮЩИЙ",
    explanation: "Корень ЧИТА-, суффикс -ЮЩ-, окончание -ИЙ."
  },
  {
    id: 49,
    type: GameType.WORD_CONSTRUCTOR,
    difficulty: Difficulty.CHALLENGING,
    question: "Соберите деепричастие: ПРО + ЧИТА + В",
    options: ["ПРО", "ЧИТА", "В"],
    correctAnswer: "ПРОЧИТАВ",
    explanation: "Приставка ПРО-, корень ЧИТА-, суффикс -В."
  }
];
