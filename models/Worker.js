const { model, Schema } = require("mongoose");

const workerSchema = new Schema({
  nama: String,
  alamat: String,
  noktp: String,
  notlp: String,
  email: String,
  jabatan: String,
  gaji: String,
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Worker", workerSchema);
