import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  email:{
    type: String,
    default: 'new user'
  },
  token:{
    type: String,
    default: 'none'
  }
});

export default mongoose.model('Session', Schema);