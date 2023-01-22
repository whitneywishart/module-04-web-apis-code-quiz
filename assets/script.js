//WHEN I click the start button
//THEN a timer starts and I am presented with a question

//Start quiz and timer
var timeDisplay = document.getElementById("time-display");
var secondsLeft = 300;

function begin() {
    sendQuiz();
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeDisplay.textContent = "Time: " + secondsLeft;
    }, 1000);
}


//Display intro and start quiz button
var quizIntro = {
    title: "Coding Quiz Challenge",
    description: "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!",
    startButton: "Start Quiz"
}

function displayIntro(d) {
    var introTitleDiv = document.getElementById("title");
    var introDescriptionDiv = document.getElementById("description");

    introTitleDiv.textContent = d.title;
    introDescriptionDiv.textContent = d.description;

    var startQuiz = document.getElementById("start-quiz");
    startQuiz.textContent = "Start Quiz"
}

displayIntro(quizIntro);



//Display first question on start quiz button click
function sendQuiz() {
    var firstQuestion = {
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

    displayQuestion(firstQuestion);

}

















//WHEN I answer a question
//THEN I am presented with another question

//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock

//WHEN all questions are answered or the timer reaches 0
//THEN the game is over

//WHEN the game is over
//THEN I can save my initials and score