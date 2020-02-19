function addtoFavourites(heroID) {
    console.log("Estamos en APISCRIPT", heroID)

    return axios.post("/api/heroes/details", {
            heroID
        })
        .then(response => response)
        .catch(error => console.log('Oh No! Error is: ', error))


}

function heroFight(hero1, hero2) {
    console.log(hero1)
    console.log(hero2)

    return axios.post("/battles", {
        hero1,
        hero2
    })


}