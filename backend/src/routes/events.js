const mongoose = require('mongoose');
const express = require('express');
require('../models/Event');
const Event = mongoose.model('events')

const router = express.Router();

router.get('/events', (req, res) => {
  Event.find().lean().then(result => res.send(result))
})

router.post('/events/add', (req, res) => {
  const newEvent = { 
    desc: req.body.desc,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  }

  Event.find({desc: newEvent.desc}).then(result => {
    if(result){
      res.send("Dois eventos com o mesmo nome").status(300)
    }else {
      new Event(newEvent).save().then((result) => {
        console.log('Event registred')
        return res.send(result).status(201)
      }).catch((error) => {
        console.log("Error")
      })
    }
  }).catch(error => res.send(error))

})

router.post('/events/edit', (req, res) => {
  Event.findOne({_id: req.body.id}).then((event) => {
    event.desc = req.body.desc || event.desc
    event.start_time = req.body.start_time || event.start_time
    event.end_time = req.body.end_time || event.end_time

    event.save().then(result => {
      res.send(result).status(201)
    }).catch(error => res.send(error))
  }).catch(error => res.send(error))
})

router.get('/events/remove/:id', (req, res) => {
  Event.remove({_id: req.params.id}).then(() => {
    res.send("Removing").status(200)
    res.redirect('/events')
  })
})

module.exports = router