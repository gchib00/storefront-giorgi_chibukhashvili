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
    line-height: 18px;
    color: #1D1F22;
`;
class ProductPrice extends PureComponent {
  componentDidMount() {
    const newPrice = this.determineAmount(this.props.prices, this.props.selectedCurrency);
    this.props.setProductPrice(newPrice.amount);
  }

  componentDidUpdate(prevState) {
    if (prevState.selectedCurrency.label !== this.props.selectedCurrency.label) {
      const newPrice = this.determineAmount();
      this.props.setProductPrice(newPrice.amount);
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
        <AttributeTitle>Price:</AttributeTitle>
        <Price>{price.symbol} {price.amount}</Price>
      </div>
    );
  }
}
ProductPrice.propTypes = {
  prices: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
  setProductPrice: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(ProductPrice);
