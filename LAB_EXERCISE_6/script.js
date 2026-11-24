
// Questions Array
// Stores questions, options and correct answers.

const Questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Pacific Ocean",
            "Arctic Ocean"
        ],
        answer: "Pacific Ocean"
    },
    {
        question: "Which language is used to structure a web page?",
        options: ["CSS", "JavaScript", "Python", "HTML"],
        answer: "HTML"
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["Five", "Six", "Seven", "Eight"],
        answer: "Six"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: [
            "Oxygen",
            "Nitrogen",
            "Carbon dioxide",
            "Hydrogen"
        ],
        answer: "Carbon dioxide"
    }
];

const TIME_PER_QUESTION = 20;

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = TIME_PER_QUESTION;
let timerInterval = null;
let answerSubmitted = false;


// Get HTML elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");

const timerDisplay = document.getElementById("timer");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");


// 1. shuffleQuestions()
// Randomly shuffles the questions.

function shuffleQuestions() {

    const shuffled = [...Questions];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] =
        [shuffled[randomIndex], shuffled[i]];

    }

    return shuffled;
}


// 2. startTimer()
// Starts countdown timer for each question.

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = TIME_PER_QUESTION;

    updateTimerDisplay();

    timerInterval = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            if (!answerSubmitted) {
                checkAnswer(true);
            }

        }

    }, 1000);
}


function updateTimerDisplay() {

    timerDisplay.textContent = `${timeLeft}s`;

    timerDisplay.classList.toggle(
        "warning",
        timeLeft <= 5
    );
}


// 3. displayQuestion()
// Displays current question and answer options.

function displayQuestion() {

    answerSubmitted = false;

    const currentQuestion =
        quizQuestions[currentQuestionIndex];

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

    questionText.textContent = currentQuestion.question;

    progressBar.style.width =
        `${(currentQuestionIndex / quizQuestions.length) * 100}%`;

    answerOptions.innerHTML = "";

    feedback.textContent = "";
    feedback.className = "feedback";

    submitButton.classList.remove("hidden");
    submitButton.disabled = false;

    nextButton.classList.add("hidden");


    currentQuestion.options.forEach((option, index) => {

        const label = document.createElement("label");

        label.className = "option";

        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;
        radio.id = `option-${index}`;

        const optionText = document.createElement("span");

        optionText.textContent = option;

        label.append(radio, optionText);

        answerOptions.appendChild(label);

    });

    startTimer();
}


// 4. checkAnswer()
// Checks selected answer and updates score.

function checkAnswer(timeExpired = false) {

    if (answerSubmitted) return;

    const selectedOption =
        document.querySelector('input[name="answer"]:checked');

    if (!selectedOption && !timeExpired) {

        feedback.textContent =
            "Please select an answer first.";

        feedback.className =
            "feedback incorrect-text";

        return;
    }

    answerSubmitted = true;

    clearInterval(timerInterval);

    const currentQuestion =
        quizQuestions[currentQuestionIndex];

    const selectedAnswer =
        selectedOption ? selectedOption.value : null;

    const isCorrect =
        selectedAnswer === currentQuestion.answer;


    if (isCorrect) {

        score++;

        feedback.textContent =
            "Correct! Well done.";

        feedback.className =
            "feedback correct-text";

    } else if (timeExpired) {

        feedback.textContent =
            `Time is up! Correct answer: ${currentQuestion.answer}`;

        feedback.className =
            "feedback incorrect-text";

    } else {

        feedback.textContent =
            `Incorrect. The correct answer is: ${currentQuestion.answer}`;

        feedback.className =
            "feedback incorrect-text";

    }


    // Lock answer options and show correct answer.

    document.querySelectorAll('input[name="answer"]')
        .forEach((radio) => {

            radio.disabled = true;

            const optionLabel = radio.closest(".option");

            if (radio.value === currentQuestion.answer) {

                optionLabel.classList.add("correct");

            } else if (radio.checked && !isCorrect) {

                optionLabel.classList.add("incorrect");

            }

        });


    submitButton.classList.add("hidden");

    nextButton.textContent =
        currentQuestionIndex === quizQuestions.length - 1
            ? "View Results"
            : "Next Question";

    nextButton.classList.remove("hidden");

}


// 5. nextQuestion()
// Moves to next question and resets timer.

function nextQuestion() {

    if (!answerSubmitted) return;

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {

        displayQuestion();

    } else {

        showResults();

    }
}


// 6. startQuiz()
// Starts quiz, shuffles questions and displays first question.

function startQuiz() {

    clearInterval(timerInterval);

    quizQuestions = shuffleQuestions();

    currentQuestionIndex = 0;

    score = 0;

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    displayQuestion();

}


// Display final score.

function showResults() {

    clearInterval(timerInterval);

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    progressBar.style.width = "100%";

    finalScore.textContent =
        `${score} / ${quizQuestions.length}`;


    if (score === quizQuestions.length) {

        resultMessage.textContent =
            "Excellent! You answered every question correctly.";

    } else if (score >= Math.ceil(quizQuestions.length / 2)) {

        resultMessage.textContent =
            "Good effort! Keep practising to improve your score.";

    } else {

        resultMessage.textContent =
            "Keep learning and try the quiz again.";

    }

}


// 7. Button Event Listeners

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", () => {
    checkAnswer(false);
});

nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", startQuiz);
