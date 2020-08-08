let $score = document.querySelector("#score");
let $timer = document.querySelector("#timer");

let $questionHere = document.querySelector("#questionHere");
let $choicesHere = document.querySelector("#choicesHere");

let $tryAgain = document.querySelector("#tryAgain");
let $startQuiz = document.querySelector("#startQuiz");

let score = 0;
let timeLeft = 180;
let thisQuestion = 0;



// start button to begin program
$startQuiz.addEventListener("click", function () {
  let gameClock = setInterval(countdown, 1000);
  $questionHere.textContent = "";
  $startQuiz.style.display = "none";

  countdown();
  showQuestion();
});

function countdown() {
  $timer.textContent = timeLeft + " seconds left";
  timeLeft--;
  if (timeLeft === 0) {
    clearInterval(gameClock);
  }
}

function showQuestion() {
  $choicesHere.innerHTML = "";
  let questionContent = questions[thisQuestion].question;
  $questionHere.textContent = questionContent;
  let choicesArray = questions[thisQuestion].choices;
  var correctAnswer = questions[thisQuestion].answer;
  console.log(correctAnswer);

  for (var i = 0; i < choicesArray.length; i++) {
    var $li = document.createElement("li");
    $li.textContent = choicesArray[i];

    $li.addEventListener("click", function (event) {
      var userChoice = event.target;
      var userAnswer = userChoice.textContent;
      checkAnswer(userAnswer, correctAnswer);
    });
    $choicesHere.appendChild($li);
  }
}

function checkAnswer(user, answer) {
  if (user == answer) {
    score++;
    $score.textContent = "score: " + score + "/10";
  } else {
    timeLeft -= 10;
  }
  thisQuestion++;
  console.log(thisQuestion);
if (timeLeft > 0 && timeLeft <11) {
    showQuestion();
}
  if (timeLeft > 0 && thisQuestion == 10) {
    $questionHere.textContent = "";
    $choicesHere.innerHTML = "";
    $questionHere.textContent =
      "You've completed the quiz! Your final score is " + score + "/10.";
    var btn = document.createElement("button");
    btn.textContent = "Try again?";
    $tryAgain.append(btn);
    btn.addEventListener("click", function (event) {
      let gameClock = setInterval(countdown, 1000);
      $questionHere.textContent = "";
      $tryAgain.style.display = "none";
    });
  }

  if (timeLeft == 0 && thisQuestion < 10) {
    $questionHere.textContent = "";
    $choicesHere.innerHTML = "";
    $questionHere.textContent = "You did not complete this quiz.";
    var btn = document.createElement("button");
    btn.textContent = "Try again?";
    $tryAgain.append(btn);
    btn.addEventListener("click", function (event) {
      let gameClock = setInterval(countdown, 1000);
      $questionHere.textContent = "";
      $tryAgain.style.display = "none";
    });
  }
}

// when game is over, stores high scores initials: score


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
    answer: "concat",
  },
];