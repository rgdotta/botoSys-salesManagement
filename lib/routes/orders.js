const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router
  .route("/")
  .get(controller.findAll)
  .post(controller.createOne)
  .delete(controller.deleteOne)
  .put(controller.putOne);

router.get("/findLast", controller.findLast);

module.exports = router;
