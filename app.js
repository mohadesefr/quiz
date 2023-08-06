const questions = [
    {
        question: 'Which is largest animal in the world?',
        answers: [
            { text: 'shark', correct: false },
            { text: 'blue whale', correct: true },
            { text: 'elephant', correct: false },
            { text: 'giraffe', correct: false },
        ]
    },
    {
        question: 'How many wisdom teeth does the average adult have?',
        answers: [
            { text: 'four', correct: true },
            { text: 'one', correct: false },
            { text: 'three', correct: false },
            { text: 'six', correct: false },
        ]
    },
    {
        question: ' How many oceans are there on Earth?',
        answers: [
            { text: 'four', correct: false },
            { text: 'five', correct: true },
            { text: 'three', correct: false },
            { text: 'six', correct: false },
        ]
    },
    {
        question: 'In what country could you find the Leaning Tower of Pisa?',
        answers: [
            { text: 'italy', correct: true },
            { text: 'france', correct: false },
            { text: 'germany', correct: false },
            { text: 'Netherland', correct: false },
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'next';
    showQuestion();
}

// showing questions and remove the previous question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {

        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

}


// i can not understand these line of codes!!!!
// rest the question
function resetState() {

    nextButton.style.display = 'none';

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


// style of correct and incorrect question
function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectBtn.classList.add('correct');
        score++;
    } else {
        selectBtn.classList.add('incorrect');

    };

    // when you click wrong question show the correct one
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} uut of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};


nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});



startQuiz();