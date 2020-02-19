const express = require('express');
const router = express.Router();
const apiService = require("../services/APIHandler")
const heroesAPI = new apiService('https://www.superheroapi.com/api.php/2417317815245460/');
const spotifyApi = require('../configs/spotify.config');
const axios = require('axios')

// Requerir modelos
const Hero = require('../models/heroes.model')
const User = require('../models/user.model')

// Listado de heroes
router.get('/heroes', (req, res) => {

  Hero.find()
    .then(response => res.render('heroes/heroes-index', {
      heroes: response
    }))
})

// Detalle del héroe
router.get('/heroes/details/:id', (req, res) => {
  const heroId = req.params.id

  const heroesPromise = heroesAPI.getHeroDetails(heroId);

  const spotifyPromise = Hero.findOne({
      idBD: {
        $eq: heroId
      }
    })
    .then(res => {
      return spotifyApi.searchTracks(res.name)
        .then(function (data) {
          return data.body.tracks.items;
        }, function (err) {
          console.error(err);
        });
    })

    .catch(err => console.log(err))

  Promise.all([heroesPromise, spotifyPromise])
    .then(results => {
      res.render("heroes/hero-details", {
        heroes: results[0],
        spotify: results[1].splice(0, 4)
      })
    })

    .catch(err => console.log("Error consultando el héroe en la BBDD: ", err))
})


router.post('/api/heroes/details', (req, res) => {
  console.log(req.body)
  const userFav = {
    $push: {
      favourites: req.body.heroID
    }
  }
  User.findByIdAndUpdate(req.user.id, userFav)
    // .then(x => res.redirect(`/heroes/details/${heroId}`))
    .catch(err => console.log(err))
})

module.exports = router;