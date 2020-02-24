const express = require("express");
const router = express.Router();
const apiService = require("../services/APIHandler");
const heroesAPI = new apiService("https://www.superheroapi.com/api.php/2417317815245460/");
const spotifyApi = require("../configs/spotify.config");
const axios = require("axios");

// Requerir modelos
const Hero = require('../models/heroes.model')
const User = require('../models/user.model')

// Listado de heroes
router.get("/heroes", (req, res, next) => {
  Hero.find()
    .then(response => res.render("heroes/heroes-index", { heroes: response.splice(Math.floor(Math.random() * (650 - 1)) + 1, 12) }))
    .catch(err => next(err));
});

router.post("/heroes/api", (req, res) => {
  const heroSort = req.body.input;
  Hero.find({
    name: {
      $regex: `^[${heroSort}]`,
      $options: "i"
    }
  })
    .then(response => res.json(response))
    .catch(err => next(err));
});

// Detalle del héroe
router.get("/heroes/details/:id", (req, res, next) => {
  const heroId = req.params.id;

  const heroesPromise = heroesAPI.getHeroDetails(heroId);
  const moviesPromise = Hero.findOne({ idBD: { $eq: heroId } })
    .then(res => axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API}&query=${res.name}`))
    .then(data => data.data.results)
    .catch(err => next(err))

  const spotifyPromise = Hero.findOne({ idBD: { $eq: heroId } })
    .then(res => spotifyApi.searchTracks(res.name))
    .then(data => data.body.tracks.items)
    .catch(err => next(err));

  const favPromise = Hero.findOne({ idBD: { $eq: heroId } })
    .then(data => {
      if (req.user) {
        return req.user.favourites.includes(data._id) ? { x: "", y: "dsp" } : { x: "dsp", y: "" }
      }
      else { return { x: "", y: "dsp" } }
    })
    .catch(err => next(err));

  Promise.all([heroesPromise, spotifyPromise, moviesPromise, favPromise])
    .then(results => {
      const spotify = results[1] ? results[1].splice(0, 4) : results[1] = [""]
      const movies = results[2] ? results[2].splice(0, 4) : results[2] = [""]
      res.render("heroes/hero-details", {
        heroes: results[0],
        spotify: spotify,
        movies: movies,
        fav: results[3]
      });
    })
    .catch(err => next(err));
});

router.post("/api/heroes/details", (req, res, next) => {
  Hero.findOne({
    idBD: req.body.heroID
  })
    .then(response => {
      if (req.user.favourites.includes(response._id)) {
        const userFavDelete = { $pull: { favourites: response._id } };
        User.findByIdAndUpdate(req.user.id, userFavDelete)
          .catch(err => next(err));
      } else {
        const userFav = { $push: { favourites: response._id } };
        User.findByIdAndUpdate(req.user.id, userFav)
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});






module.exports = router;