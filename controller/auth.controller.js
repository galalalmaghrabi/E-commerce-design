const authModel = require('../models/auth')
exports.getLoginPage = (req,res,next)=>{
    res.render('login', { title: 'Almaghrabi-login',
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin  });
}
exports.postLoginAccount = (req, res, next) => {
    authModel.loginUser(req.body.email, req.body.password)
        .then((resualt) => {
            req.session.userId = resualt.id
            req.session.isAdmin = resualt.isAdmin
            res.redirect("/");
        })
        .catch((err) => {
            req.flash("authError", err);
            res.redirect("/login");
        });
}
exports.getRegisterPage = (req,res,next)=>{
    res.render('register', { title: 'Almaghrabi-login',
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin });
}
exports.postCreateAccount = (req, res, next) => {
    authModel.createUser(res,req.body).then(()=>{
        res.redirect('/login')
    }
    ).catch(err =>{
        req.flash("registerError", err);
        res.redirect("/register")
    }
    )
}

exports.verify = (req, res, next) => {
    authModel.verify(req.params.id).then(()=>{
        res.redirect('/login')
    }).catch(err => res.redirect('/register'))
}
exports.logout = (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  };