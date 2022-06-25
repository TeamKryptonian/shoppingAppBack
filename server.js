const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 3005;

// Server configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
const url = "mongodb://localhost:27017/ShoppingService";
mongoose.connect(url, { useNewUrlParser: true });

// Data Schema
const itemSchema = {
  product_id: Number,
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
};

// Data model
const Item = mongoose.model("Item", itemSchema);

// Read route
app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
});

// Single Product
app.get("/items/:id", (req, res) => {
  Item.find({ product_id: req.params.id })
    .then((items) => res.json(items))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
});

// create route
app.post("/newitem", (req, res) => {
  const newItem = new Item({
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_img: req.body.product_img,
    product_desc: req.body.product_desc,
    product_reviews: req.body.product_reviews,
    product_price: req.body.product_price,
  });
  newItem
    .save()
    .then((item) => {
      console.log(item);
      res.json("product sent");
    })
    .catch((error) => res.sendStatus(400).json("Error : ", error));
});

// delete route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) console.log("Item deleted");
    else console.log(err);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
