const mongoose = require('mongoose');
const express = require('express');
require('../models/User');
const User = mongoose.model('users')

const router = express.Router();

router.get('/users', (req, res) => {
  User.find().then((result) => {
    res.send(result)
  })
})

router.post('/users/add', (req, res) => {
  const newEvent = { 
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  }

  new User(newEvent).save().then((result) => {
    console.log('User registred')
    return res.send(result).status(201)
  }).catch((error) => {
    console.log("Error")
  })
})

router.post('/users/edit', (req, res) => {
  User.findOne({_id: req.body.id}).then((user) => {
    user.name = req.body.name;

    user.save().then((result) => {
      console.log('Edit')
      res.send(result)
    }).catch((error) => {
      res.send(error)
    })
  }).catch((error) => {
    res.send(error)
  })
})

module.exports = router