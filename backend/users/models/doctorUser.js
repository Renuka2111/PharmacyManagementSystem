//Import the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Schema defination for doctorUser
const doctorUserSchema = mongoose.Schema({
  name: {type: String , require:true},
  contact: {type: String , require:true},
  email: {type: String , require:true, unique:true} ,
  password: {type: String , require:true}
});

//Apply the uniqueValidator plugin to doctorSchema
doctorUserSchema.plugin(uniqueValidator);

//Export the mongoose schema
module.exports = mongoose.model('DoctorUser',doctorUserSchema);
