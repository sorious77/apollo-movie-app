import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-movie-api-2021.herokuapp.com/",
  //uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
