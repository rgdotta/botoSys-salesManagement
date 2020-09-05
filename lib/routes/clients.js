const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientController");

router.route("/").get(controller.findAll).post(controller.createOne);
// .delete(controller.deleteOne)
// .put(controller.putOne);

module.exports = router;
