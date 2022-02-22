import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductName from './ProductName';
import ProductPrice from './ProductPrice';
import ProductDescription from './ProductDescription';
import CTAButton from './CTAButton';

const MainContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    width: 340px;
`;
export default class ProductDetails extends PureComponent {
  state = {
    selectedAttributes: {},
  };

  render() {
    const { product } = this.props;
    return (
      <MainContainer>
        <ProductName
          name={product.name}
        />
        {/* <ProductAttributes /> */}
        <ProductPrice
          prices={product.prices}
        />
        <CTAButton
          productID={product.id}
          available={product.inStock}
          selectedAttributes={this.state.selectedAttributes}
        />
        <ProductDescription
          description={product.description}
        />
      </MainContainer>
    );
  }
}
ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
};
