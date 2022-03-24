import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const AttributeTitle = styled.h2`
    display: flex;
    flex: flex-start;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
`;
const Price = styled.p`
    display: flex;
    justify-content: flex-start;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 9px;
    color: #1D1F22;
`;
class ProductPrice extends PureComponent {
  componentDidMount() {
    const { prices, selectedCurrency, setProductPrice } = this.props;
    const newPrice = this.determineAmount(prices, selectedCurrency);
    setProductPrice(newPrice.amount);
  }

  componentDidUpdate(prevState) {
    const { selectedCurrency, setProductPrice } = this.props;
    if (prevState.selectedCurrency.label !== selectedCurrency.label) {
      const newPrice = this.determineAmount();
      setProductPrice(newPrice.amount);
    }
  }

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
      <div>
        <AttributeTitle>PRICE:</AttributeTitle>
        <Price>
          {price.symbol}
          {price.amount}
        </Price>
      </div>
    );
  }
}
ProductPrice.propTypes = {
  prices: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedCurrency: PropTypes.objectOf(PropTypes.string).isRequired,
  setProductPrice: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(ProductPrice);
