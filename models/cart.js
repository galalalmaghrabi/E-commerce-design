const mongoose = require("mongoose");
const DB = 'mongodb+srv://galal:galal@cluster0.re9baxg.mongodb.net/?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
  name: String,
  image: String,
  price: String,
  amount: String,
  productId: String,
  userId: String,
  timestamp: Date,
});
const cartItem = mongoose.model("cart", cartSchema);

exports.addCartItem = (data)=>{
  return new Promise((resolve, reject)=>{
      mongoose.connect(DB).then(()=>{
          let item = new cartItem(data)
          item.save()
          resolve()
      }).catch(err=>{
          reject(err)
      })
  })
}
exports.getCartItem = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        return cartItem.find({ userId: userId });
      })
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        reject(err)
        console.log(err);
      });
  });
};
exports.deleteItem = (itemId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        cartItem.deleteOne({ _id: itemId }).then(() => {
          resolve();
        });
      })
      .catch((err) => {
        reject("error");
      });
  });
};
exports.deleteAll = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB)
      .then(() => {
        cartItem.deleteMany({ userId: userId }).then(() => {
          resolve(true);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};