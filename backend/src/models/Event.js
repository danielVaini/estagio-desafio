const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Event = new Schema({
  desc: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

mongoose.model('events', Event)