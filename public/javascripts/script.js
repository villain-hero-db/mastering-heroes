document.addEventListener('DOMContentLoaded', () => {

  document.getElementById("index-input").addEventListener('keyup', () => {

    const input = document.getElementById("index-input").value
    if ((input.length > 1)) {
      axios.post("/api", {
        input
      })
        .then(response => {

          let allCharacters = response.data;
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
            document.querySelector('.characters-container').innerHTML += card
          });

        })
        .catch(err => console.log(err))
    }
  })



}, false);

document.getElementById('favourite').addEventListener('click', function (event) {
  event.preventDefault();
  addtoFavourites(document.getElementById('favourite').name)
  document.querySelector('#fav-on').classList.toggle('dsp')
  document.querySelector('#fav-off').classList.toggle('dsp')
})

document.getElementById('btn-upload').addEventListener('click', function (event) {
  document.querySelector('.file-upload').classList.toggle('visibility')

});