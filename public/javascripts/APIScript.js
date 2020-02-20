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


    let gg = await Promise.all(teamInfo1)
        .then(x => {
            console.log("dentro de x", x)
            // console.log(x[0])
            return x

        })
        .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))

    let hh = await Promise.all(teamInfo2)
        .then(x => {
            console.log("dentro de x", x)
            // console.log(x[0])
            return x

        })
        .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))

    console.log("este es el primer promise all", gg)
    console.log("este es el segundo promise all", hh)


    await axios.post("/battles/result", {
            team1: gg,
            team2: hh
        })
        .then(w => console.log(w))


}