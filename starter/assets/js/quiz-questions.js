//Array of questions with answers
const questions = [
  {
    question: "Choose the correct HTML element for the largest heading?",
    choices: ["<h1>", "<h6>", "<heading>", "<head>"],
    answer: 0,
  },
  {
    question: "How do you create a function in JavaScript?.",
    choices: [
      "function:myFunction()",
      "function myFunction()",
      "function = myFunction()",
    ],
    answer: 1,
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i == 5)"],
    answer: 3,
  },
  {
    question:
      "Strings must be enclosed within ____ when being assigned to variables.",
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
    choices: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "/* This is a comment */",
    ],
    answer: 1,
  },
  {
    question:
      "How do you make each word in a text start with a capital letter?",
    choices: [
      "transform:capitalize",
      "You cant do that with CSS",
      "text-transfrom:capitalize",
      "text-style:capitalize",
    ],
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
