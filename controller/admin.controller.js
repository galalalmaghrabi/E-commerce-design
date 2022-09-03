const product = require("../models/product");



exports.getAdminPage = (req, res, next) => {
    res.render('admin', {
        title: "Almaghraby-Admin", isUser: req.session.userId,
        isAdmin: req.session.isAdmin
    });
};
exports.addProduct = (req, res, next) => {
    req.body.image = req.file.filename
    product.addProduct(req.body).then(() => {
        res.redirect('/')
    }).catch(err => res.redirect('/admin'))
}
