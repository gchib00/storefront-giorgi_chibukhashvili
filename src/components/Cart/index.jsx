import React, { PureComponent } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Query } from '@apollo/react-components';
// import { gql } from '@apollo/client';
import CartTitle from './CartTitle';
import CartItem from './CartItem';

class CartPage extends PureComponent {
  render() {
    const { cartItems } = this.props;
    return (
      <>
        <CartTitle />
        {cartItems.map((cartItem) => {
          return <CartItem cartItem={cartItem} key={cartItem.uniqueItemID} />;
        })}
      </>
    );
  }
}
CartPage.propTypes = {
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
export default connect(mapStateToProps)(CartPage);
