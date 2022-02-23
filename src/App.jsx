/* eslint-disable react/no-unstable-nested-components */
import React, { PureComponent } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PLP from './components/PLP';
import PDP from './components/PDP';
import MiniCart from './components/MiniCart';

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
          <MiniCart />
          <Routes>
            <Route path="/" element={<PLP />} />
            <Route path="/product/:id" element={<PDP />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
