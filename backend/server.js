const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const connectDB = require("./config/db");
const userTypeDefs = require("./typeDefs/userTypeDefs");
const userResolvers = require("./resolvers/userResolvers");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// ✅ Enable JSON body parsing
app.use(express.json());

// ✅ Configure CORS properly
const corsOptions = {
  origin: "http://localhost:3001", // Allow only frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ✅ Connect to Database
connectDB();

// ✅ Initialize Apollo Server
const server = new ApolloServer({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
  context: ({ req }) => {
    const user = authMiddleware(req); // Apply authentication middleware
    return { user };
  },
});

// ✅ Start Apollo Server and Express App
async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app, cors: corsOptions });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
  }
}

// ✅ Start the server
startServer();
