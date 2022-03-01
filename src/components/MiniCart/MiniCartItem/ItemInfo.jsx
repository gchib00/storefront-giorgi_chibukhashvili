import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCartItemPrice } from '../../../store/actions';
import ProductAttributes from '../../PDP/ProductAttributes';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 137px;
  text-overflow: none;
  margin: 0.6rem 0rem 0.6rem 1rem;
`;
const ItemTitle = styled.p`
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  align-items: center;
  color: #1D1F22;
`;
const ItemPrice = styled.p`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  align-items: center;
  color: #1D1F22;
  margin-right: 1rem;
  line-height: 3px;
`;
class ItemInfo extends PureComponent {
  componentDidMount() {
    const newPrice = this.determineAmount();
    this.props.updateCartItemPrice(this.props.uniqueItemID, newPrice.amount);
  }

  componentDidUpdate(prevState) {
    if (prevState.selectedCurrency.label !== this.props.selectedCurrency.label) {
      const newPrice = this.determineAmount();
      this.props.updateCartItemPrice(this.props.uniqueItemID, newPrice.amount);
    }
  }

  determineAmount = () => {
    const { product, selectedCurrency } = this.props;
    const relevantPriceObj = product.prices.find((priceObj) => (
      priceObj.currency.label === selectedCurrency.label
    ));
    return {
      amount: relevantPriceObj.amount,
      symbol: relevantPriceObj.currency.symbol,
    };
  };

  render() {
    const { product } = this.props;
    const price = this.determineAmount();
    return (
      <MainContainer>
        <ItemTitle>{product.name}</ItemTitle>
        <ItemPrice>{price.symbol} {price.amount}</ItemPrice>
        <ProductAttributes product={product} optionBoxSize="small" />
      </MainContainer>
    );
  }
}
ItemInfo.propTypes = {
  product: PropTypes.object.isRequired,
  uniqueItemID: PropTypes.string.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
  updateCartItemPrice: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
const mapDispatchToProps = () => ({
  updateCartItemPrice,
});
export default connect(mapStateToProps, mapDispatchToProps())(ItemInfo);
