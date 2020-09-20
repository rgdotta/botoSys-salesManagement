require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require("path"),
  compression = require("compression"),
  helmet = require("helmet"),
  morgan = require("morgan"),
  mongoSanitize = require("express-mongo-sanitize");

//Express config
const app = express(),
  port = process.env.PORT || 9000;

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve("./public")));
app.use(compression());
app.use(helmet());
app.use(morgan("tiny"));
app.use(mongoSanitize());

//Mongoose Connect
mongoose.connect("mongodb://localhost:27017/gtsys", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

//API routes
const routes = require("./lib/routes/index");

app.use("/api/products", routes.products);
app.use("/api/clients", routes.clients);
app.use("/api/orders", routes.orders);

//Listen to port
app.listen(port, () => {
  console.log("Server started on port 9000");
});
