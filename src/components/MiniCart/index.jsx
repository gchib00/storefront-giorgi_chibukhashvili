import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScreenDimmer, setMiniCart } from '../../store/actions';
import ScreenDimmer from '../Misc/ScreenDimmer';
import CTAButtons from './CTAButtons';
import MiniCartTotal from './MiniCartTotal';
import MiniCartTitle from './MiniCartTitle';
import MiniCartItem from './MiniCartItem';

const MainContainer = styled.div` 
  position: absolute;
  z-index: 3;
  min-height: 300px;
  min-width: 385px;
  background: white;
  top: 80px;
  right: 4vw;
  z-index: 3;    
`;
class MiniCart extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      const updatedState = JSON.stringify(this.props.cartItems);
      localStorage.setItem('cartItems', updatedState);
    }
  }

  handleDimmerClick = () => {
    // if user clicks on dimmed screen, disable both the dimmer and the mini cart
    this.props.setMiniCart(false);
    this.props.setScreenDimmer(false);
  };

  render() {
    const { miniCart, screenDimmer, cartItems } = this.props;
    if (!miniCart || !screenDimmer) {
      this.props.setMiniCart(false);
      this.props.setScreenDimmer(false);
      return null;
    }
    return (
      <>
        <MainContainer>
          <MiniCartTitle />
          {
            cartItems.map((cartItem) => {
              return (
                <MiniCartItem
                  productID={cartItem.productID}
                  uniqueItemID={cartItem.uniqueItemID}
                  quantity={cartItem.quantity}
                  selectedAttributes={cartItem.selectedAttributes}
                  key={cartItem.uniqueItemID}
                />
              );
            })
          }
          <MiniCartTotal />
          <CTAButtons />
        </MainContainer>
        <ScreenDimmer onClick={() => this.handleDimmerClick()} />
      </>
    );
  }
}
MiniCart.propTypes = {
  screenDimmer: PropTypes.bool.isRequired,
  miniCart: PropTypes.bool.isRequired,
  setMiniCart: PropTypes.func.isRequired,
  setScreenDimmer: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps())(MiniCart);
