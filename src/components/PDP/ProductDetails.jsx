import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductName from './ProductName';
import ProductPrice from './ProductPrice';
import ProductDescription from './ProductDescription';
import CTAButton from './CTAButton';
import ProductAttributes from './ProductAttributes';

const MainContainer = styled.div`
  font-family: 'Raleway', sans-serif;
  width: 340px;
`;
export default class ProductDetails extends PureComponent {
  state = {
    selectedAttributes: [],
    productPrice: 0,
  };

  setProductPrice = (relevantPriceObj) => {
    return this.setState((prevState) => ({
      ...prevState,
      productPrice: relevantPriceObj,
    }));
  };

  setSelectedAttributes = (attribute) => {
    const currentAttributes = [...this.state.selectedAttributes];
    if (!currentAttributes.find((attr) => attr.name === attribute.name)) {
      currentAttributes.push(attribute);
    } else {
      const index = currentAttributes.map((e) => e.name).indexOf(attribute.name);
      currentAttributes.splice(index, 1, attribute);
    }
    return this.setState((prevState) => ({
      ...prevState,
      selectedAttributes: currentAttributes,
    }));
  };

  render() {
    const { product } = this.props;
    return (
      <MainContainer>
        <ProductName
          brand={product.brand}
          name={product.name}
        />
        <ProductAttributes
          product={product}
          selectedAttributes={this.state.selectedAttributes}
          setSelectedAttributes={this.setSelectedAttributes}
        />
        <ProductPrice
          prices={product.prices}
          setProductPrice={this.setProductPrice}
        />
        <CTAButton
          product={product}
          selectedAttributes={this.state.selectedAttributes}
          productPrice={this.state.productPrice}
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
