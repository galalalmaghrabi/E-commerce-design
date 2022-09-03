var express = require('express');
var router = express.Router();
const {getPage } = require('../controller/index.controller')
/* GET home page. */
router.get('/', getPage);

module.exports = router;
