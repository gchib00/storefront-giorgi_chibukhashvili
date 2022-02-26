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
  left: 58vw;
  @media(min-width: 1280px) { left: 66vw }
  @media(min-width: 1500px) { left: 70vw }
  @media(min-width: 1700px) { left: 72vw }
  @media(min-width: 1800px) { left: 75vw }
  @media(min-width: 1900px) { left: 78vw }
  @media(min-width: 2000px) { left: 80vw }
  z-index: 4;    
`;
class MiniCart extends PureComponent {
  handleDimmerClick = () => {
    // if user clicks on dimmed screen, disable both the dimmer and the mini cart
    this.props.setMiniCart(false);
  };

  render() {
    const { miniCart, screenDimmer, cartItems } = this.props;
    if (!miniCart || !screenDimmer) {
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
                  key={cartItem.uniqueItemID}
                />
              );
            })
          }
          <MiniCartTotal />
          <CTAButtons />
        </MainContainer>
        <ScreenDimmer onClick={this.handleDimmerClick} />
      </>
    );
  }
}
MiniCart.propTypes = {
  screenDimmer: PropTypes.bool.isRequired,
  miniCart: PropTypes.bool.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps())(MiniCart);
