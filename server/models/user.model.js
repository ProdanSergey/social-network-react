import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  firstName: String,
  secondName: String,
  dateOfBirth: String
});
export default mongoose.model('User', Schema);