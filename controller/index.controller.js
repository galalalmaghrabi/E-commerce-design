const {getAllProducts} = require('../models/product')
exports.getPage = (req, res, next) =>{
    getAllProducts(1).then((items)=>{
        res.render('index', {
            title: 'Almaghrabi-shop',
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            items:items
          });
    }).catch(err=>{
        console.log(err)
    })


  }