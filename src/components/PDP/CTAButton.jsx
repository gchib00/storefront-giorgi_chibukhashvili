import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addItemToCart } from '../../store/actions';

const Button = styled.button`
  padding: 16px 32px;
  width: 292px;
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
    const { cartItems } = this.props;
    if (prevProps.cartItems !== cartItems) {
      const updatedState = JSON.stringify(cartItems);
      localStorage.setItem('cartItems', updatedState);
    }
  }

  saveToCart = (productID, selectedAttributes, attributes, productPrice) => {
    if (attributes.length !== selectedAttributes.length) {
      return alert('All the available options need to be selected');
    }
    const item = {
      productID,
      productPrice,
      selectedAttributes,
    };
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.addItemToCart(item);
  };

  render() {
    const { product, selectedAttributes, productPrice } = this.props;
    const { id, inStock, attributes } = product;
    if (!inStock) {
      return null; // don't show CTAButton if product is out of stock
    }
    return (
      <Button
        onClick={() => this.saveToCart(id, selectedAttributes, attributes, productPrice)}
      >
        ADD TO CART
      </Button>
    );
  }
}
CTAButton.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedAttributes: PropTypes.arrayOf(PropTypes.any).isRequired,
  addItemToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  productPrice: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  addItemToCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(CTAButton);
