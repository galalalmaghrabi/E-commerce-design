var express = require('express');
var router = express.Router();
let multer = require('multer')
const adminGuard = require('./guards/admin.guard')
const {getAdminPage,addProduct} = require('../controller/admin.controller')

router.get('/admin',adminGuard ,getAdminPage)
router.post('/admin',adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
}).single("image"),addProduct)
module.exports = router;
