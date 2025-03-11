const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userResolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return User.findById(user.id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      try{
         const user = await User.create({ username, email, password: hashedPassword });
         return { isRegistered: true };
      }
      catch(err){
        console.error(err);
        return { isRegistered: false };
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return { token, user };
    },
  },
};

module.exports = userResolvers;