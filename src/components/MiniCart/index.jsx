/* eslint-disable react/no-find-dom-node */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMiniCart } from '../../store/actions';
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
const ItemsContainer = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;
class MiniCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenDimmer: true,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    this.setScreenDimmer(true);
  }

  componentDidUpdate(prevProps) {
    const { cartItems } = this.props;
    const { screenDimmer } = this.state;
    if (prevProps.cartItems !== cartItems) {
      const updatedState = JSON.stringify(cartItems);
      localStorage.setItem('cartItems', updatedState);
    }
    const { miniCart } = this.props;
    if (!miniCart || !screenDimmer) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.setMiniCart(false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  setScreenDimmer = (bool) => {
    this.setState((prevState) => ({
      ...prevState,
      screenDimmer: bool,
    }));
  };

  // Clicks outside the div should automatically close CartOverlay:
  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this);
    const targetPathArr = e.composedPath();
    // mini-cart(along with its child-components) should be an exception:
    if (e.target.id === 'miniCart' || targetPathArr[1].id === 'miniCart') {
      return null;
    }
    if (!domNode || !domNode.contains(e.target)) {
      // eslint-disable-next-line react/destructuring-assignment
      return this.props.setMiniCart(false);
    }
    return null;
  };

  render() {
    const { miniCart, cartItems } = this.props;
    const { screenDimmer } = this.state;
    if (!miniCart || !screenDimmer) {
      return null;
    }
    return (
      <>
        <MainContainer>
          <MiniCartTitle />
          <ItemsContainer>
            {
              cartItems.map((cartItem) => (
                <MiniCartItem
                  productID={cartItem.productID}
                  uniqueItemID={cartItem.uniqueItemID}
                  quantity={cartItem.quantity}
                  selectedAttributes={cartItem.selectedAttributes}
                  key={cartItem.uniqueItemID}
                />
              ))
            }
          </ItemsContainer>
          <MiniCartTotal />
          <CTAButtons />
        </MainContainer>
        <ScreenDimmer
          screenDimmer={screenDimmer}
          setScreenDimmer={this.setScreenDimmer}
        />
      </>
    );
  }
}
MiniCart.propTypes = {
  miniCart: PropTypes.bool.isRequired,
  setMiniCart: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};
const mapStateToProps = (state) => ({
  miniCart: state.miniCart,
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  setMiniCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(MiniCart);
