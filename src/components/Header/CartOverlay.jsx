import React, { Component } from 'react';
import styled from 'styled-components';
import CartSVG from '../../static/cart.svg';

const CartIcon = styled.div`
  position: relative;
  top: 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;
export default class CartOverlay extends Component {
  render() {
    return (
      <CartIcon onClick={this.cartDisplay}>
        <img src={CartSVG} alt="cart" />
        {/* {this.cartItemAmount(this.props.items)} */}
      </CartIcon>
    );
  }
}
