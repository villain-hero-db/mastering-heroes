

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
    console.log("holaaaa")
    const input = document.getElementById("index-input").value
    console.log(input)
    axios.post("/api", { input })
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


  })



}, false);

$(function () {
  $('a[href="#search"]').on('click', function (event) {
    event.preventDefault();
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus();
  });

  $('#search, #search button.close').on('click keyup', function (event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
      $(this).removeClass('open');
    }
  });

});


