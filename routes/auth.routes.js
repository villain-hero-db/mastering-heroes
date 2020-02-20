const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/user.model");

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

// Cloudinary
const uploadCloud = require("../configs/cloudinary.config");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;



router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  User.findById(req.user.id)
    .populate('favourites')
    .then(theUser => res.render('auth/profile', { user: theUser }))
});

//Add picture to profile
router.post(
  "/profile",
  uploadCloud.single("phototoupload"),
  (req, res, next) => {
    console.log(
      "Y esto es lo que hace multer cuando colabora con Cloudinary",
      req.file
    );

    User.findByIdAndUpdate(req.user._id, {
      avatarPath: req.file.secure_url,
    })
      .then(() => res.redirect("/profile"))
      .catch(err => next(err));
  }
);

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login",
  ensureLoggedOut(),
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("auth/signup", {
    message: req.flash("error")
  });
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
      .then(() => {
        res.redirect("/profile");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


module.exports = router;
