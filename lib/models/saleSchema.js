const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  client: {type: Schema.Type.ObjectId, ref: 'Client'},
  date: String,
  products:[{type: Schema.Type.ObjectId, ref: 'Product'}],
  pricePerProduct: [mongoose.Types.Decimal128],
  color: String,
  ledColor: String,
  finishingColor: String,
  totalValue: mongoose.Types.Decimal128,
  discount: Number,
  finalValue: mongoose.Types.Decimal128,
});

module.exports = Sale = mongoose.model("Sale", saleSchema);
