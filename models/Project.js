const { model, Schema } = require("mongoose");

const projectSchema = new Schema({
  nama: String,
  alamat: String,
  budget: String,
  startAt: String,
  endAt: String,
  progres: String,
  absensi: [
    {
      tanggal: String,
      namaWorkers: [String],
      status: [String],
    },
  ],
  pekerjaans: [
    {
      nama: String,
      pj: String,
      startAt: String,
      endAt: String,
      progres: String,
      materials: [
        {
          nama: String,
          jenis: String,
          jumlah: String,
          satuan: String,
          harga: String,
          totalHarga: String,
          createdAt: String,
          username: String,
        },
      ],
      tools: [
        {
          nama: String,
          jumlah: String,
          hargaSewa: String,
          totalHarga: String,
          createdAt: String,
          username: String,
        },
      ],
      createdAt: String,
      username: String,
    },
  ],
  namaWorkers: [String],
  workers: [
    {
      type: Schema.Types.ObjectId,
      ref: "workers",
    },
  ],
  namaCostumer: String,
  costumer: {
    type: Schema.Types.ObjectId,
    ref: "costumers",
  },
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Project", projectSchema);
