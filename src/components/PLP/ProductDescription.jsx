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
class ProductDescription extends PureComponent {
  determineAmount = (prices, selectedCurrency) => {
    const relevantPriceObj = prices.find((priceObj) => (
      priceObj.currency.label === selectedCurrency.label
    ));
    return {
      amount: relevantPriceObj.amount,
      symbol: relevantPriceObj.currency.symbol,
    };
  };

  render() {
    const { name, prices, selectedCurrency } = this.props;
    const price = this.determineAmount(prices, selectedCurrency);
    return (
      <>
        <ProductName>{name}</ProductName>
        <Price>{price.symbol} {price.amount}</Price>
      </>
    );
  }
}
ProductDescription.propTypes = {
  name: PropTypes.string.isRequired,
  prices: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(ProductDescription);
