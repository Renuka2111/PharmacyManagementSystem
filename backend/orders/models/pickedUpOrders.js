//Import the mongoose module
const mongoose = require('mongoose');

//Schema defination for pickedUpOrder
const pickedUPDoctorOrderSchema = mongoose.Schema({
  doctorName: {type: String , require:true},
  doctorContact: {type: String , require:true},
  doctorEmail: {type: String , require:true},
  drugNames : { type: Array , require: true},
  drugPrice: {type: Array , require:true},
  drugQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true},
  dateTime: {type: Date, default: Date.now , require:true}
})

//Export the mongoose schema
module.exports = mongoose.model('PickedUpDoctorOrder',pickedUPDoctorOrderSchema);
