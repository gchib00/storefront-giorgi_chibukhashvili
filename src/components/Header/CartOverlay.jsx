import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScreenDimmer, setMiniCart } from '../../store/actions';
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
    const { screenDimmer, miniCart } = this.props;
    this.props.setMiniCart(!miniCart);
    this.props.setScreenDimmer(!screenDimmer);
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
  screenDimmer: PropTypes.bool.isRequired,
  miniCart: PropTypes.bool.isRequired,
  setScreenDimmer: PropTypes.func.isRequired,
  setMiniCart: PropTypes.func.isRequired,
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
