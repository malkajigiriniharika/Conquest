require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const userTypeDefs = require("./typeDefs/userTypeDefs");
const userResolvers = require("./resolvers/userResolvers");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
connectDB();

const server = new ApolloServer({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
  context: ({ req }) => ({ user: authMiddleware(req) }),
});

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(5000, () => console.log("Server running on http://localhost:5000/graphql"));
});
