var express = require('express');
var router = express.Router();

const { response } = require('../../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}
var pickedUpOrder_api=axios.create({
    baseURL: 'http://localhost:3001/api' 
})

//--------------PickedUpOrders-----------------
router.post('/', function(req, res, next) {
    pickedUpOrder_api.post('/pickedUpOrders', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});

router.get('/', function(req, res, next) {
    pickedUpOrder_api.get('/pickedUpOrders', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
  
module.exports = router;