//Need to make one big array opr mabye a collection of arrays for each choice for each questions.
//Then ill need to randomize the questions  with a for loop.
//Since the number of question is undeclared ill make 8 questions.


// Also need to create the highscores from the the score of the past 8 questions and have a ranking system

// need to use get element to use the html elemnts in js
// Then ill need functions for the questions with iff state ments to check if the answer is right

//Array of questions with answers 
const questions = [
  {
      question: "Choose the correct HTML element for the largest heading?",
      choices: ["<h1>", "<h6>", "<heading>", "<head>"],
      answer: 0,
  },
  {
      question: "How can you open a link in a new tab/browser window?",
      choices: ["<a href="url"new>", "<a href="url" target="new">", "<a href="url" target="_blank">"],
      answer: 2,
  },
  {
      question: "How do you create a function in JavaScript?.",
      choices: ["function:myFunction()", "function myFunction()","function = myFunction()"],
      answer: 1,
  },
  {
      question: "How to write an IF statement in JavaScript?",
      choices: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i == 5)"],
      answer: 3,
  },
  {
      question: "Strings must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "speech marks", "parentheses"],
      answer: 2,
  },
  {
      question: "How does a WHILE loop start?",
      choices: ["while i = 1 to 10", "while (i <= 10)", "while (i <= 10; i++)"],
      answer: 1,
  },
  {
      question: "How can you add a comment in a JavaScript?",
      choices: ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */"],
      answer: 1,
  },
  {
      question: "How do you make each word in a text start with a capital letter?",
      choices: ["transform:capitalize", "You cant do that with CSS", "text-transfrom:capitalize", "text-style:capitalize"],
      answer: 2,
  },
];
// For loop to shufle the array of questions
for (let i = 0; i < questions.length; i++) {
    let j = Math.floor(Math.random() * questions.length);
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
}

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


let audioCorrect = new Audio("assets/sfx/correct.wav");
let audioIncorrect = new Audio("assets/sfx/incorrect.wav");

//Starts the quiz and displays the first question 
function startQuiz() {
    startScreen.classList.add('hide');
    quizQuestions.classList.remove('hide');
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
    answerChoices.innerHTML = '';

    for (let i = 0; i < question.choices.length; i++) {
        let choice = question.choices[i];
        let button = document.createElement('button');
        button.textContent = choice;
        button.setAttribute('data-index', i);
        button.onclick = checkAnswer;
        answerChoices.appendChild(button);
    }
}

//Displays feedback message for answers depnding on if they were correct or not
function showFeedback(message) {
    feedbackMessage.textContent = message;
    feedbackMessage.setAttribute('class', `feedback`);
    setTimeout(function () {
        feedbackMessage.setAttribute('class', 'feedback hide');
    }, 1000);
}

//Checks if the answer is correct or not
//If the answer is correct, add 10 points to the score, if not minus 10 secs from the timer
function checkAnswer(e) {
    let i = e.target.getAttribute('data-index');
    let question = questions[currentQuizQuestion];    
    if (question.choices[i] === question.choices[question.answer]) {
        audioCorrect.play();
        showFeedback('Correct!');       
        score += 10;        
    } else {
        audioIncorrect.play();
        showFeedback('Incorrect!');        
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
    quizQuestions.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = score;
}

// Event listeners to start button
startbttn.addEventListener('click', startQuiz);