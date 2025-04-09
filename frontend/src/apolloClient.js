import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL API URL
  credentials: "include", // Allows secure cookies
});

// Middleware to add Authorization header
const authLink = setContext((operation, prevContext) => {
  const token = localStorage.getItem("token") || "";

  console.log("🚀 Debug: Received Context", prevContext); // Check what Apollo is passing

  // Extract headers safely
  const existingHeaders = prevContext.headers || {};

  // Extract operation name safely
  const operationName = operation.operationName || "Unknown Operation";

  console.log("Operation Name:", operationName); // Debugging
  console.log("Existing Headers:", existingHeaders); // Debugging

  // Skip Authorization for Login & Register operations
  if (operationName === "Login" || operationName === "Register") {
    console.log("Skipping Authorization for:", operationName);
    return { headers: existingHeaders };
  }

  return {
    headers: {
      ...existingHeaders,
       authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
