const mongoose = require("mongoose");

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    product_id: Number,
    product_seller: String,
    product_name: String,
    product_img: String,
    product_desc: String,
    product_reviews: [
      {
        user: String,
        review: String,
      },
    ],
    product_price: Number,
  })
);

module.exports = Item;
