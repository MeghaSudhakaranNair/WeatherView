const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema,'userauth');

module.exports = User;



