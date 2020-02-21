
document.getElementById("sort").addEventListener('change', () => {
  const input = document.getElementById("sort").value
  axios.post("/heroes/api", { input })
    .then(response => {
      let allCharacters = response.data;
      document.querySelector('.sort-container').innerHTML = ""
      document.querySelector('.wo-sort')
      allCharacters.forEach(element => {
        const card =
          `<div class="col-md-3 col-6 mb-4"><div class="card p-3 btn-change">
          <a href="/heroes/details/${element.idBD}">
          <img class="card-img-top" src="${element.image}" alt="${element.name}"></a>
          <h5 class="card-title pt-2">${element.name}</h5>
          <p class="card-text">${element.publisher}</p>
          </div></div>`
        document.querySelector('.sort-container').innerHTML += card
      });

    })
    .catch(err => new Error(err))
})