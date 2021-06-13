//Import the mongoose module
const mongoose = require('mongoose');

//Schema defination for supplier
const supplierSchema = mongoose.Schema({
  supplierID: {type: String , require:true},
  name: {type: String , require:true},
  email: {type: String , require:true},
  contact: {type: String , require:true},
  drugsAvailable: {type: String , require:true}
})

//Export the mongoose schema
module.exports = mongoose.model('Supplier',supplierSchema);
