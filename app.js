var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const flash = require('connect-flash')
var cors = require('cors')


let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth.router');
let shopRouter = require('./routes/shop.router');
let adminRouter = require('./routes/admin.router');
let cartRouter = require('./routes/cart.router');

const { default: mongoose } = require('mongoose');

let app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imagesFood')));

app.use(bodyParser.urlencoded({ extended: true }))

/* =============== session & store============== */
const session = require('express-session')
const sessionStore = require("connect-mongodb-session")(session)
const store = new sessionStore({
uri:'mongodb+srv://eden:eden@cluster0.bqfktxm.mongodb.net/eden?retryWrites=true&w=majority',
collection:"sessions",
})
app.use(session({
  secret:"Almaghraby Here !!",
  saveUninitialized:false,
  store:store,
  resave:false
}))
app.use(flash())




app.use(adminRouter)
app.use("/",cartRouter)
app.use('/', indexRouter);
app.use(authRouter)
app.use(shopRouter)



// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).render("error-page",{
    isUser:req.session.userIs,
    isAdmin:req.session.isAdmin,
    title:"page not found"
  });
});

module.exports = app;
