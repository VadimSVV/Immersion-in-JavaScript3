// All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// All our options
// console.log(optionElements);
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //question

const NumberOfQuestion = document.getElementById('number-of-question'), // number Of question
    NumberOfAllQuestions = document.getElementById('number-of-all-questions'); // number of all questions

let indexOfQuestion, // current question index
    indexOfPage = 0; // page index

const answersTracker = document.getElementById('answers-tracker'); // tracker wrapper

const btnNext = document.getElementById('btn-next'); // button next

let score = 0; // final result

const correctAnswer = document.getElementById('correct-answer'), // number of correct answers
    NumberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // number of correct answers (in the modal window)
    btnTryAgain = document.getElementById('btn-try-again'); // start again button

const questions = [
    {
        question: 'Как в JavaScript вычислить процент от числа ?',
        option: [
            'Так в JavaScript нельзя сделать',
            'Оператор : %',
            'Умножить на кол-во процентов и разделить на 100',
            'Вызвать метод FindPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения: "13" + 7',
        option: [
            '20',
            '137',
            'undefined',
            'error',
        ],
        rightAnswer: 1
    },
    {
        question: 'На JavaScript нельзя писать',
        option: [
            'Игры',
            'Скрипты для сайтов',
            'Десктопные приложения',
            'Плохо',
        ],
        rightAnswer: 3
    },
];

NumberOfAllQuestions.innerHTML = questions.length; // output the number of questions

const load = () => {
    question.innerHTML = questions[0].question; // question
}

window.addEventListener('load', () => {
    load();
})