document.getElementById('favourite').addEventListener('click', (event) => {
    event.preventDefault();
    addtoFavourites(document.getElementById('favourite').name)

    document.querySelector('#fav-on').classList.toggle('dsp')
    document.querySelector('#fav-off').classList.toggle('dsp')
})
