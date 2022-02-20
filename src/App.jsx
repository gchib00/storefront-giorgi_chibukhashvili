import React, { PureComponent } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from './components/Header';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Header />
        <p>hello</p>
      </ApolloProvider>
    );
  }
}
