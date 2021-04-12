
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

    runQuiz ();
};

// function to rotate through the array of questions
var runQuiz = function() {
    // if the index of the Array is greater than length of the questionsArr, end quiz
    if(indexArray === questionArray.length) {
        play = false;
    } else {
        // set variables from object in questionsArray index
        var question = questionArray[indexArray].question;
        var options = questionArray[indexArray].options;
        answer = questionArray[indexArray].answer;

        // change contents of page to match questionArray

        questionHeader.textContent = question;
        buttons.textContent = "";

        // for each of the 4 options create and append the quiz body
        for (var i = 0; i < options.length; i++) {
            var btnEl = document.createElement("button");
            btnEl.className = "option-list";
            btnEl.setAttribute("btn-id", [i+1]);

            // revisit me
            btnEl.textContent = `${[i+1]}. ${options[i]}`;
            buttons.appendChild(btnEl);
        }
        // increment indexNum to use in next run through
        indexArray++;
        // at this point the application will wait for the user to click on the page before continuing
    }
};

// function to read when the user clicks a button 
var optionEvent = function(event) {
    // on click, ensure an option button was clicked
    var targetEl = event.target;
    if(targetEl.matches(".option-list")) {
        // get button id of guess, pass to guess compare function
        var optionId = targetEl.getAttribute("btn-id");
        optionValidate(optionId);
    }
};

console.log(optionEvent);

// function to compare the guess to the actual answer 
var optionValidate = function(optionId) {
    // if validate is correct
    if(optionId == answer) {
         // increase correct variable, display correct, run next question
         timer += 3;
         correct++;
         answer.innerText = "Correct!";
         runQuiz();
     // if validate incorrect
     } else {
         // subtract from timer, increase wrong var, display wrong, run next question
         timer -= 10;
         wrong++;
         answer.innerText = "Wrong!";
         runQuiz();
     }
};




// End 

// Take User Input

// Save High Score


// event listener for click of start button
startButton.addEventListener("click", startQuiz);
// event listener for click of a option buttons during quiz
buttons.addEventListener("click", optionEvent);
// // event listener for submit button
