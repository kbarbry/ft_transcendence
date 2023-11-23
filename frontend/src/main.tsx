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
// import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({ uri: 'http://127.0.0.1:3000/graphql' })
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

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     )

//   if (networkError) console.log(`[Network error]: ${networkError}`)
// })

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
