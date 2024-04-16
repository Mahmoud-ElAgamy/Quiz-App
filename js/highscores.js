const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

const tableBody = document.querySelector("table tbody");

const finalTestScore = 10 * 10;

tableBody.innerHTML = highScores
  ?.map((highScore) => {
    return `<tr>
    <td>${highScore.name}</td>
    <td>${highScore.score}</td>
    <td>${finalTestScore}</td>
    </tr>`;
  })
  .join("");
