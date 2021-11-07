const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  matchfor: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  maritalstatus: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  timeofbirth: {
    type: String
  },
  placeofbirth: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('profile', ProfileSchema);