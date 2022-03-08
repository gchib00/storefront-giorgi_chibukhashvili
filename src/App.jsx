import React, { PureComponent } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeCart } from './store/actions';
import Header from './components/Header';
import PLP from './components/PLP';
import PDP from './components/PDP';
import MiniCart from './components/MiniCart';
import Cart from './components/Cart';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

class App extends PureComponent {
  componentDidMount() {
    this.getSavedCart();
  }

  getSavedCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCart) {
      return this.props.initializeCart(savedCart);
    }
    return null;
  };

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Header />
          <MiniCart />
          <Routes>
            <Route path="/" element={<Navigate to="/all" />} />
            <Route path="/:category" element={<PLP />} />
            <Route path="/product/:id" element={<PDP />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
App.propTypes = {
  initializeCart: PropTypes.func.isRequired,
};
const mapDispatchToProps = () => ({
  initializeCart,
});
export default connect(null, mapDispatchToProps())(App);
