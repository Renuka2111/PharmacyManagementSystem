var express = require('express');
var router = express.Router();

const { response } = require('../../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}
var docOrder_api=axios.create({
    baseURL: 'http://localhost:3001/api' 
})

//------------------Orders-----------------
router.post('/', function(req, res, next) {
    docOrder_api.post('/doctorOrder', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.delete('/:id', function(req, res, next) {
    docOrder_api.delete('/doctorOrder/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.get('/', function(req, res, next) {
    docOrder_api.get('/doctorOrder', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
  
module.exports = router;