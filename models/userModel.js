const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
    unique: true,
  },
  Password: {
    type: String,
    required: [true, "Please enter your password"],
    // minlength: [6, 'Minimum password length is 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const User = mongoose.model('Students', userSchema);
module.exports = User;