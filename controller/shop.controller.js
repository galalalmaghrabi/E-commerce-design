const product = require('../models/product')
exports.getPageShop = (req, res, next) => {
  product.getAllProducts(req.query.page).then((products) => {
    res.render('shop', {
      title: 'Almaghrabi-login', products: products,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin
    });
  }).catch(err => {
    console.log(err)
    res.redirect('/shop?page=1')
  })
}
exports.getProduct = (req, res) => {
  id = req.params.id;
  product.getProduct(id)
    .then((product) => {
      res.render("product", {
        product: product, title: "productDetails",
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteProduct = (req,res,next)=>{
  product.deleteProduct(req.body.productId).then(()=>res.redirect('/')).catch(err=>console.log(err))
}