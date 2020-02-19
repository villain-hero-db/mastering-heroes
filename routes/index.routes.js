const express = require('express');
const router = express.Router();
const Hero = require('../models/heroes.model')

/* GET home page */
router.get('/', (req, res) => {
  const heroSearch = req.query.search
  Hero.find({
      "name": {
        $regex: `.*${heroSearch}.*`,
        $options: 'i'
      }
    })
    .then(response => res.render('index', {
      heroes: response
    }))
})


module.exports = router;