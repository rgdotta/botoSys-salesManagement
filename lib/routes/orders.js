const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router
  .route("/")
  .get(controller.findAll)
  .post(controller.createOne)
  .delete(controller.deleteOne);

router.get("/findLast", controller.findLast);
router.get("/findToList", controller.findToList);
router.get("/findById", controller.findById);

module.exports = router;
