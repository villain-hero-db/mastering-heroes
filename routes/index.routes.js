const express = require('express');
const router = express.Router();
const Hero = require('../models/heroes.model')


/* GET home page */
router.get('/', (req, res) => {
  // const heroSearch = req.query.search
  Hero.find()
    .then(response => res.render('index', {
      randomHero: response.splice(Math.floor(Math.random() * (650 - 1)) + 1, 12),
      user: req.user
    }))
    .catch(err => next(new Error(err)))
})


router.post('/api', (req, res) => {
  // const heroSearch = req.query.search
  const heroSearch = req.body.input

  Hero.find({
    "name": {
      $regex: `.*${heroSearch}.*`,
      $options: 'i'
    }
  })
    .then(response => {
      // res.render('index', {
      //   heroes: response,
      // })
      res.json(response)
    })
    .catch(err => next(new Error(err)))

})



module.exports = router;