const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  cpf: Number,
  adress: String,
  city: String,
  state: String,
  sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
});

module.exports = Client = mongoose.model("Client", clientSchema);
