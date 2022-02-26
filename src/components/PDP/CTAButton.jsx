import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addItemToCart } from '../../store/actions';

const Button = styled.button`
  padding: 16px 32px;
  width: 338px;
  height: 52px;
  background: #5ECE7B;
  color: white;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  border: none;
  margin: auto;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover { 
      transition: 300ms;
      opacity: 0.7;
  }
`;
class CTAButton extends PureComponent {
  componentDidUpdate(prevProps) { // save new state to localStorage
    if (prevProps.cartItems !== this.props.cartItems) {
      const updatedState = JSON.stringify(this.props.cartItems);
      localStorage.setItem('cartItems', updatedState);
    }
  }

  saveToCart = (productID, selectedAttributes, productPrice) => {
    const uniqueItemID = productID + JSON.stringify(selectedAttributes.toString);
    console.log('productPrice value as the CTA is clicked =', productPrice);
    const item = {
      productID,
      uniqueItemID,
      productPrice,
      selectedAttributes,
    };
    this.props.addItemToCart(item);
    return alert('item added to state');
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { productID, available, selectedAttributes, productPrice } = this.props;
    if (!available) {
      return null; // don't show CTAButton if product is out of stock
    }
    return (
      <Button
        onClick={() => this.saveToCart(productID, selectedAttributes, productPrice)}
      >ADD TO CART
      </Button>
    );
  }
}
CTAButton.propTypes = {
  available: PropTypes.bool.isRequired,
  productID: PropTypes.string.isRequired,
  selectedAttributes: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  productPrice: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  addItemToCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(CTAButton);
