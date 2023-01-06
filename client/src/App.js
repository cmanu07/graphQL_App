import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from "graphql-ws";
import { onError } from '@apollo/client/link/error';
import GetData from './Components/GetData';

const errorLink = onError((graphQLErrors) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, location, path}) => {
      return alert(`GraphQL err: ${message}!`)
    })
  }
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3000/graphql',
}));

const link = from ([
  errorLink,
  new HttpLink({uri:'https://fakerql.goosfraba.ro/graphql'}),
  wsLink
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>GraphQL API</h1>
      <GetData/>
    </ApolloProvider>
  );
}

export default App;
