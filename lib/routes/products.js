const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router
  .route("/")
  .get(controller.findAll)
  .post(controller.createOne)
  .delete(controller.deleteOne)
  .patch(controller.patchOne);

module.exports = router;
