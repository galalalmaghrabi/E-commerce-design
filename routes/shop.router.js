var express = require('express');
var router = express.Router();
const adminGuard = require('./guards/admin.guard')

const { getPageShop,getProduct ,deleteProduct} = require('../controller/shop.controller')
router.get('/shop',getPageShop)
router.get('/:id',getProduct)
router.post('/delete/product',adminGuard,deleteProduct)

module.exports = router;
