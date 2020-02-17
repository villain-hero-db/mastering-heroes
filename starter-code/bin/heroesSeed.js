const mongoose = require('mongoose')
const Heroes = require('../models/heroes.model')
const dbtitle = 'mastering-heroes'
const axios = require("axios");
mongoose.connect(`mongodb://localhost/${dbtitle}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// Heroes.collection.drop()

// Importancion de heroes a la BBDD

for (i = 1; i <= 20; i++) {



  axios.get(`https://www.superheroapi.com/api.php/2417317815245460/${i}`)
    .then(response => {
      //console.log(response)
      const importCharacter = {
        name: response.data.name,
        idBD: response.data.id,
        image: response.data.image.url,
        fullName: response.data.biography["full-name"],
        publisher: response.data.biography.publisher,
        firstAppearance: response.data.biography["first-appearance"],
      }

      Heroes.create(importCharacter)
    })
    .catch(error => console.log('Oh No! Error is: ', error))
}