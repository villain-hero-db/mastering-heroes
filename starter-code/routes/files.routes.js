const express = require('express');
const router = express.Router();
const apiService = require("../services/APIHandler")
const heroesAPI = new apiService('https://www.superheroapi.com/api.php/2417317815245460/');

// Requerir modelos
const Hero = require('../models/heroes.model')


// Listado de heroes
router.get('/heroes', (req, res) => {

  Hero.find()
    .then(response => res.render('heroes/heroes-index', { heroes: response }))
})

// Detalle del héroe
router.get('/heroes/details/:id', (req, res) => {
  console.log(req.params.id)
  const heroId = req.params.id
  heroesAPI.getHeroDetails(heroId)
    .then(response => {
      console.log(response)
      res.render('heroes/hero-details', response)
    })

    .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))
})

module.exports = router;
