const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: String,
  code: String,
  name: String,
  photo: String,
  amount: Number,
  psv: mongoose.Types.Decimal128,
});

module.exports = Product = mongoose.model("Product", productSchema);
