
// html element selectors
var countdownEl = document.querySelector("#countdown");
var article = document.querySelector("#quiz-form");
// main, h1 for question display
var questionHeader = document.querySelector("#quiz-header");
var buttons = document.querySelector("#quiz-body");
var startButton = document.querySelector("#start-button");
var answerReturn = document.querySelector("#answer-return");

// global variables
var questionArray = [
    {question: "A very usefull tool used during development, debugging and printing content to the debugger is ________.",
    options: ["javascript","the terminal","for loops","console.log"],
    answer:"4"},

    {question: "Arrays in JavaScript can be used to store ________. ",
    options: ["numbers and strings","other arrays","booleans","all of the above"],
    answer:"4"},

    {question:"The condition in an if /else statement is enclosed with ____.",
    options: ["A","B","C","D"],
    answer:"4"},

    {question: "String Values must be enclosed within __ when being assigned to variables",
    options: ["quotes","commas","culry brackets","parenthesis"],
    answer:"4"},

    {question: "Commonly used data types DO Not include: ",
    options: ["strings","booleans","alerts","numbers"],
    answer:"4"},
    ]


var indexArray = 0;
var timer = 59;
var correct = 0;
var wrong = 0;
var play = true;
var score = 0;
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
            endQuiz();
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
    if(targetEl.matches("button.option-list")) {
        // get button id of guess, pass to guess compare function
        var optionId = targetEl.getAttribute("btn-id");
        optionValidate(optionId);
    }
};


// function to compare the button click to the actual answer 
var optionValidate = function(optionId) {
    // if validate is correct
    if(optionId === answer) {
         // increase correct variable, display correct, run next question
         correct++;
         answerReturn.innerText = "Correct!";
         runQuiz();
     // if validate incorrect
     } else {
         // subtract from timer, increase wrong var, display wrong, run next question
         timer -= 10;
         wrong++;
         answerReturn.innerText = "Wrong!";
         runQuiz();
     }

};


// function to end the quiz after all questions are answered or the timer runs out
var endQuiz = function() {
    // // ensure timer can't be negative
    if(timer < 0) {
        timer = 0;
        countdownEl.innerText = timer;
    }

//    determines the score by adding time remaining and correct answers - wrong answers.
    score = timer + correct - wrong

    // clear wrong answer message
    answerReturn.innerText = "";
 

    // create and append a form elements for submitting initials

      // update DOM

      questionHeader.innerHTML = "You're score is: " + score;
      buttons.innerHTML = `You got ${correct} questions correct and ${wrong} questions wrong.</div><div>Your had ${timer} seconds remaining`;
    

    var formEl = document.createElement("form");
    formEl.setAttribute("id", "initials-form")

    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("name", "user-initials");
    userInput.className = "user-initials";
    userInput.setAttribute("placeholder", "Enter Your Initials");


    formEl.appendChild(userInput);

    var submitEl = document.createElement("button");
    submitEl.className = "btn";
    submitEl.setAttribute("id", "save-initials");
    submitEl.setAttribute("type", "submit");
    submitEl.textContent = "Submit Your Score";


    formEl.appendChild(submitEl);

    // append the entire form to the body of the quiz
    buttons.appendChild(formEl);
};


// function for submit button
var saveHighScore = function(event) {
    //Why do we have to do this?
    event.preventDefault();
    // only run if the submit button is being clicked
    var targetEl = event.target;
    if(targetEl.matches("#save-initials")) {
        // get the initial entry form element
        var formEl = document.querySelector(".user-initials");
        var userInitials = formEl.value
        // ensure initials have been entered
        if(!userInitials) {
            alert("Please enter your initials to submit your score...");
            return false;
        // save user input and store to localStorage
        } else {
            var highScoreObj = {
                initials: userInitials,
                Score: score
            };
            // send obj to highScores array
            highScores.push(highScoreObj);

            console.log(highScoreObj);
            // save highScores array to local storage/ and convert the score into a string use json for javascript object notation*
            localStorage.setItem("scores", JSON.stringify(highScores));
            // redirect user to the high score page
            location.replace("https://ali-mitchell.github.io/quiz-console/highscores.html");
        }
    }
};


// event listener for click of start button
startButton.addEventListener("click", startQuiz);
// event listener for click of a option buttons during quiz
buttons.addEventListener("click", optionEvent);
// // event listener for submit button
article.addEventListener("click", saveHighScore);
