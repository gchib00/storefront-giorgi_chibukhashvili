import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 94%; 
  height: 78%; 
  margin: 0.64rem;
  margin-bottom: -6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const Image = styled.img`
  max-width: 94%; 
  max-height: 78%; 
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
const outofstockStyle = (inStock) => {
  if (!inStock) {
    return { opacity: '0.5', marginBottom: '-8rem' };
  }
  return null;
};
const outofstockText = (inStock) => {
  if (!inStock) {
    return 'OUT OF STOCK';
  }
  return null;
};
export default class ProductImage extends PureComponent {
  render() {
    const { source, available } = this.props;
    return (
      <>
        <ImageContainer
          onClick={this.showProductPage}
          style={outofstockStyle(available)}
        >
          <Image src={source} alt="product-image" />
        </ImageContainer>
        <OutOfStockText>{outofstockText(available)}</OutOfStockText>
      </>
    );
  }
}
ProductImage.propTypes = {
  source: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
};
