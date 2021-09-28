const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { Error } = require("mongoose");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError("error", { errors });
      }
      if (!user) {
        errors.general = "user not found";
        throw new UserInputError("user not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      {
        registerInput: {
          username,
          email,
          password,
          confirmPassword,
          nama,
          jabatan,
          notlp,
          noktp,
          alamat,
        },
      }
    ) {
      // sebenarnya ada parent, args, dst. tapi disini gak dpake parent

      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
        nama,
        jabatan,
        notlp,
        noktp,
        alamat
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        nama,
        jabatan,
        notlp,
        noktp,
        alamat,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();

      const token = generateToken(newUser);

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },

    async deleteUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        await user.delete();
        return "user deleted succesfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
