import mongoose from 'mongoose';

// bcrypt import
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  firstName:{
    type: String,
    default: 'new user'
  },
  middleName:{
    type: String,
    default: 'none'
  },
  lastName:{
    type: String,
    default: 'none'
  },
  age: {
    type: String,
    default: 'none'
  },
  gender: {
    type: String,
    default: 'none'
  },
  email: {
    type: String,
    default: 'none'
  },
  password: {
    type: String
  }
});

Schema.pre('save', function(next){
  var user = this; // User object

  if (!user.isModified('password')) return next(); // Document wasn't modified? Then execute next()
  
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash){
          if(err) return next(err);
          user.password = hash;
          next();
      });
  });

});

export default mongoose.model('User', Schema);