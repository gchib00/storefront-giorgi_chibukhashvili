import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Price = styled.p`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 18px;
  align-items: center;
  color: #1D1F22;
  margin: 0;
`;
class ProductPrice extends PureComponent {
  determineAmount = () => {
    const { prices, selectedCurrency } = this.props;
    const relevantPriceObj = prices.find((priceObj) => (
      priceObj.currency.label === selectedCurrency.label
    ));
    return {
      amount: relevantPriceObj.amount,
      symbol: relevantPriceObj.currency.symbol,
    };
  };

  render() {
    const price = this.determineAmount();
    return (
      <Price>{price.symbol}{price.amount}</Price>
    );
  }
}
ProductPrice.propTypes = {
  prices: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(ProductPrice);
