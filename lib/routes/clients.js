const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientController");

router
  .route("/")
  .get(controller.findAll)
  .post(controller.createOne)
  .delete(controller.deleteOne)
  .put(controller.putOne);

router.get("/findBirthdays", controller.findBirthdays);

module.exports = router;
