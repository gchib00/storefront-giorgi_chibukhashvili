import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
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
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      const updatedState = JSON.stringify(this.props.cartItems);
      localStorage.setItem('cartItems', updatedState);
    }
    const { miniCart, screenDimmer } = this.props;
    if (!miniCart || !screenDimmer) {
      this.props.setMiniCart(false);
      this.props.setScreenDimmer(false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  // Clicks outside the div should automatically close CartOverlay:
  handleClickOutside = (e) => {
    const { screenDimmer, miniCart } = this.props;
    const domNode = ReactDOM.findDOMNode(this);
    // mini-cart(along with its child-components) should be an exception:
    if (e.target.id === 'miniCart' || e.path[1].id === 'miniCart') {
      return null;
    }
    if (!domNode || !domNode.contains(e.target)) {
      this.props.setMiniCart(!miniCart);
      return this.props.setScreenDimmer(!screenDimmer);
    }
    return null;
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
