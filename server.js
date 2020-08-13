require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path")

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

mongoose.connect("mongodb://localhost:27017/gtsys", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const product = require("./lib/routes/products")
app.use("/", product);

app.listen(port, () => {
  console.log("Server started on port 3000");
});
