const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  nama: String,
  jabatan: String,
  notlp: String,
  noktp: String,
  alamat: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
