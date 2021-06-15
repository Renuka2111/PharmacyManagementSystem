var express =require('express');
var router= express.Router();

const {response}= require('../../app');
const axios =require('axios');

module.exports=(baseURL)=>{
    return axios.create({
        baseURL:baseURL,
    });
}
 var users_api=axios.create({
     baseURL:'http://localhost:3000/api'
 })
//==========Users=Admins==========
router.post('/signup', function(req, res, next) {
    users_api.post('/admin/signup', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.post('/login', function(req, res, next) {
    users_api.post('/admin/login', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.delete('/:id', function(req, res, next) {
    users_api.delete('/admin/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.get('/getUserData', function(req, res, next) {
  users_api.get('/admin/getUserData', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.get('/:id', function(req, res, next) {
  users_api.get('/admin/:id', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.put('/:id', function(req, res, next) {
  users_api.put('/admin/:id', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
  
module.exports = router;