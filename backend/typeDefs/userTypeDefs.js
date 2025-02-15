const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Message{
    isRegistered:Boolean
  }
  type Query {
    me: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Message
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = userTypeDefs;
