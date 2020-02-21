let allCharacters
document.addEventListener('DOMContentLoaded', () => {
    console.log('IronGenerator JS imported successfully!');
    document.getElementById("index-input").addEventListener('keyup', () => {

        const input = document.getElementById("index-input").value

        if ((input.length > 1)) {
            axios.post("/api", {
                input
            })
                .then(response => {

                    allCharacters = response.data;
                    console.log(allCharacters)
                    document.querySelector('.characters-container').innerHTML = ""

                    allCharacters.forEach(element => {
                        const card = `
                        <div class="col-md-3">
                        <div class="card-index p-1">
                        <div class="h-200">
                        <a href="/heroes/details/{{idBD}}">
                        <img class="card-img-index" src="${element.image}" alt="${element.name}"></a>
                        <h6 class="card-title mt-2">${element.name}</h6>
                        </div>
                        <button class="btn btn-info w-100" onclick="pushHeroes1(${element.idBD})">Team 1</button>
                        <button class="btn btn-dark w-100" onclick="pushHeroes2(${element.idBD})">Team 2</button>
                        </div>`


                        document.querySelector('.characters-container').innerHTML += card

                    });

                })
                .catch(err => console.log(err))
        }

    })

}, false);

const team1 = []
const team2 = []



function pushHeroes1(id) {

    actualHero = allCharacters.map(e => e.idBD).indexOf(id);

    if (team1.includes(id)) {
        alert("Already add to team 1")
    } else {
        team1.push(id)
        let pos = team1.length - 1
        document.getElementById(`nameT1P${pos}`).innerHTML = `<img class="card-img-index" src ="${allCharacters[actualHero].image}" alt="${allCharacters[actualHero].name}"></a>
                <h6 class="card-title mt-2">${allCharacters[actualHero].name}</h6>`
    }
}

function pushHeroes2(id) {
    actualHero = allCharacters.map(e => e.idBD).indexOf(id);

    if (team2.includes(id)) {
        alert("Already add to team 2")
    } else {
        team2.push(id)
        let pos = team2.length - 1
        document.getElementById(`nameT2P${pos}`).innerHTML = `<img class="card-img-index" src ="${allCharacters[actualHero].image}" alt="${allCharacters[actualHero].name}"></a>
                <h6 class="card-title mt-2">${allCharacters[actualHero].name}</h6>`
    }
}



document.getElementById('fight').addEventListener('click', function (event) {
    console.log("scriptJS")
    event.preventDefault();
    heroFight(team1, team2)

})