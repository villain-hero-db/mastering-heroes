function addtoFavourites(heroID) {
    console.log("Estamos en APISCRIPT", heroID)

    return axios.post("/api/heroes/details", {
            heroID
        })
        .then(response => response)
        .catch(error => console.log('Oh No! Error is: ', error))


}
