const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const passport = require('passport')
require("../models/User");
const User = mongoose.model("users");

router.get("/cadastro", (req, res) => {
  User.find().then((result) => {
    res.send(result);
  });
});

router.post("/cadastro", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  User.findOne({ email: req.body.email }).then((result) => {
    if (result){
      
      return res.send({ message: "Erro, usuário já existe com este e-mail " });
    }

    bcryptjs.genSalt(10, (error, salt) => {
      bcryptjs.hash(newUser.password, salt, (error, hash) => {
        if (error) {
          res.redirect("/cadastro");
        }

        newUser.password = hash;

        User(newUser)
          .save()
          .then((result) => {
            console.log("User registred");
            
            res.redirect('/login')
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }).catch(error => res.status(400).send({messagem: "Erro interno"}))
});


router.post('/login', (req, res, next) => {
  const auth = passport.authenticate('local', {
    successRedirect: '/events',
    failureRedirect: '/login',
    
  })(req, res, next)
  
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})





module.exports = router;
