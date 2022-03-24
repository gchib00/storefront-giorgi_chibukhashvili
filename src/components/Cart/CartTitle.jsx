import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Title = styled.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: bold;
  font-size: 32px; 
  margin-left: 3rem;
`;
class CartTitle extends PureComponent {
  getCartTitle = () => {
    const { cartItems } = this.props;
    if (cartItems.length < 1) {
      return 'CART IS EMPTY';
    }
    return 'CART';
  };

  render() {
    return (
      <Title>{this.getCartTitle()}</Title>
    );
  }
}
CartTitle.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
export default connect(mapStateToProps)(CartTitle);
