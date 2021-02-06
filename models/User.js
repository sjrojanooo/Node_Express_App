const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Our model schema that states two fields name and email in the form of strings
const UserSchema = new Schema({
  name: String,
  email: String
})

// represents how we create the a model
const User = mongoose.model('User', UserSchema)
module.exports = User
