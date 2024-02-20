
const highScoresContainerEl = document.getElementById("highScoresContainer");
const firstName = document.getElementById("first-name");
const secondName = document.getElementById("second-name");
const thirdName = document.getElementById("third-name");
const firstScore = document.getElementById("first-score");
const secondScore = document.getElementById("second-score");
const thirdScore = document.getElementById("third-score");
let highScores = [];

score = {
    name: "Timo",
    score: 46,
    combo: 4,
}


function postScore(scoreObject) {
    const name = scoreObject.name;
    const score = scoreObject.score;
    const combo = scoreObject.combo;
    const uuid = crypto.randomUUID()

    fetch("https://x8ki-letl-twmt.n7.xano.io/api:pyvaqujt/scores", {
        method: "POST",
        body: JSON.stringify({ player: name, score: score, combo: combo, uuid: uuid }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function getScores() {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:pyvaqujt/scores", {
        method: "GET",
        // body: JSON.stringify({ player: name, score: score, combo: combo, uuid: uuid }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => highScores = data)
        .then(highScores => renderScores(highScores))
        .catch(error => console.error('Error:', error));
        
}


function renderScores(){
    firstName.textContent = highScores[0].player
    firstScore.textContent = highScores[0].score  
    secondName.textContent = highScores[1].player
    secondScore.textContent = highScores[1].score   
    thirdName.textContent = highScores[2].player
    thirdScore.textContent = highScores[2].score    
}