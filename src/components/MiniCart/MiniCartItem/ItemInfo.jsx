import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ItemAttributes from './ItemAttributes';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 137px;
    text-overflow: none;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
`;
const ItemTitle = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
`;
const ItemPrice = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
    margin-right: 1rem;
    line-height: 3px;
`;
class ItemInfo extends PureComponent {
  determineAmount = (prices, selectedCurrency) => {
    const relevantPriceObj = prices.find((priceObj) => (
      priceObj.currency.label === selectedCurrency
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
      <MainContainer>
        <ItemTitle>{name}</ItemTitle>
        <ItemPrice>{price.symbol} {price.amount}</ItemPrice>
        <ItemAttributes />
      </MainContainer>
    );
  }
}
ItemInfo.propTypes = {
  name: PropTypes.string.isRequired,
  prices: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(ItemInfo);
