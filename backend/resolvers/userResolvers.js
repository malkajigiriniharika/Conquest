const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.id);
    },

    getLeaderboard: async () => {
      try {
        const topUsers = await User.find({ username: { $ne: null } })
          .sort({ score: -1 }) // Sort by highest score
          .limit(5) // Get top 5 users
          .select("id name username email score time"); // Fetch required fields

        return topUsers;
      } catch (error) {
        throw new Error("Error fetching leaderboard: " + error.message);
      }
    }
  },

  Mutation: {
    register: async (_, { name, username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        score: 0
      });

      await newUser.save();
      return { isRegistered: true };
    },

    login: async (_, { email, password }) => {
      console.log("email,password  " + email + " , " + password);
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return { token, user };
    },

    updateScore: async (_, { email, score, time }) => {
      const user = await User.findOne({ email }).select("id name username email score time");

      if (!user) {
        throw new Error("User not found");
      }

      let updateData = {};

      if (!user.score || score > user.score) {
        // If score is absent OR new score is greater, update score and timeInSeconds
        updateData = { score, time };
      } else if (score === user.score && time < user.time) {
        // If score matches but timeInSeconds is lower, update timeInSeconds
        updateData = { time };
      } else {
        // No update needed, return the existing user
        return "No update needed";
      }

      // Update the user in the database
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: updateData },
        { new: true }
      ).select("id name username email score time");

      return "Updated Successfully";
    }
  }
};

module.exports = userResolvers;
