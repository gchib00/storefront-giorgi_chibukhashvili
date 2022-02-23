import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScreenDimmer, setMiniCart } from '../../store/actions';
import CartSVG from '../../static/cart.svg';

const CartIcon = styled.div`
  position: relative;
  top: 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;
class CartOverlay extends Component {
  cartDisplay = () => {
    this.props.setMiniCart(true);
    this.props.setScreenDimmer(true);
  };

  render() {
    return (
      <CartIcon onClick={this.cartDisplay}>
        <img src={CartSVG} alt="cart" />
        {/* {this.cartItemAmount(this.props.items)} */}
      </CartIcon>
    );
  }
}
CartOverlay.propTypes = {
  setScreenDimmer: PropTypes.func.isRequired,
  setMiniCart: PropTypes.func.isRequired,
};
const mapDispatchToProps = () => ({
  setScreenDimmer,
  setMiniCart,
});
export default connect(null, mapDispatchToProps())(CartOverlay);
