const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const Product = require("../models/productSchema");

router.route("/").get(controller.findAll).post(controller.createOne);

module.exports = router;
