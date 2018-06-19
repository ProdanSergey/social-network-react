import mongoose from 'mongoose';

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
  }
});

export default mongoose.model('User', Schema);