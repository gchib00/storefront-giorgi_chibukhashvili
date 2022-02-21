import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainImage = styled.img`
    width: 94%; 
    height: 78%; 
    margin: 0.64rem;
    margin-bottom: -6rem;
`;
const OutOfStockText = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 105px;
  text-decoration: none;
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 24px;
  color: grey;
`;
export default class ProductImage extends PureComponent {
  outofstockStyle = (inStock) => {
    if (!inStock) {
      return { opacity: '0.5', marginBottom: '-8rem' };
    }
    return null;
  };

  outofstockText = (inStock) => {
    if (!inStock) {
      return 'OUT OF STOCK';
    }
    return null;
  };

  render() {
    const { source, available } = this.props;
    return (
      <>
        <MainImage
          src={source}
          alt="product"
          onClick={this.showProductPage}
          style={this.outofstockStyle(available)}
        />
        <OutOfStockText>{this.outofstockText(available)}</OutOfStockText>
      </>
    );
  }
}
ProductImage.propTypes = {
  source: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
};
