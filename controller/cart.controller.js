const cartModel = require("../models/cart");
const validationResualt = require('express-validator').validationResult


exports.getItems = (req, res, next) => {
  cartModel
    .getCartItem(req.session.userId)
    .then((items) => {
      res.render("cart", {
        title: "Almaghrabi-cart",
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        items: items,
      });
    })
    .catch((err) => console.log(err));
};

exports.addItem = (req, res, next) => {
  if(validationResualt(req).isEmpty()){
    cartModel
    .addCartItem(
      {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        timestamp: Date.now(),
      },
      req.body.productId,
      req.session.userId
    )
    .then(() => {
      res.redirect("/shop");
    })
    .catch((err) => {
      res.redirect("/");
      console.log(err);
    });
  }else{
    req.flash('validationResualt',validationResualt(req).array()[0])
    res.redirect('/')
  }

};
exports.deleteItem = (req, res, next) => {
  console.log(req.body.itemId);
  cartModel
    .deleteItem(req.body.itemId)
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
};
exports.deleteAll = (req, res, next) => {
  cartModel
    .deleteAll(req.session.userId)
    .then((items) => {
      console.log(true);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};