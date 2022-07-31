// Все варианты ответов
const option1= document.querySelector('.option1'),
      option2= document.querySelector('.option2'),
      option3= document.querySelector('.option3'),
      option4= document.querySelector('.option4');

// Все наши ответы
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество всех вопросов

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // страница индекса

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество правильных ответов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка повторного запуска

const quizOverModal = document.querySelector('.quiz-over-modal');

const result = document.getElementById('result');

const questions = [
    {
        question: 'Что такое виртуальная DOM?',
        options: [
            'Точная HTML-копия реальной DOM',
            'Встроенный компонент браузера',
            'Объект JavaScript, содержащий элементы и данные',
            'Строка JSON, содержащая элементы и данные, возвращаемые из метода react.render',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое из перечисленных ниже слов не является зарезервированным словом в JavaScript?',
        options: [
            'undefined',
            'throw',
            'default',
            'finally',
        ],
        rightAnswer: 0
    },
    {
        question: 'К какому типу относится значение null?',
        options: [
            'К символьному',
            'К строковому',
            'К логическому',
            'Ни к одному из перечисленных',
        ],
        rightAnswer: 3
    }
];

numberOfAllQuestions.innerHTML = questions.length; // вывод количества вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки тех же вопросов

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if(item == randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }   
    }
    console.log(indexOfQuestion);
    completedAnswers.push(indexOfQuestion);  //добавляем элемент в массив
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};
// удаление всех классов со всех ответов
const enabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
        });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа.')
    } else {
        randomQuestion();
        enabledOptions();
    }

};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
};

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
};

const quizOver = () => {
    if(score == 0){
        result.innerHTML = 'Не получилось! Попробуй снова!'
    } else {
        result.innerHTML = 'Отличный результат!'
    }
    quizOverModal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload(); // перезагрузка
};

btnTryAgain.addEventListener('click', tryAgain);
btnNext.addEventListener('click', () => {
    validate();
});

//вызов функции, если страница прогрузилась
window.addEventListener('load', () => { 
    randomQuestion();
    answerTracker();
}); 



