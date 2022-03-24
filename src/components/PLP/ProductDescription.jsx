import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

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
const determineAmount = (prices, selectedCurrency) => {
  const relevantPriceObj = prices.find((priceObj) => (
    priceObj.currency.label === selectedCurrency.label
  ));
  return {
    amount: relevantPriceObj.amount,
    symbol: relevantPriceObj.currency.symbol,
  };
};
class ProductDescription extends PureComponent {
  render() {
    const {
      brand, name, prices, selectedCurrency,
    } = this.props;
    const price = determineAmount(prices, selectedCurrency);
    return (
      <>
        <ProductName>
          {brand}
          {name}
        </ProductName>
        <Price>
          {price.symbol}
          {price.amount}
        </Price>
      </>
    );
  }
}
ProductDescription.propTypes = {
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prices: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedCurrency: PropTypes.objectOf(PropTypes.string).isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(ProductDescription);
