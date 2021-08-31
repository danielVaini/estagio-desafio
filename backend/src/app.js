// Loading the modules
  const express = require('express')
  const app = express()
  const mongoose = require('mongoose')
  const events = require('./routes/events')
  const user = require('./routes/user')
// Moongose
  mongoose.connect("mongodb://localhost/estagio").then(() => {
    console.log('Server connected')
  }).catch((error) => {
    console.log(error)

  })

  mongoose.Promise = global.Promise
  app.use(express.json())
  app.use(events)
  app.use(user)

  const PORT = 3333;

  app.listen(PORT, () => {
    console.log(`Server initialized in port ${PORT}`)
  })