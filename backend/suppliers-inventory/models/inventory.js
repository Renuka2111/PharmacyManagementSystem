//Import the mongoose module
const mongoose = require('mongoose');

//Schema defination for inventory
const inventorySchema = mongoose.Schema({
  email: {type: String , require:true},
  name: {type: String , require:true},
  quantity: {type: String , require:true},
  batchId: {type: String , require:true},
  expireDate: {type: Date , require:true},
  price: {type: String , require:true}
})

//Export the mongoose schema
module.exports = mongoose.model('Inventory',inventorySchema);
