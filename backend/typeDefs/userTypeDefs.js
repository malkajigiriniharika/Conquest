const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String!
    score: Int!
    time: Int
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Message {
    isRegistered: Boolean
  }

  type Query {
    me: User
    getLeaderboard: [User]
  }

  type Mutation {
    register(name: String!, username: String!, email: String!, password: String!): Message
    login(email: String!, password: String!): AuthPayload
    updateScore(email: String!, score: Int!, time: Int!): String! 
  }
`;

module.exports = userTypeDefs;
