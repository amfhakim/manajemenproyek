const Costumer = require("../../models/Costumer");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError, UserInputError } = require("apollo-server-errors");
const { validateCostumerInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getCostumers() {
      try {
        const costumers = await Costumer.find().sort({ createdAt: -1 });
        return costumers;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getCostumer(_, { costumerId }) {
      try {
        const costumer = await Costumer.findById(costumerId);
        if (costumer) {
          return costumer;
        } else {
          throw new Error("Costumer not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createCostumer(
      _,
      { costumerInput: { nama, alamat, noktp, notlp, email } },
      context
    ) {
      const user = checkAuth(context);
      const { valid, errors } = validateCostumerInput(
        nama,
        alamat,
        noktp,
        notlp,
        email
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const costumer = await Costumer.findOne({ noktp });
      if (costumer) {
        throw new UserInputError("nomor KTP sudah ada", {
          errors: {
            costumer: "nomorKTP sudah ada",
          },
        });
      }

      const newCostumer = new Costumer({
        nama,
        alamat,
        noktp,
        notlp,
        email,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const result = await newCostumer.save();
      return {
        ...result._doc,
        id: result._id,
      };
    },

    async deleteCostumer(_, { costumerId }, context) {
      const user = checkAuth(context);
      try {
        const costumer = await Costumer.findById(costumerId);
        if (user.username === costumer.username) {
          await costumer.delete();
          return "data costumer berhasil dihapus";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
