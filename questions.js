let $score = document.querySelector("#score");
let $timer = document.querySelector("#timer");
let $questionHere = document.querySelector("#questionHere");
let $choicesHere = document.querySelector("#choicesHere");
let $btn = document.querySelector("button");
let $winnersList = document.querySelector(".winners-list");
let $tryAgain = document.querySelector("#tryAgain");
let $startQuiz = document.querySelector("#startQuiz");
let score = 0;
let timeLeft = 5;
let randomQuestion;
let thisQuestion = 0;
let winners = [];

$startQuiz.addEventListener("click", startGame);

function reset() {
  timeLeft = 120;
  thisQuestion = 0;
  score = 0;
  $tryAgain.innerHTML = "";
  $btn.style.display = "none";
  $questionHere.textContent = "";
}

function setTime() {
  var gameClock = setInterval(function () {
    timeLeft--;
    $timer.textContent = timeLeft + " seconds left";

    if (timeLeft === 0) {
      clearInterval(gameClock);
      $timer.textContent = "";
      $score.textContent = "";
    }
  }, 1000);
}

function startGame() {
  reset();
  setTime();

  randomQuestion = questions.sort(() => Math.random() - 0.5);

  goToNext();
}

function goToNext() {
  $choicesHere.innerHTML = "";
  showQuestion(randomQuestion[thisQuestion]);
}

function showQuestion(question) {
  $questionHere.textContent = questions[thisQuestion].question;
  $score.textContent = "score: " + score + "/10";
  let choicesArray = questions[thisQuestion].choices;
  var correctAnswer = questions[thisQuestion].answer;
  console.log(correctAnswer);

  for (var i = 0; i < choicesArray.length; i++) {
    var $li = document.createElement("li");
    $li.textContent = choicesArray[i];
    $li.addEventListener("click", checkAnswer);
    $choicesHere.appendChild($li);
  }
}

function checkAnswer() {
  var userChoice = event.target;
  var userAnswer = userChoice.textContent;
  var correctAnswer = questions[thisQuestion].answer;
  thisQuestion++;

  if (userAnswer == correctAnswer) {
    score++;
    console.log("flame-yo hotman");
  } else {
    timeLeft -= 10;
    console.log("dishonor on your whole family");
  }
  if (randomQuestion.length > thisQuestion && timeLeft > 0) {
    goToNext();
    console.log(thisQuestion);
  } else if (randomQuestion.length > thisQuestion && timeLeft === 0) {
    $questionHere.textContent = "";
    $choicesHere.innerHTML = "";
    $questionHere.textContent = "You did not complete this quiz.";
    var btn = document.createElement("button");
    btn.textContent = "Try again?";
    $tryAgain.append(btn);
    btn.addEventListener("click", startGame);
  } else if ((thisQuestion = 9 && timeLeft > 0)) {
    $timer.textContent = "";
    $score.textContent = "";
    $questionHere.textContent = "";
    $choicesHere.innerHTML = "";
    $questionHere.textContent =
      "You've completed the quiz! Your final score is " + score + "/10.";
    var btn = document.createElement("button");
    btn.textContent = "Try again?";
    $tryAgain.append(btn);
    btn.addEventListener("click", startGame);
    highScores();
  }
}

function highScores() {
  $winnersList.textContent = "Add your score to the winner's list!";
  var $yourNameHere = document.createElement("input");
  $yourNameHere.placeholder = "Your initials here";

  $yourNameHere.addEventListener("submit", function () {
    event.preventDefault();

    let userInput = $winnersList.nodeValue.trim();
    if ($winnersList.length === 0) {
      return;
    }
    userInput.push(winners);
    $yourNameHere.value = "";
    document.createElement("p");
  });
}

let questions = [
  {
    question:
      "What method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string?",
    choices: [".split()", ".join()", ".reduce()", ".forEach()"],
    answer: ".join()",
  },

  {
    question:
      "What property of the Node interface represents the text content of the node and its descendants?",
    choices: ["value", "display-mode", "textContent", "splitText"],
    answer: "textContent",
  },

  {
    question:
      "Which statement evaluates an expression, matching the expression's value to a case clause, and executes statements associated with that case, as well as statements in cases that follow the matching case?",
    choices: ["forEach", "if/else", "switch", "while"],
    answer: "switch",
  },

  {
    question:
      "Which variable declaration cannot be changed through reassignment nor redeclared?",
    choices: ["const", "var", "let"],
    answer: "const",
  },

  {
    question:
      "Which value represents the intentional absence of any object value?",
    choices: ["undefined", "null", "invalid", "NaN"],
    answer: "null",
  },

  {
    question: "What method outputs a message to the web console?",
    choices: ["return", "console.log()", "textContent", "displayMessage()"],
    answer: "console.log()",
  },

  {
    question:
      "What function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems?",
    choices: ["parseInt()", "value()", "isNaN()", "isInteger()"],
    answer: "parseInt()",
  },

  {
    question:
      "Which operator checks whether its two operands are equal AND attempts to convert and compare operands that are of different types?",
    choices: ["=>", "!==", "===", "=="],
    answer: "==",
  },

  {
    question:
      "Which statement creates a loop that executes a specified statement until the test condition evaluates to false?",
    choices: ["forEach", "if/else", "continue", "do-while"],
    answer: "do-while",
  },

  {
    question:
      "Which method is used to merge two or more arrays? This method does not change the existing arrays, but instead returns a new array.",
    choices: [".slice()", ".toString()", ".concat()", ".join()"],
    answer: ".concat()",
  },
];
