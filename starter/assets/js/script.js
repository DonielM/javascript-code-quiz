//Getting all the html elements that ill be using in javascript
let startBttn = document.getElementById("start");
let timerDisplay = document.getElementById("time");
let questionTitle = document.getElementById("question-title");
let answerChoices = document.getElementById("choices");
let initialsInput = document.getElementById("initials");
let submitBttn = document.getElementById("submit");
let finalScore = document.getElementById("final-score");

let feedbackMessage = document.getElementById("feedback");
let startScreen = document.getElementById("start-screen");
let endScreen = document.getElementById("end-screen");
let quizQuestions = document.getElementById("questions");

let currentQuizQuestion = 0;
let timeLeft = 120;
let score = 0;
let timerInterval;

let audioCorrect = new Audio("starter/assets/sfx/correct.wav");
let audioIncorrect = new Audio("starter/assets/sfx/incorrect.wav");

//Starts the quiz and displays the first question
function startQuiz() {
  startScreen.classList.add("hide");
  quizQuestions.classList.remove("hide");
  timerInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      timerDisplay.textContent = 0;
      endQuiz();
    }
  }, 1000);
  displayQuestion(questions[currentQuizQuestion]);
}

//Displays the current question and choices
function displayQuestion(question) {
  questionTitle.textContent = question.question;
  answerChoices.innerHTML = "";

  for (let i = 0; i < question.choices.length; i++) {
    let choice = question.choices[i];
    let button = document.createElement("button");
    button.textContent = choice;
    button.setAttribute("data-index", i);
    button.onclick = checkAnswer;
    answerChoices.appendChild(button);
  }
}

//Displays feedback message for answers depnding on if they were correct or not
function showFeedback(message) {
  feedbackMessage.textContent = message;
  feedbackMessage.setAttribute("class", `feedback`);
  setTimeout(function () {
    feedbackMessage.setAttribute("class", "feedback hide");
  }, 1000);
}

//Checks if the answer is correct or not
//If the answer is correct, add 10 points to the score, if not minus 10 secs from the timer
function checkAnswer(e) {
  let i = e.target.getAttribute("data-index");
  let question = questions[currentQuizQuestion];
  if (question.choices[i] === question.choices[question.answer]) {
    audioCorrect.play();
    showFeedback("Correct!");
    score += 10;
  } else {
    audioIncorrect.play();
    showFeedback("Incorrect!");
    timeLeft -= 10;
  }

  //Go to the next question, ff there are more questions, show the next one if not end the quiz
  currentQuizQuestion++;
  if (currentQuizQuestion < questions.length) {
    displayQuestion(questions[currentQuizQuestion]);
  } else {
    endQuiz();
  }
}

// End the quiz and display the final score
function endQuiz() {
  clearInterval(timerInterval);
  quizQuestions.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = score;
}

//Saves the score to the local storage and moves it to the high scores page
// Deletes the last high scores if there are more than 10 high scores in local storage to stop excess memmory usage.
function saveScore() {
  const initials = initialsInput.value;
  if (initials === "") {
    alert("Please enter your initials.");
    return;
  }
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const newScore = {
    initials: initials,
    score: score,
  };
  highScores.push(newScore);
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  if (highScores.length > 10) {
    highScores.pop();
  }
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscores.html";
}

// Event listeners to start button
startBttn.addEventListener("click", startQuiz);
submitBttn.addEventListener("click", saveScore);
