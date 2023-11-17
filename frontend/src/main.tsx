import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createRoot } from 'react-dom/client';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from '@apollo/client';


const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

