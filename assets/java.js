
// html element selectors
var countdownEl = document.querySelector("#countdown");
var article = document.querySelector("#quiz-form");
// main, h1 for question display
var questionHeader = document.querySelector("#quiz-header");
var buttons = document.querySelector("#quiz-body");
var startButton = document.querySelector("#start-button");
var answer = document.querySelector("#answer");

// global variables
var questionArray = [
    {question: "Arrays in JavaScript can be used to store ________. ",
    options: ["numbers and strings","other arrays","booleans","all of the above"],
    answer:"4"},
    {question: "Arrays in JavaScript can be used to store ________. ",
    options: ["A","B","C","D"],
    answer:"4"},
    ]


var indexArray = 0;
var timer = 59;
var correct = 0;
var wrong = 0;
var play = true;
var highScores = [];


// function for countdown 
var countdown = function() {
    var timeInterval = setInterval(function() {
        if(timer > 0 && play === true) {
            countdownEl.innerText = timer;
            timer--;
        } else {
            countdownEl.innerText = timer;
            countdownEl.setAttribute("style", "color: red;");
            clearInterval(timeInterval);
            // endQuiz();
        }
    }, 1000);
};

// function to start timer and start quiz
var startQuiz = function() {
    //use the countdown function
    countdown();

    // style quiz
    questionHeader.setAttribute("style", "text-align: left;");
    buttons.setAttribute("style", "margin-left: 25px;");

    // remove start button
    startButton.remove();

};


// Run Quiz

// Check Answer 

// End 

// Take User Input

// Save High Score


// event listener for click of start button
startButton.addEventListener("click", startQuiz);
// event listener for click of a guess button during quiz
// buttons.addEventListener("click", checkAnswer);
// // event listener for submit button
