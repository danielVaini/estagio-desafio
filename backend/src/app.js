// Loading the modules
const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const events = require("./routes/events");
const user = require("./routes/user");
const passport = require("passport");
const session = require("express-session");
require("./config/auth")(passport);


app.use(cors())
app.use(passport.initialize());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "apsojfsdiofjdosijfdiosfjisd"
}))

// Moongose

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(events);
app.use(user);

mongoose
  .connect("mongodb://localhost/estagio")
  .then(() => {
    console.log("Server connected");
  })
  .catch((error) => {
    console.log(error);
  });
mongoose.Promise = global.Promise;


app.get('/', (req, res) => {
  res.send({msg: "Logado"})
})

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server initialized in port ${PORT}`);
});
