const express = require("express");
const mongoose = require("mongoose");

require("../models/Event");
const Event = mongoose.model("events");

const router = express.Router();

router.get("/events",  (req, res) => {
  Event.find()
    .lean()
    .then((result) => res.send(result));
});

router.post("/events/add", (req, res) => {
  const newEvent = {
    desc: req.body.desc,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    date: req.body.date,
  };

  Event.findOne({ desc: newEvent.desc })
    .lean()
    .then((result) => {
      if (result) {
        res.send(new Error()).status(400);
      } else {
        new Event(newEvent)
          .save()
          .then((result) => {
            console.log("Event registred");
            res.send(result).status(201);
          })
          .catch((error) => {
            console.log("Error");
          });
      }
    })
    .catch((error) => res.send(error));
});

router.put("/events/edit", (req, res) => {
  
  Event.findById(req.body.id).then(event => {
    event.desc = req.body.desc
    event.start_time = req.body.start_time
    event.end_time = req.body.end_time
    event.date = req.body.date
    event.save()
    res.send(event).status(200)
  }).catch(error => res.send(error))
 

  
 
});

router.get("/events/remove/:id", (req, res) => {
  Event.remove({ _id: req.params.id }).then(() => {
    res.send("Removing").status(200);
    res.redirect("/events");
  });
});

router.get("/events/:id", (req, res) => {
  const { id } = req.params;
  Event.find({ _id: id.replace(":", "") })
    .then((result) => {
    
      res.send(result);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
