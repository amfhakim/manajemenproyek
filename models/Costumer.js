const { model, Schema } = require("mongoose");

const costumerSchema = new Schema({
  nama: String,
  alamat: String,
  noktp: String,
  notlp: String,
  email: String,
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Costumer", costumerSchema);
