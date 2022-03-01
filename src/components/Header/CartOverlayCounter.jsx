import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
class CartOverlayCounter extends PureComponent {
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
    if (this.props.cartItems.length < 1) {
      return null;
    }
    return (
      <Counter>{this.getItemsCount()}</Counter>
    );
  }
}
CartOverlayCounter.propTypes = {
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  screenDimmer: state.screenDimmer,
  miniCart: state.miniCart,
  cartItems: state.cartItems,
});
export default connect(mapStateToProps)(CartOverlayCounter);
