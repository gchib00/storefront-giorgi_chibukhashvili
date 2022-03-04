/* eslint-disable react/no-unstable-nested-components */
import React, { PureComponent } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      console.log(this.props.cartItems);
    }
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
            <Route path="/" element={<PLP />} />
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
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  initializeCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(App);
