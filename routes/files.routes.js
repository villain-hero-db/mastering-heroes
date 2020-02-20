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


  Hero.findOne({
      "idBD": req.body.heroID
    })
    .then(response => {

      if (req.user.favourites.includes(response._id)) {
        console.log("El hero ya esta en favoritos")

        const userFavDelete = {
          $pull: {
            favourites: response._id
          }
        }

        User.findByIdAndUpdate(req.user.id, userFavDelete)
          .catch(err => console.log(err))

      } else {
        const userFav = {
          $push: {
            favourites: response._id
          }
        }
        User.findByIdAndUpdate(req.user.id, userFav)
          .catch(err => console.log(err))
      }

    })


})

//Batallas

router.get('/battles', (req, res) => {

  Hero.find()
    .then(response => res.render('heroes/heroes-battles', {
      heroes: response
    }))
})

router.get('/battles/result', (req, res) => res.render('heroes/battle-result'))


router.post('/battles/result', (req, res) => {
  console.log("este es el req bodyyyyy", req.body)
  // req.body.team1.forEach(el => console.log("hola", el))
  // req.body.team2.forEach(el => console.log("hola", el))

  // const heroBattle = {

  // }

  // Hero.findById(req.body.hero1)
  //   .then(hero => {
  //     heroBattle.team1 = hero

  //   })
  //   .then(() => Hero.findById(req.body.hero2)
  //     .then(hero => {
  //       heroBattle.team2 = hero

  //     }))
  //   .then(() => res.render('heroes/heroes-battles', {
  //     hero: heroBattle.team1.name
  //   }))

})

module.exports = router;