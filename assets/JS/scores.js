// get ul element
var ulEl = document.querySelector("#scores");
// get return button
var returnEl = document.querySelector("#return-button")

// global variables
var highScores = [];

// function to get and display high scores from localStorage
var loadScores = function() {
    highScores = localStorage.getItem("scores");
    // check if scores is null/falsy
    if(!highScores) {
        highScores = [];
        return false;
    }
    // convert highScores from stringified format to an array of objects

    highScores = JSON.parse(highScores);
    console.log(highScores);

    // iterate through highScores array and add a list item to the page for each score
    for(var i = 0; i < highScores.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.className = "listed-score";

        var nameEl = document.createElement("div");
        nameEl.className = "score-info";
        nameEl.innerHTML = `<b>Player:</b> ${highScores[i].initials}`;
        listItemEl.appendChild(nameEl);

        var scoreEl = document.createElement("div");
        scoreEl.className = "score-info";
        scoreEl.innerHTML = ` <b> score:</b> ${highScores[i].score}`;
        listItemEl.appendChild(scoreEl);
        
        ulEl.appendChild(listItemEl);
    }
};

// function to return to index.html
var returnHome = function() {
    location.replace("https://ali-mitchell.github.io/quiz-console/");
};


// event listener for return button
returnEl.addEventListener("click", returnHome);


loadScores();