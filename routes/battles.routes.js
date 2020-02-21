const express = require("express");
const router = express.Router();
const Hero = require('../models/heroes.model')


//Battles

router.get("/battles", (req, res) => {
    Hero.find()
        .then(response =>
            res.render("heroes/heroes-battles", {
                heroes: response
            })
        )
        .catch(err => console.log(err));
});

module.exports = router;