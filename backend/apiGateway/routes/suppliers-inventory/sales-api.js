var express =require('express');
var router= express.Router();

const {response}= require('../../app');
const axios =require('axios');

module.exports=(baseURL)=>{
    return axios.create({
        baseURL:baseURL,
    });
}
var sales_api=axios.create({
     baseURL:'http://localhost:3002/api'
})

//--------------Sales---------------
router.post('/', function(req, res, next) {
    sales_api.post('/sales', req.body).then(resp => {
      res.send(resp.data)
    }).catch((err)=>{
      return res.status(err.response.status).json(err.response.data);
    })
});

router.get('/', function(req, res, next) {
    sales_api.get('/sales', req.body).then(resp => {
    res.send(resp.data)
  }).catch((err)=>{
    return res.status(err.response.status).json(err.response.data);
  })
});
  
module.exports = router;
