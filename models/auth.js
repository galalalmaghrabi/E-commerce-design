const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DB = 'mongodb+srv://galal:galal@cluster0.re9baxg.mongodb.net/?retryWrites=true&w=majority'
const { verify } = require('../controller/nodemailer')

const userSchema = mongoose.Schema({

  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  verify: {
    type: Boolean,
    default: false
  }
});
const User = mongoose.model("User", userSchema);

// create account
exports.createUser = (res,data) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB).then(() => {
      User.findOne({ email: data.email }).then(user => {
        if (user) {
          reject("user is already exist")
        } else {
          if (data.password !== data.rePassword) {
            reject("password now match")
          } else {
            bcrypt.hash(data.password, 10).then((passwordHashed) => {
              const user = new User({
                email: data.email,
                password: passwordHashed
              })
              user.save()
              verify(data.email, user._id)
              resolve()
            })
          }
        }
      })
    })
  })
};

exports.loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("user not exist");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("Wrong password");
            } else {
              if (user.verify === false) {
                reject("please check your email")
              } else {
                mongoose.disconnect();
                resolve({
                  id: user._id,
                  isAdmin: user.isAdmin
                })
              }
            }
          });
        }
      }).catch(err => {
        reject(err)
      })
  });
};

exports.verify = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(DB).then(() => {
        User.findById(id).then((user) => {
          if (!user) {
            reject("user not exist")
          } else {
            user.verify = true
            user.save()
            resolve()
          }
        })
      })
    })
  }