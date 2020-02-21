const express = require('express');
const router = express.Router();
const apiService = require("../services/APIHandler")
const heroesAPI = new apiService('https://www.superheroapi.com/api.php/2417317815245460/');
const spotifyApi = require('../configs/spotify.config');
const axios = require('axios')

// Requerir modelos
const Hero = require('../models/heroes.model')
const User = require('../models/user.model')
const Battle = require('../models/battle.model')

// Listado de heroes
router.get('/heroes', (req, res) => {

  Hero.find()
    .then(response => res.render('heroes/heroes-index', {
      heroes: response.splice(Math.floor(Math.random() * (650 - 1)) + 1, 12)
    }))
    .catch(err => next(new Error(err)))

})

router.post('/heroes/api', (req, res) => {
  // const heroSearch = req.query.search
  const heroSort = req.body.input
  Hero.find({
      "name": {
        $regex: `^[${heroSort}]`,
        $options: 'i'
      }
    })
    .then(response => {
      res.json(response)
    })
    .catch(err => next(new Error(err)))

})

// Detalle del héroe
router.get('/heroes/details/:id', (req, res, next) => {
  const heroId = req.params.id

  const heroesPromise = heroesAPI.getHeroDetails(heroId);

  const moviesPromise = Hero.findOne({
      idBD: {
        $eq: heroId
      }
    })
    .then(res => {
      return axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API}&query=${res.name}`
        ).then((data) => {
          return data.data.results;
        })
        .catch(err => next(new Error(err)))
    })
    .catch(err => next(new Error(err)))


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
    .catch(err => next(new Error(err)))

  const favPromise = Hero.findOne({
      idBD: {
        $eq: heroId
      }
    })
    .then(data => {
      if (req.user.favourites.includes(data._id)) {
        return {
          x: '',
          y: 'dsp'
        }
      } else return {
        x: 'dsp',
        y: ''
      }
    })
    .catch(err => next(new Error(err)))

  Promise.all([heroesPromise, spotifyPromise, moviesPromise, favPromise])
    .then(results => {
      console.log(favPromise);
      res.render("heroes/hero-details", {
        heroes: results[0],
        spotify: results[1].splice(0, 4),
        movies: results[2].splice(0, 4),
        fav: results[3]
      })
    })
    .catch(err => next(new Error(err)))
})


router.post('/api/heroes/details', (req, res) => {


  Hero.findOne({
      "idBD": req.body.heroID
    })
    .then(response => {

      if (req.user.favourites.includes(response._id)) {
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
    .catch(err => next(new Error(err)))
})

//Batallas

router.get('/battles', (req, res) => {

  Hero.find()
    .then(response => res.render('heroes/heroes-battles', {
      heroes: response
    }))
    .catch(err => next(new Error(err)))

})

router.get('/battles/result', (req, res) => res.render('heroes/battle-result'))


router.post('/battles/result', (req, res) => {
  let BattleID = "5e4ec95f29ab01371a83c5b8"
  for (i = 0; i < req.body.team1.length; i++) {

    const battle1 = {
      $push: {
        "team1.heroes": {

          id: req.body.team1[i].id,
          name: req.body.team1[i].name,
          imgurl: req.body.team1[i].image.url,
          powerstats: {
            intelligence: req.body.team1[i].powerstats.intelligence,
            strenght: req.body.team1[i].powerstats.strenght,
            speed: req.body.team1[i].powerstats.speed,
            durability: req.body.team1[i].powerstats.durability,
            power: req.body.team1[i].powerstats.power,
            combat: req.body.team1[i].powerstats.combat
          }

        },
        "team2.heroes": {

          id: req.body.team2[i].id,
          name: req.body.team2[i].name,
          imgurl: req.body.team2[i].image.url,
          powerstats: {
            intelligence: req.body.team2[i].powerstats.intelligence,
            strenght: req.body.team2[i].powerstats.strenght,
            speed: req.body.team2[i].powerstats.speed,
            durability: req.body.team2[i].powerstats.durability,
            power: req.body.team2[i].powerstats.power,
            combat: req.body.team2[i].powerstats.combat
          }
        }
      }
    }

    Battle.findByIdAndUpdate(BattleID, battle1)
      .then(res.redirect('/battles/result'))
  }
})



module.exports = router;