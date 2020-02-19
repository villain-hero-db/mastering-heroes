document.addEventListener('DOMContentLoaded', () => {

    console.log('IronGenerator JS imported successfully!');

    // document.getElementById('btn-upload').addEventListener('click', function (event) {

    //   document.querySelector('.file-upload').classList.toggle('visibility')

    // });

    // document.getElementById('favourite').addEventListener('click', function (event) {
    //   event.preventDefault();
    //   addtoFavourites(document.getElementById('favourite').value)

    // });


    document.getElementById("index-input").addEventListener('keyup', () => {

        const input = document.getElementById("index-input").value
        console.log(typeof input)
        console.log(input.length)
        if ((input.length != 0)) {
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

                  <a href="/heroes/details/${element.idBD}" class="btn btn-primary">View more</a>
                </div>
            </div></div>`




                        // `<div class="character-info">
                        //   <div class="name">${element.name}</div>
                        //   <div class="occupation">${element.image}</div>`

                        document.querySelector('.characters-container').innerHTML += card
                    });

                })
                .catch(err => console.log(err))
        }

    })



}, false);



document.getElementById('fight').addEventListener('click', function (event) {
    console.log("scriptJS")
    event.preventDefault();
    heroFight(document.getElementById('hero1').value, document.getElementById('hero2').value)

});