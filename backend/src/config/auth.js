const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User model
require('../models/User')
const User = mongoose.model('users')

module.exports = function(passport){
  passport.use(new LocalStrategy(({usernameField: 'email', passwordField: 'password'}),
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      
      bcrypt.compare(password, user.password, (error, success) => {
        if(success){
          return done(null, user)
        }else {
          return done(null, false, "Senha incorreta")
        }
      })

    
    });
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, usuario) => {
    done(err, usuario);
  });
});

}
