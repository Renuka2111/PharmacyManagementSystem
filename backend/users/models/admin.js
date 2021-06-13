//Import the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Schema defination for adminUser
const adminSchema = mongoose.Schema({
  name: {type: String , require:true},
  contact: {type: String , require:true},
  email: {type: String , require:true, unique:true} ,
  password: {type: String , require:true},
});

//Apply the uniqueValidator plugin to adminSchema
adminSchema.plugin(uniqueValidator);

//Export the mongoose schema
module.exports = mongoose.model('Admin',adminSchema);
