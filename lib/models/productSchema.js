const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: String,
  code: Array,
  name: String,
  photoURL: String,
  stock: Number,
  psv: mongoose.Types.Decimal128,
  dimensions: {
    height: Number,
    length: Number,
    width: Number,
  },
  weight: mongoose.Types.Decimal128,
});

module.exports = Product = mongoose.model("Product", productSchema);
