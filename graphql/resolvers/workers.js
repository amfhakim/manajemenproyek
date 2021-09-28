const Worker = require("../../models/Worker");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const { validateWorkerInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getWorkers() {
      try {
        const workers = await Worker.find().sort({ createdAt: -1 });
        return workers;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getWorker(_, { workerId }) {
      try {
        const worker = await Worker.findById(workerId);
        if (worker) {
          return worker;
        } else {
          throw new Error("Worker not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createWorker(
      _,
      { workerInput: { nama, alamat, noktp, notlp, email, jabatan, gaji } },
      context
    ) {
      const user = checkAuth(context);
      const { valid, errors } = validateWorkerInput(
        nama,
        alamat,
        noktp,
        notlp,
        email,
        jabatan,
        gaji
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const worker = await Worker.findOne({ noktp });
      if (worker) {
        throw new UserInputError("nomor KTP sudah ada", {
          errors: {
            username: "nomorKTP sudah ada",
          },
        });
      }

      const newWorker = new Worker({
        nama,
        alamat,
        noktp,
        notlp,
        email,
        jabatan,
        gaji,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      await newWorker.save();
      return newWorker;
    },

    async deleteWorker(_, { workerId }, context) {
      const user = checkAuth(context);
      try {
        const worker = await Worker.findById(workerId);
        if (user.username === worker.username) {
          await worker.delete();
          return "data pekerja berhasil dihapus";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
