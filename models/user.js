// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;



const mongoose = require('mongoose');

// Define the Food schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Define the User schema with an embedded pantry (foodSchema)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pantry: [foodSchema]  // Array of food items embedded within the User schema
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
