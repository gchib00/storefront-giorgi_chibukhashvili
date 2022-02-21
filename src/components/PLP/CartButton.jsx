import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
export default class CartButton extends PureComponent {
  handleCartClick = (e) => {
    // if (this.props.product.attributes.length === 0) {
    //   e.preventDefault(); // this will prevent user from being redirected to PDP
    //   alert('Item has been added to cart');
    //   const object = {
    //     product: this.props.product,
    //     quantity: 1,
    //     productOptions: [],
    //   };
    //   this.props.addToCart(object);
    // } else {
    //   this.showProductPage();
    // }
    e.preventDefault();
    console.log('Placeholder fn');
  };

  outofstockCart = (inStock) => {
    if (!inStock) {
      return { visibility: 'hidden' };
    }
    return null;
  };

  render() {
    const { product } = this.props;
    const available = product.inStock;
    return (
      <Cart
        src={RoundCartSVG}
        onClick={(e) => this.handleCartClick(e)}
        style={(this.outofstockCart(available))}
      />
    );
  }
}
CartButton.propTypes = {
  product: PropTypes.object.isRequired,
};
