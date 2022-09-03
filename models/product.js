const mongoose = require("mongoose");
const { resolve } = require("path");
const { disconnect } = require("process");
const DB = 'mongodb+srv://galal:galal@cluster0.re9baxg.mongodb.net/?retryWrites=true&w=majority'
const productSchema = mongoose.Schema({
  name: String,
  price: String,
  category: String,
  desc: String,
  image: String
});
const Product = mongoose.model("product", productSchema);

exports.getAllProducts = (page) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB)
        .then(() => {
          let pages = page || 1
          return Product.find({}).skip((pages - 1) * 6).limit(6);
        })
        .then((products) => {
          mongoose.disconnect();
          resolve(products);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject()
        });
    });
};

exports.getAllProductsByCategory = category => {
return new Promise((resolve, reject) => {
    mongoose
    .connect(DB)
    .then(() => {
        return Product.find({category:category});
    })
    .then((products) => {
        mongoose.disconnect();
        resolve(products);
    })
    .catch((err) => {
        mongoose.disconnect();
        
    });
});
};

exports.getProduct = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB)
        .then(() => {
          return Product.findById(id);
        })
        .then((product) => {
          mongoose.disconnect();
          resolve(product);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject("error to find product");
        });
    });
};

exports.addProduct = (data) => {
    return new Promise ((resolve,reject) => {
        mongoose.connect(DB).then(()=>{
            let product = new Product(data)
            product.save().then(()=>{
                resolve()
            }).catch(err=>{
                console.log(err)
                reject()
            })
        })
    })
}


  exports.deleteProduct = id => {
    return new Promise((resolve,reject)=>{
      mongoose.connect(DB).then(()=>{
        Product.findByIdAndDelete(id).then(()=>{
          resolve()
        }).catch(err=>{
          reject(err)
        })
      })
    })
  }