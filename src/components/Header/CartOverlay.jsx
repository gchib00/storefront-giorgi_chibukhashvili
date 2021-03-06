import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMiniCart } from '../../store/actions';
import CartSVG from '../../static/cart.svg';
import CartOverlayCounter from './CartOverlayCounter';

const CartIcon = styled.div`
  position: relative;
  top: 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;
class CartOverlay extends PureComponent {
  cartDisplay = () => {
    const { miniCart } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setMiniCart(!miniCart);
  };

  render() {
    return (
      <CartIcon id="miniCart" onClick={this.cartDisplay}>
        <img src={CartSVG} alt="cart" />
        <CartOverlayCounter />
      </CartIcon>
    );
  }
}
CartOverlay.propTypes = {
  miniCart: PropTypes.bool.isRequired,
  setMiniCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  miniCart: state.miniCart,
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  setMiniCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
