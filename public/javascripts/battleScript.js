document.getElementById('fight').addEventListener('click', function (event) {
    console.log("scriptJS")
    event.preventDefault();
    heroFight(document.getElementById('hero1').value, document.getElementById('hero2').value)

});