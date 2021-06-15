var express = require('express');
var router = express.Router();

const { response } = require('../app');
const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}

router.all('/', function(req, res, next) {
  res.render('index', { title: 'Pharmacy Management System API-GateWay' });
});

module.exports = router;