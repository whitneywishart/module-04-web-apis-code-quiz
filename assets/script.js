//WHEN I click the start button
//THEN a timer starts and I am presented with a question

//Click start quiz button and start the timer
//Start quiz and timer
var timeElement = document.querySelector("#start-quiz");
var timeDisplay = document.querySelector("#time-display");
var secondsElapsed = 0;

function startTimer() {
    var timerInterval = setInterval(function () {
        secondsElapsed++;
        timeDisplay.textContent = "Time: " + secondsElapsed;

    }, 1000);
}

//Questions and options
var page01Question = {
    question01: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correct: 2
}


function displayQuestion(q) {
    var question01Div = document.getElementById("question01");
    question01Div.textContent = q.question01;

    var opts = document.querySelectorAll(".option-button");
    opts.forEach(function (element, index) {
        element.textContent = q.options[index];
        element.addEventListener("click", function () {
            if (q.correct == index) {
                console.log("Correct!");
            } else {
                console.log("Wrong!");
            }
        })
    });


}

displayQuestion(page01Question);







//WHEN I answer a question
//THEN I am presented with another question

//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock

//WHEN all questions are answered or the timer reaches 0
//THEN the game is over

//WHEN the game is over
//THEN I can save my initials and score