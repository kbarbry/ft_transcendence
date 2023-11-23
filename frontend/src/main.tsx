import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split
} from '@apollo/client'
import App from './App.tsx'
import './index.css'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: 'http://127.0.0.1:3000/graphql',
  credentials: 'include'
})
const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://127.0.0.1:3000/graphql' })
)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
