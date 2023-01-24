//VARIABLE DEFINITIONS

// QUESTIONS
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with _____.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },

];

// ELEMENT REFERENCE VARIABLES
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choice01 = document.getElementById("btn0");
var choice02 = document.getElementById("btn1");
var choice03 = document.getElementById("btn2");
var choice04 = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");


//FEEDBACK VARIABLES
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;


//FUNCTIONS
//TIMER FUNCTIONS
var totalTime = 151;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    

    var startTimer = setInterval(function () {
        totalTime--;
        timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                quizOver();
            }
        }
    }, 1000);

    showQuiz();
};


//SHOW QUESTIONS AND OPTIONS FUNCTIONS
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choice01.textContent = questions[questionIndex].choices[0];
    choice02.textContent = questions[questionIndex].choices[1];
    choice03.textContent = questions[questionIndex].choices[2];
    choice04.textContent = questions[questionIndex].choices[3];
}

//SHOW ANSWER FEEDBACK FUNCTIONS
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        //IF CORRECT, ADD 1 TO SCORE
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        //IF WRONG, REMOVE 10 SECONDS FROM TIMER
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong!";
    }

    questionIndex++;
    //CONTINUE WITH REMAINING QUESTIONS
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        //END QUIZ WHEN ALL QUESTIONS ARE ANSWERED
        quizOver();
    }
}

function choose01() { checkAnswer(0); }

function choose02() { checkAnswer(1); }

function choose03() { checkAnswer(2); }

function choose04() { checkAnswer(3); }





//QUIZ ENDING FUNCTIONS
function quizOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";


    //DISPLAY FINAL SCORE
    finalScore.textContent = correctAns;
}

//ENTER AND STORE INITIALS FUNCTIONS
function storeHighScores(event) {
    event.preventDefault();

    //NO INITIALS ALERT
    if (initialInput.value === "") {
        alert("Please enter your initials.");
        return;
    }

    startDiv.style.display = "none";
    timer.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";


    //SAVE SCORES TO LOCAL STORAGE
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);


    //STRINGIFY
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    //DISPLAY HIGH SCORES
    showHighScores();
}

//HIGH SCORE FUNCTIONS
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    //CHECK LOCAL STORAGE FOR HIGH SCORES
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


//EVENT LISTENERS
startQuizBtn.addEventListener("click", newQuiz);
choice01.addEventListener("click", choose01);
choice02.addEventListener("click", choose02);
choice03.addEventListener("click", choose03);
choice04.addEventListener("click", choose04);

submitInitialBtn.addEventListener("click", function (event) {
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function (event) {
    showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
    window.localStorage.removeItem("high scores");
});