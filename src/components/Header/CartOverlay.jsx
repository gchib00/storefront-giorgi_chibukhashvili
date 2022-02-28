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
const Counter = styled.span`
  text-align: center;
  position: absolute;
  bottom: 14px;
  left: 15px;
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 50%;
  color: white;
`;
class CartOverlay extends Component {
  cartDisplay = () => {
    const { screenDimmer, miniCart } = this.props;
    this.props.setMiniCart(!miniCart);
    this.props.setScreenDimmer(!screenDimmer);
  };

  getItemsCount = () => {
    const { cartItems } = this.props;
    let counter = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => {
        return counter += item.quantity;
      });
      return counter;
    }
    return null;
  };

  render() {
    return (
      <CartIcon onClick={this.cartDisplay}>
        <img src={CartSVG} alt="cart" />
        <Counter>{this.getItemsCount()}</Counter>
      </CartIcon>
    );
  }
}
CartOverlay.propTypes = {
  screenDimmer: PropTypes.bool.isRequired,
  miniCart: PropTypes.bool.isRequired,
  setScreenDimmer: PropTypes.func.isRequired,
  setMiniCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  screenDimmer: state.screenDimmer,
  miniCart: state.miniCart,
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  setScreenDimmer,
  setMiniCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
