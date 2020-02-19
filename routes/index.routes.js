const express = require('express');
const router = express.Router();
const Hero = require('../models/heroes.model')


/* GET home page */
router.get('/', (req, res) => {
  // const heroSearch = req.query.search

  Hero.find()
    .then(response => res.render('index', {
      randomHero: response.splice(0, 12),
    }))
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
      console.log(response)
      // res.render('index', {
      //   heroes: response,
      // })
      res.json(response)
    })
})



module.exports = router;
