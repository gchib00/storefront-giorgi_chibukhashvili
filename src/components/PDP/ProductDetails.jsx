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
  width: 292px;
`;
export default class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
      productPrice: 0,
    };
  }

  setProductPrice = (relevantPriceObj) => {
    this.setState((prevState) => ({
      ...prevState,
      productPrice: relevantPriceObj,
    }));
  };

  setSelectedAttributes = (attribute) => {
    const { selectedAttributes } = this.state;
    const currentAttributes = [...selectedAttributes];
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
    const { selectedAttributes, productPrice } = this.state;
    return (
      <MainContainer>
        <ProductName
          brand={product.brand}
          name={product.name}
        />
        <ProductAttributes
          product={product}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={this.setSelectedAttributes}
        />
        <ProductPrice
          prices={product.prices}
          setProductPrice={this.setProductPrice}
        />
        <CTAButton
          product={product}
          selectedAttributes={selectedAttributes}
          productPrice={productPrice}
        />
        <ProductDescription
          description={product.description}
        />
      </MainContainer>
    );
  }
}
ProductDetails.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
};
