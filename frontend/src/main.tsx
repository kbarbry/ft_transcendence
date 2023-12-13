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
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'

const httpLink = new HttpLink({
  uri: 'http://127.0.0.1:3000/graphql',
  credentials: 'include'
})
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://127.0.0.1:3000/graphql',
    connectionParams: {
      credentials: 'include'
    }
  })
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

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      ChannelInvited: {
        keyFields: ['channelId', 'userId']
      }
    }
  })
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
)
