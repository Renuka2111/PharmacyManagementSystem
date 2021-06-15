var express = require('express');
var router = express.Router();

const { response } = require('../../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}
var verifieddocOrder_api=axios.create({
    baseURL: 'http://localhost:3001/api' 
})

//------------------VerifiedOrders-----------------
router.post('/', function(req, res, next) {
    verifieddocOrder_api.post('/verifiedDoctorOrder', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.delete('/:id', function(req, res, next) {
    verifieddocOrder_api.delete('/verifiedDoctorOrder/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.get('/', function(req, res, next) {
    verifieddocOrder_api.get('/verifiedDoctorOrder', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
  
module.exports = router;