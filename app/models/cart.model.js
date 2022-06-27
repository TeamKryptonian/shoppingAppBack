const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    order_id: Number,
    buyer_name: String,
    products: [
      {
        product_id: Number,
        product_seller: String,
        product_name: String,
        product_price: Number,
        product_quantity: Number,
      },
    ],
  })
);

module.exports = Cart;
