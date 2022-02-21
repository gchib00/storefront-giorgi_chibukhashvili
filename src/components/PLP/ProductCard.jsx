import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import CartButton from './CartButton';
import ProductDescription from './ProductDescription';

const MainContainer = styled.div`
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  width: 386px;
  height: 464px;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    transition: 300ms;
  }
`;
const LinkPDP = styled(Link)`
  text-decoration: none;
  &:hover > img {
    visibility: visible;
  }
`;

export default class ProductCard extends PureComponent {
  render() {
    const { product } = this.props;
    return (
      <MainContainer>
        <LinkPDP to="#">
          <ProductImage
            source={product.gallery[0]}
            available={product.inStock}
          />
          <CartButton
            product={product}
          />
        </LinkPDP>
        <ProductDescription
          name={product.name}
          currency={product.prices.currency.symbol}
          amount={product.prices.amount}
        />
      </MainContainer>
    );
  }
}
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

// import RoundCart from '../static/images/roundCart.svg'
