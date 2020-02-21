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
            // console.log(x[0])
            return x
        })
        .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))
    let team2Ready = await Promise.all(teamInfo2)
        .then(x => {
            console.log("dentro de x", x)
            // console.log(x[0])
            return x
        })
        .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))
    for (i = 0; i < team1Ready.length; i++) {
        document.getElementById(`nameT1P${i}`).value = team1Ready[i].name
        document.getElementById(`imgT1P${i}`).src = team1Ready[i].image.url
    }
    for (i = 0; i < team2Ready.length; i++) {
        document.getElementById(`nameT2P${i}`).value = team2Ready[i].name
        document.getElementById(`imgT2P${i}`).src = team2Ready[i].image.url
    }

    // await axios.post("/battles/result", {
    //         team1: gg,
    //         team2: hh
    //     })
    //     .then(w => console.log(w))


}