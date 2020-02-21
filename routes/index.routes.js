const express = require('express');
const router = express.Router();
const Hero = require('../models/heroes.model')


/* GET home page */
router.get('/', (req, res, next) => {
  Hero.find()
    .then(response => res.render('index', {
      randomHero: response.splice(Math.floor(Math.random() * (650 - 1)) + 1, 12),
      user: req.user
    }))
    .catch(err => next(err))
})


router.post('/api', (req, res, next) => {
  const heroSearch = req.body.input
  Hero.find({
    "name": {
      $regex: `.*${heroSearch}.*`,
      $options: 'i'
    }
  })
    .then(response => { res.json(response) })
    .catch(err => next(err))

})



module.exports = router;