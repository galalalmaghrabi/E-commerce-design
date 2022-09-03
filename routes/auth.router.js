var express = require('express');
var router = express.Router();
const authGaurd = require('./guards/auth.guard')
const { getLoginPage,getRegisterPage,postCreateAccount,verify,postLoginAccount,logout} = require('../controller/auth.controller')
router.get('/login',authGaurd.notUser,getLoginPage)
router.post('/login',authGaurd.notUser,postLoginAccount)
router.get('/register',authGaurd.notUser,getRegisterPage)
router.post('/register',authGaurd.notUser,postCreateAccount)
router.get('/confirm/:email/:id',authGaurd.notUser,verify)
router.post('/confirm/:email/:id',authGaurd.notUser,verify)
router.all('/logout',authGaurd.isUser,logout)

module.exports = router;
