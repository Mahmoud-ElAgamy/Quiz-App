const question = document.querySelector(".question");

const choices = Array.from(
  document.querySelectorAll(".choice-container .choice-txt")
);

const questionsCountElement = document.querySelector(".info .questions-count");

const bulletsContainer = document.querySelector(".quiz .bullets");

const gameContainer = document.querySelector(".quiz");

const loader = document.getElementById("loader");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let maxQuestions = 0;
let questions = [];

const getJsonQuestions = async () => {
  const response = await fetch("js/questions.json");
  const jsonQuestions = await response.json();
  questions = jsonQuestions;
  gameContainer?.classList.remove("hidden");
  loader?.classList.add("hidden");
  startQuiz();
};

getJsonQuestions();

//Constants
const correctBonus = 10;
const finalTestScore = 10 * 10;

const startQuiz = () => {
  questionCounter = 0;
  score = 0;
  maxQuestions = questions.length;
  availableQuestions = [...questions];
  for (let i = 0; i < availableQuestions.length; i++) {
    const bullet = document.createElement("span");
    bulletsContainer?.appendChild(bullet);
  }

  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("recent-score", score);
    return location.assign("result.html");
  }
  questionCounter++;
  handleBullets();

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion[`choice` + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedAnswer = e.target.dataset.number;
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    choice.classList.add(classToApply);

    if (classToApply === "correct") {
      increaseScore(correctBonus);
    }

    setTimeout(() => {
      choice.classList.remove(classToApply);
      getNewQuestion();
      handleBullets();
    }, 1000);
  });
});

function increaseScore(num) {
  score += num;
}

const handleBullets = () => {
  const bulletsSpans = document.querySelectorAll(".quiz .bullets span");
  bulletsSpans.forEach((span, index) => {
    if (index + 2 === questionCounter) {
      span.classList.remove("current");
      span.classList.add("previous");
    } else if (index + 1 === questionCounter) {
      span.classList.add("current");
    }
  });
};
