const userInput = document.querySelector("form input");

const saveBtn = document.querySelector("form button");

const finalScoreElement = document.querySelector(".result .final-score");

const getRecentScore = localStorage.getItem("recent-score");

const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

const msgElement = document.querySelector(".msg");

const maxSavedHighScores = 5;

const finalTestScore = 10 * 10;

userInput.addEventListener("keyup", () => {
  saveBtn.disabled = !userInput.value;
});

if (getRecentScore < finalTestScore / 2) {
  finalScoreElement.innerHTML = ` <span class="bad">سئ</span> لقد حصلت علي ${finalTestScore}/${getRecentScore} !`;
} else if (getRecentScore == finalTestScore / 2) {
  finalScoreElement.innerHTML = ` <span class="fair">مقبول</span> لقد حصلت علي ${finalTestScore}/${getRecentScore} !`;
} else if (
  getRecentScore > finalTestScore / 2 &&
  getRecentScore < finalTestScore
) {
  finalScoreElement.innerHTML = ` <span class="good">جيد</span> لقد حصلت علي ${finalTestScore}/${getRecentScore} !`;
} else {
  finalScoreElement.innerHTML = ` <span class="perfect">احسنت</span> لقد حصلت علي ${finalTestScore}/${getRecentScore} !`;
}

saveBtn.onclick = (e) => {
  e.preventDefault();
  const score = {
    score: getRecentScore,
    name: userInput.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(maxSavedHighScores);
  localStorage.setItem("highscores", JSON.stringify(highScores));
  msgElement.classList.add("show");
  setTimeout(() => {
    location.assign("index.html");
  }, 1000);
};
