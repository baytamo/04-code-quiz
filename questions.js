let $score = document.querySelector("#score");
let $timer = document.querySelector("#timer");
let $questionHere = document.querySelector("#questionHere");
let $choicesHere = document.querySelector("#choicesHere");
let $btn = document.querySelector("button");
let $winnersList = document.querySelector("#winners-list");
let $tryButton = document.querySelector("#tryButton");
let $startQuiz = document.querySelector("#startQuiz");
let score = 0;
let timeLeft = 120;
let randomQuestion;
let thisQuestion = 0;
let scoreList = [];
let gameClock;

// event listener for start quiz and try again buttons
$startQuiz.addEventListener("click", startGame);

// clear text and clock from previous game
function reset() {
  thisQuestion = 0;
  timeLeft = 120;
  score = 0;
  $tryButton.innerHTML = "";
  $winnersList.innerHTML = "";
  $btn.style.display = "none";
  $questionHere.textContent = "";
}

// set time interval
function setTime() {
  var gameClock = setInterval(function () {
    timeLeft--;
    $timer.textContent = timeLeft + " seconds left";

    if (
      timeLeft === 0 ||
      (randomQuestion.length === thisQuestion + 1 && timeLeft > 0)
    ) {
      clearInterval(gameClock);
      $timer.textContent = "";
      $score.textContent = "";
    }
  }, 1000);
}

// start game parameters: reset settings, begin clock, shuffle questions array, display first question
function startGame() {
  reset();
  setTime();

  randomQuestion = questions.sort(() => Math.random() - 0.5);

  goToNext();
}

// clears previous list of choices, shows next question
function goToNext() {
  $choicesHere.innerHTML = "";
  showQuestion(randomQuestion[thisQuestion]);
}

function showQuestion(question) {
  // choose question from shuffled array
  $questionHere.textContent = questions[thisQuestion].question;
  $score.textContent = "score: " + score + "/10";
  let choicesArray = questions[thisQuestion].choices;
  var correctAnswer = questions[thisQuestion].answer;

  // for loop to display each value in choices array, adds event listener for each index
  for (var i = 0; i < choicesArray.length; i++) {
    var $li = document.createElement("li");
    $li.textContent = choicesArray[i];
    $li.addEventListener("click", checkAnswer);
    $choicesHere.appendChild($li);
  }

  // if there are questions left when the timer reaches 0 or no correct answers, user will receive this notification
  if (
    (randomQuestion.length > thisQuestion + 1 && timeLeft === 0) ||
    (randomQuestion.length === thisQuestion + 1 && score === 0)
  ) {
    $choicesHere.innerHTML = "";
    $questionHere.textContent = "You did not complete this quiz.";

    // button created so that user may elect to take the quiz again
    var $btn = document.createElement("button");
    $btn.textContent = "Try again?";
    $btn.setAttribute("id", "again");
    $tryButton.appendChild($btn);
    $tryButton.addEventListener("click", startGame);
  }

  // if user has answered correctly with time left, they will receive this notification
  if (randomQuestion.length === thisQuestion + 1 && timeLeft > 0 && score > 0) {
    $choicesHere.innerHTML = "";
    $questionHere.textContent =
      "You've completed the quiz! Your final score is " + score + "/10.";

    // button created so that user may elect to take the quiz again
    var $btn = document.createElement("button");
    $btn.setAttribute("id", "again");
    $btn.textContent = "Try again?";
    $tryButton.appendChild($btn);
    document.getElementById("again").addEventListener("click", startGame);

    highScores();
  }
}

// event listener that takes different action depending on which index user selected
function checkAnswer() {
  var userChoice = event.target;
  var userAnswer = userChoice.textContent;
  var correctAnswer = questions[thisQuestion].answer;
  thisQuestion++;

  if (userAnswer == correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }
  if (randomQuestion.length > thisQuestion && timeLeft > 0) {
    goToNext();
  }
}

function highScores() {
  // label for form created
  var $label = document.createElement("label");
  $label.setAttribute("for", "again");
  $label.textContent = "Add yourself to the list of high scores";
  $winnersList.appendChild($label);

  // input field created
  var $inputInitials = document.createElement("input");
  $inputInitials.placeholder = "Your initials here";
  $inputInitials.setAttribute("id", "initials");
  $winnersList.appendChild($inputInitials);

  // event listener for input field
  $winnersList.addEventListener("submit", function (event) {
    event.preventDefault();
    let userName = $inputInitials.value.trim();
    $inputInitials.setAttribute("disabled", true);

    if (userName.length === 0) {
      return;
    }

    $inputInitials.value = "";

    // what will be shown when user submits info
    $choicesHere.textContent = "Top Scores";
    var $listName = document.createElement("li");
    $listName.textContent = userName + "'s score: " + score + "/10";
    $choicesHere.appendChild($listName);

    // records user initials and score and pushes into array
    scoreList.push([userName, score]);
    localStorage.setItem("scores", scoreList);
   

    // will display the other high scores
    for (var i = 0; i < scoreList.length -1 ; i++) {
      
      var $listName = document.createElement("li");
      $listName.textContent = scoreList[i][0] + "'s score: " + scoreList[i][1] + "/10";
      localStorage.getItem("scores");
      $listName.setAttribute("data-index", i);
      $choicesHere.appendChild($listName);
    }
    // scoreList array will only record latest 10 scores
    if (scoreList.length === 5) {
      scoreList.shift();
  }
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
