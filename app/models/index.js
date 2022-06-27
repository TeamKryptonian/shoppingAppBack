const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.item = require("./item.model");
db.cart = require("./cart.model");
db.ROLES = ["user", "admin", "seller"];

module.exports = db;
