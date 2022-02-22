import React, { PureComponent } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PLP from './components/PLP';
import PDP from './components/PDP';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<PLP />} />
            <Route path="/product" element={<PDP />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
