import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});


// const link = new ApolloLink({
//   uri: "/graphql",
//   headers: {
//       authorization: 'bearer <your token here>'
//   }
// });

const root = createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
