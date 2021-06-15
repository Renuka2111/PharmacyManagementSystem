var express =require('express');
var router= express.Router();

const {response}= require('../../app');
const axios =require('axios');

module.exports=(baseURL)=>{
    return axios.create({
        baseURL:baseURL,
    });
}
 var doctorusers_api=axios.create({
     baseURL:'http://localhost:3000/api'
 })
//==========Users=Admins==========
router.post('/doctorSignup', function(req, res, next) {
  doctorusers_api.post('/doctorUser/doctorSignup', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.post('/doctorLogin', function(req, res, next) {
  doctorusers_api.post('/doctorUser/doctorLogin', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.delete('/:id', function(req, res, next) {
  doctorusers_api.delete('/doctorUser/:id', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});
router.get('/getDoctorUserData', function(req, res, next) {
  doctorusers_api.get('/doctorUser/getDoctorUserData', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.get('/:id', function(req, res, next) {
  doctorusers_api.get('/doctorUser/:id', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
router.put('/:id', function(req, res, next) {
  doctorusers_api.put('/doctorUser/:id', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
  
module.exports = router;