// //This function displays the last 10 highscores in order after initials are entered and quiz is over.
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.sort(function (a, b) {
      return b.score - a.score;
  });
  highScores.splice(10);
  const highScoreList = document.getElementById('highScores');
  highScoreList.innerHTML = highScores
      .map(function (score) {
          return `<li class="high-score">${score.initials} - ${score.score}</li>`;
      })
      .join('');
}

