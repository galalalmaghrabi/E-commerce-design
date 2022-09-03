const cartController = require('../controller/cart.controller')
const router = require("express").Router()
const bodyparser = require('body-parser')
const check = require('express-validator').check
const authGaurd = require('./guards/auth.guard')
const adminGuard = require('./guards/admin.guard')

router.get('/cart',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.getItems)
router.post('/add',authGaurd.isUser, bodyparser.urlencoded({ extended: true }),
    check('amount').notEmpty().withMessage('please select amount of product').isLength({ min: 1 }).withMessage('amount must be greater than 0'),
    cartController.addItem)

router.post('/delete',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.deleteItem)
router.post('/deleteAll',authGaurd.isUser,bodyparser.urlencoded({extended:true}),cartController.deleteAll)

module.exports = router
