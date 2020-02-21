document.addEventListener('DOMContentLoaded', () => {

  document.getElementById("index-input").addEventListener('keyup', () => {

    const input = document.getElementById("index-input").value
    if (input.length > 1) {
      axios.post("/api", { input })
        .then(response => {
          let allCharacters = response.data;
          document.querySelector('.characters-container').innerHTML = ""
          allCharacters.forEach(element => {
            const card =
              `<div class="col-md-3 mb-4"><div class="card p-3 btn-change">
          <a href="/heroes/details/${element.idBD}">
          <img class="card-img-top" src="${element.image}" alt="${element.name}"></a>
          <h5 class="card-title pt-2">${element.name}</h5>
          <p class="card-text">${element.publisher}</p>
          </div></div>`
            document.querySelector('.characters-container').innerHTML += card
          });

        })
        .catch(err => new Error(err))
    }
  });

}, false);






