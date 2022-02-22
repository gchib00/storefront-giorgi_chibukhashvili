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
  saveToCart = (productID, available, selectedAttributes) => {
    if (!available) { return null; }
    return addItemToCart({
      productID,
      selectedAttributes,
    });
  };

  render() {
    const { productID, available, selectedAttributes } = this.props;
    if (!available) {
      return null; // don't show CTAButton if product is out of stock
    }
    return (
      <Button onClick={() => this.saveToCart(productID, available, selectedAttributes)}>
        ADD TO CART
      </Button>
    );
  }
}
CTAButton.propTypes = {
  available: PropTypes.bool.isRequired,
  productID: PropTypes.string.isRequired,
  selectedAttributes: PropTypes.object.isRequired,
};
const mapDispatchToProps = () => ({
  addItemToCart,
});
export default connect(null, mapDispatchToProps())(CTAButton);
