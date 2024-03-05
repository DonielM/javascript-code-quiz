
//Displays the last 10 highscores in order after initials are entered and quiz is over
function displayHighScores() {
    const highscores = JSON.parse(localStorage.getItem("highScores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    const scoreStorage = document.getElementById("highscores");
    scoreStorage.innerHTML = '';

    highscores.forEach(function(score, index) {
        const liTag = document.createElement("li");
        liTag.textContent = `${score.initials} - ${score.score}`;
        scoreStorage.appendChild(liTag);
    });
}

//Clears highscores giving you the option to save memory or if you just want the option to remove scores.
function clearScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
}

//Disaplay highscores when the page loads up to a limit of 10 scores shown
window.addEventListener("load", displayHighScores);
document.getElementById("clear").addEventListener("click", clearScores);