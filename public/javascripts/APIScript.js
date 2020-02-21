let t1power = 0
let t2power = 0


function addtoFavourites(heroID) {
    console.log("Estamos en APISCRIPT", heroID)

    return axios.post("/api/heroes/details", {
        heroID
    })
        .then(response => response)
        .catch(error => console.log('Oh No! Error is: ', error))


}

async function heroFight(team1, team2) {

    const teamInfo1 = await team1.map((team, id) => {

        return axios.get(`https://www.superheroapi.com/api.php/2417317815245460/${team1[id]}`)
            .then(response => {
                return response.data

            })
            .catch(err => reject(err))

    })

    const teamInfo2 = await team2.map((team, id) => {

        return axios.get(`https://www.superheroapi.com/api.php/2417317815245460/${team2[id]}`)
            .then(response => {
                return response.data

            })
            .catch(err => reject(err))

    })

    let team1Ready = await Promise.all(teamInfo1)
        .then(x => {
            console.log("dentro de x", x)

            return x
        })
        .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))
    let team2Ready = await Promise.all(teamInfo2)
        .then(x => {
            console.log("dentro de x", x)
            return x
        })
        .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))


    for (i = 0; i < team1Ready.length; i++) {

        if (team1Ready[i].powerstats.power === "null") {
            team1Ready[i].powerstats.power = 0
            t1power += +team1Ready[i].powerstats.power;
        } else t1power += +team1Ready[i].powerstats.power


    }

    for (i = 0; i < team2Ready.length; i++) {

        if (team2Ready[i].powerstats.power === "null") {
            team2Ready[i].powerstats.power = 0
            t2power += +team2Ready[i].powerstats.power;
        } else t2power += +team2Ready[i].powerstats.power


    }


    if (t1power > t2power) {
        console.log('win 1')

        document.getElementById('btl-team1').innerHTML = `<div class="win"><h4>Team 1 win</h4></div>`
        document.getElementById('btl-team2').innerHTML = `<div class="lose"><h4>Team 2 lose</h4></div>`

    } else if (t1power < t2power) {
        console.log('win 2')

        document.getElementById('btl-team1').innerHTML = `<div class="lose"><h4>Team 1 lose</h4></div>`
        document.getElementById('btl-team2').innerHTML = `<div class="win"><h4>Team 2 win</h4></div>`
    } else {
        document.getElementById('btl-team1').innerHTML = `<div class="lose"><h4>Draw</h4></div>`
        document.getElementById('btl-team2').innerHTML = `<div class="lose"><h4>Draw</h4></div>`
    }
}