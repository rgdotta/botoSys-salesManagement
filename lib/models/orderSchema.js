const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNum: Number,
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  created_at: Date,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  aditionalPrice: mongoose.Types.Decimal128,
  ledColor: String,
  finishingColor: String,
  seatFabric: String,
  seam: String,
  observation: String,
  totalWeight: mongoose.Types.Decimal128,
  totalValue: mongoose.Types.Decimal128,
  discount: Number,
  finalValue: mongoose.Types.Decimal128,
});

module.exports = Order = mongoose.model("Order", orderSchema);
