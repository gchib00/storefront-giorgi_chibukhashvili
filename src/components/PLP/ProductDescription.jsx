/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Price = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin-left: 1rem;
`;
const ProductName = styled.p`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #1D1F22;
  margin-left: 1rem;
  line-height: 10px;
`;

export default class ProductDescription extends PureComponent {
  render() {
    const { name, currency, amount } = this.props;
    return (
      <>
        <ProductName>{name}</ProductName>
        <Price>{currency} {amount}</Price>
      </>
    );
  }
}
ProductDescription.propTypes = {
  name: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
