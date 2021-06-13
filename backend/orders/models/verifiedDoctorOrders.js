//Import the mongoose module
const mongoose = require('mongoose');

//Schema defination for verifieddoctorOrder
const verifiedDoctorOrderSchema = mongoose.Schema({
  doctorName: {type: String , require:true},
  doctorContact: {type: String , require:true},
  doctorEmail: {type: String , require:true},
  drugNames : { type: Array , require: true},
  drugPrice: {type: Array , require:true},
  drugQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true}
})

//Export the mongoose schema
module.exports = mongoose.model('VerifiedDoctorOrder',verifiedDoctorOrderSchema);
