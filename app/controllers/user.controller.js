const db = require("../models");
const Item = db.item;
const User = db.user;
const Cart = db.cart;
const mongoose = require("mongoose");

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.items = (req, res) => {
  console.log(res.locals.user);
  Item.find()
    .then((items) => res.json({ username: res.locals.user, data: items }))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
};

exports.adminBoard = (req, res) => {
  console.log(res.locals.user);
  res.status(200).send("Admin Content.");
};

exports.sellerBoard = (req, res) => {
  console.log(res.locals.user);
  res.status(200).send("seller Content.");
};

exports.deleteUser = (req, res) => {
  console.log(res.locals.user);
  User.find({ username: req.params.name }).then((user) => {
    console.log(user[0].roles);
    if (user[0].roles.includes("62aea54c31906c56647f18a2") || user[0].roles.includes("62b83eed3dec621960d8c735")) {
      console.log("found");
      User.findOneAndDelete({ username: req.params.name }).then(() => {
        res.send(`${req.params.name} has been deleted !`);
      });
    } else {
      console.log("not an user");
      res.send(`${req.params.name} is an admin account!`);
    }
  });
};

// Adding a new Product with seller information
// Only seller can add products
exports.addProduct = (req, res) => {
  const newProduct = new Item({
    product_id: req.body.product_id,
    product_seller: res.locals.user,
    product_name: req.body.product_name,
    product_img: req.body.product_img,
    product_desc: req.body.product_desc,
    product_reviews: [req.body.product_reviews],
    product_price: req.body.product_price,
  })
    .save()
    .then((item) => {
      console.log(item);
      res.json(item);
    })
    .catch((error) => res.status(400).json("Error : ", error));
};

// Removing a product
// Only seller can remove a product
exports.removeProduct = (req, res) => {
  Item.findOneAndDelete({ product_id: req.params.id })
    .then((item) => {
      console.log(item);
      res.json(`Item with item id ` + req.params.id);
    })
    .catch((error) => res.status(400).json(error));
};

// Find a single product - for individual product page
exports.product = (req, res) => {
  Item.findOne({ product_id: req.params.id })
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      console.log(error);
    });
};
// Update an item in the products list
// Can only be done by seller
exports.updateItem = (req, res) => {
  const id = req.params.id;
  const updatedItem = {
    product_id: req.body.product_id,
    product_seller: res.locals.user,
    product_name: req.body.product_name,
    product_img: req.body.product_img,
    product_desc: req.body.product_desc,
    product_reviews: [req.body.product_reviews],
    product_price: req.body.product_price,
  };
  Item.findOneAndUpdate({ product_id: id }, { $set: updatedItem }, (req, res, err) => {
    if (!err) console.log("item updated");
    else console.log(err);
  });
  res.send(`Item with product-id ${req.params.id} has been updated`);
};

// add item to cart
// can only be done by user
exports.addToCart = (req, res) => {
  console.log(req.params.id);
  const paramArr = req.params.id.split(",");
  for (var i in paramArr) {
    Item.find({ product_id: paramArr[i] }).then((item) => {
      console.log(res.locals.user);
      var new_id = Math.floor(100000 + Math.random() * 900000);

      const newItem = new Cart({
        order_id: new_id,
        buyer_name: res.locals.user,
        products: [
          {
            product_id: item[0].product_id,
            product_seller: item[0].product_seller,
            product_name: item[0].product_name,
            product_price: item[0].product_price,
            product_quantity: req.params.quantity,
          },
        ],
      })
        .save()
        .then(() => res.json("Item added to cart"))
        .catch((error) => res.status(400));
    });
  }
};

// delete order
// done by user
exports.removeFromCart = (req, res) => {
  Cart.findOneAndDelete({ order_id: req.params.id })
    .then((item) => {
      console.log(item);
      res.json(`Order with order id ` + req.params.id);
    })
    .catch((error) => res.status(400).json(error));
};
