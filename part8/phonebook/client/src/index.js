import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});

const query = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
