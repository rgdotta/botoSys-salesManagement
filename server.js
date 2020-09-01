require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require("path");

//API routes
const routes = require("./lib/routes/index");

//Express config
const app = express(),
  port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve("./public")));

//Mongoose Connect
mongoose.connect("mongodb://localhost:27017/gtsys", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

// app.use("/api/test", test);
app.use("/api/products", routes.products);
app.use("/api/clients", routes.clients);

//Listen to port
app.listen(port, () => {
  console.log("Server started on port 9000");
});
