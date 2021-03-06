import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../store/actions';
import RoundCartSVG from '../../static/roundCart.svg';

const Cart = styled.img`
  position: relative;
  display: flex;
  left: 300px;
  bottom: -15px;
  visibility: hidden;
  cursor: pointer;
  margin: 0;
`;
const outofstockCart = (inStock) => {
  if (!inStock) {
    return { visibility: 'hidden' };
  }
  return null;
};
class CartButton extends PureComponent {
  handleCartClick = (e, product) => {
    if (product.attributes.length === 0) {
      e.preventDefault(); // this will prevent user from being redirected to PDP
      const item = {
        productID: product.id,
        productPrice: product.prices,
        selectedAttributes: [],
      };
      // eslint-disable-next-line react/destructuring-assignment
      this.props.addItemToCart(item);
      alert('Item has been added to cart');
    }
  };

  render() {
    const { product } = this.props;
    const available = product.inStock;
    return (
      <Cart
        src={RoundCartSVG}
        onClick={(e) => this.handleCartClick(e, product)}
        style={(outofstockCart(available))}
      />
    );
  }
}
CartButton.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  addItemToCart: PropTypes.func.isRequired,
};
const mapDispatchToProps = () => ({
  addItemToCart,
});
export default connect(null, mapDispatchToProps())(CartButton);
