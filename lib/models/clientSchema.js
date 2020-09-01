const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  entity: String,
  name: String,
  cpf: Number,
  contact: {
    email: String,
    cellphone: Number,
    phone: Number,
    whatsapp: Number,
  },
  adress: {
    street: String,
    stNumber: Number,
    complement: String,
    neighborhood: String,
    city: String,
    state: String,
  },
  birthday: Date,
  sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
});

module.exports = Client = mongoose.model("Client", clientSchema);
