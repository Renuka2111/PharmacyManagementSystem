var express =require('express');
var router= express.Router();

const {response}= require('../../app');
const axios =require('axios');

module.exports=(baseURL)=>{
    return axios.create({
        baseURL:baseURL,
    });
}
var supplier_api=axios.create({
     baseURL:'http://localhost:3002/api'
})

//--------------Supplier---------------
router.post('/', function(req, res, next) {
    supplier_api.post('/supplier', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.put('/:id', function(req, res, next) {
    supplier_api.put('/supplier/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  });
router.delete('/:id', function(req, res, next) {
    supplier_api.delete('/supplier/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.get('/', function(req, res, next) {
    supplier_api.get('/supplier', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.get('/:id', function(req, res, next) {
    supplier_api.get('/supplier/:id', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
  
module.exports = router;
