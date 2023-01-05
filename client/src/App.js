import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import GetData from './Components/GetData';

const errorLink = onError((graphQLErrors) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, location, path}) => {
      alert(`GraphQL err: ${message}!`)
    })
  }
})

const link = from ([
  errorLink,
  new HttpLink({uri: 'https://fakerql.goosfraba.ro/graphql'})
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
