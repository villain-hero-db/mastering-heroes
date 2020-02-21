document.addEventListener('DOMContentLoaded', () => {
    console.log('IronGenerator JS imported successfully!');
    document.getElementById("index-input").addEventListener('keyup', () => {

        const input = document.getElementById("index-input").value

        if ((input.length > 1)) {
            axios.post("/api", {
                input
            })
                .then(response => {

                    let allCharacters = response.data;
                    console.log(allCharacters)
                    document.querySelector('.characters-container').innerHTML = ""

                    allCharacters.forEach(element => {
                        const card =
                            `<div class="col-md-3">
            <div class="card p-3" style="width: 18rem;">
              <img class="card-img-top" src="${element.image}" alt="${element.name}">
                <div class=" card-body">
                  <h5 class="card-title">${element.name}</h5>
                        <button onclick="pushHeroes1(${element.idBD})">Añadir al equipo 1</button>
                        <button onclick="pushHeroes2(${element.idBD})">Añadir al equipo 2</button>
                </div>
            </div></div>`

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

    if (team1.includes(id)) {
        alert("Ya esta en el team 1")
    } else {
        team1.push(id)
        console.log(team1)
    }
}

function pushHeroes2(id) {

    if (team2.includes(id)) {
        alert("Ya esta en el team 2")
    } else {
        team2.push(id)
        console.log(team2)
    }
}

document.getElementById('fight').addEventListener('click', function (event) {
    console.log("scriptJS")
    event.preventDefault();
    heroFight(team1, team2)

})