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




