const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientController");

router.route("/").get(controller.findAll).post(controller.createOne);
// .delete(controller.deleteOne)
// .patch(controller.patchOne);

module.exports = router;
