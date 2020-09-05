const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router
  .route("/")
  .get(controller.findAll)
  .post(controller.createOne)
  .delete(controller.deleteOne)
  .put(controller.putOne);

module.exports = router;
