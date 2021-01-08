const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNum: Number,
  client: Array,
  created_at: Date,
  products: Array,
  aditionalPrice: {
    install: mongoose.Types.Decimal128,
    others: mongoose.Types.Decimal128,
  },
  ledColor: String,
  finishingColor: String,
  seatFabric: String,
  seam: String,
  observation: String,
  totalWeight: mongoose.Types.Decimal128,
  paymentOptions: Array,
  totalValue: mongoose.Types.Decimal128,
  discount: Number,
  finalValue: mongoose.Types.Decimal128,
});

module.exports = Order = mongoose.model("Order", orderSchema);
