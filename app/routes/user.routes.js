const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/api/noauth/products", controller.items);

  app.get("/api/products", [authJwt.verifyToken, authJwt.checkAll], controller.items);

  app.get("/api/test/seller", [authJwt.verifyToken, authJwt.isSeller], controller.sellerBoard);

  app.post("/api/seller/addProduct", [authJwt.verifyToken, authJwt.isSeller], controller.addProduct);

  app.get("/api/product/:id", [authJwt.verifyToken, authJwt.checkUser], controller.product);

  app.delete("/api/seller/removeProduct/:id", [authJwt.verifyToken, authJwt.isSeller], controller.removeProduct);

  app.patch("/api/seller/updateItem/:id", [authJwt.verifyToken, authJwt.isSeller], controller.updateItem);

  app.get("/api/test/user", [authJwt.verifyToken, authJwt.checkUser], controller.userBoard);

  app.get("/api/test/user/addToCart/:id/:quantity", [authJwt.verifyToken, authJwt.checkUser], controller.addToCart);

  app.get("/api/test/user/removeFromCart/:id", [authJwt.verifyToken, authJwt.checkUser], controller.removeFromCart);

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.get("/api/test/admin/deleteUser/:name", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

  // app.get("/api/test/admin/deleteBook/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteBook);
};
