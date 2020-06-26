var express = require('express');
var router = express.Router();
const {handleRequest} = require('../services/requestHandler.service');

router.post('/', function(req, res, next) {
    handleRequest(req.body);
    res.send({})
});

module.exports = router;
