var express =require('express');
var router= express.Router();

const {response}= require('../../app');
const axios =require('axios');

module.exports=(baseURL)=>{
    return axios.create({
        baseURL:baseURL,
    });
}
var inventory_api=axios.create({
     baseURL:'http://localhost:3002/api'
})

//--------------Inventory---------------
router.post('/', function(req, res, next) {
    inventory_api.post('/inventory', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.put('/:id', function(req, res, next) {
    inventory_api.put('/inventory/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
  });
router.delete('/:id', function(req, res, next) {
    inventory_api.delete('/inventory/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.get('/', function(req, res, next) {
    inventory_api.get('/inventory', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.get('/:id', function(req, res, next) {
    inventory_api.get('/inventory/:id', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});

  
module.exports = router;
