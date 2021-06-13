//Import the mongoose module
const mongoose = require('mongoose');

//Schema defination for sales
const salesSchema = mongoose.Schema({
  drugName: {type: Array, require:true},
  dateTime: {type: Date, default: Date.now , require:true},
  totalPrice: {type: String , require:true},
  paidAmount: {type: String , require:true},
  balance : { type: String , require: true}
})

//Export the mongoose schema
module.exports = mongoose.model('Sales',salesSchema);
