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
      // eslint-disable-next-line array-callback-return
      cartItems.map((item) => {
        counter += item.quantity;
      });
      return counter;
    }
    return null;
  };

  render() {
    const { cartItems } = this.props;
    if (cartItems.length < 1) {
      return null;
    }
    return (
      <Counter>{this.getItemsCount()}</Counter>
    );
  }
}
CartOverlayCounter.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
export default connect(mapStateToProps)(CartOverlayCounter);
