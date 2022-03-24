import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCartItemPrice, updateCartItemOption } from '../../../store/actions';
import ProductAttributes from '../../PDP/ProductAttributes';
import ItemTitle from './ItemTitle';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 137px;
  text-overflow: none;
  margin: 0.6rem 0rem 0.6rem 1rem;
`;
const ItemPrice = styled.p`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  align-items: center;
  color: #1D1F22;
  margin-right: 1rem;
  margin-bottom: 15px;
  line-height: 3px;
`;
class ItemInfo extends PureComponent {
  componentDidMount() {
    const newPrice = this.determineAmount();
    const { uniqueItemID } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.updateCartItemPrice(uniqueItemID, newPrice.amount);
  }

  componentDidUpdate(prevState) {
    const { selectedCurrency, uniqueItemID } = this.props;
    if (prevState.selectedCurrency.label !== selectedCurrency.label) {
      const newPrice = this.determineAmount();
      // eslint-disable-next-line react/destructuring-assignment
      this.props.updateCartItemPrice(uniqueItemID, newPrice.amount);
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

  setSelectedAttributes = (attribute) => {
    const { uniqueItemID } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.updateCartItemOption(uniqueItemID, attribute);
  };

  render() {
    const { product, selectedAttributes } = this.props;
    const price = this.determineAmount();
    return (
      <MainContainer>
        <ItemTitle
          brand={product.brand}
          name={product.name}
        />
        <ItemPrice>
          {price.symbol}
          {price.amount}
        </ItemPrice>
        <ProductAttributes
          product={product}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={this.setSelectedAttributes}
          optionBoxSize="small"
        />
      </MainContainer>
    );
  }
}
ItemInfo.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  uniqueItemID: PropTypes.string.isRequired,
  selectedAttributes: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedCurrency: PropTypes.objectOf(PropTypes.string).isRequired,
  updateCartItemPrice: PropTypes.func.isRequired,
  updateCartItemOption: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
const mapDispatchToProps = () => ({
  updateCartItemPrice,
  updateCartItemOption,
});
export default connect(mapStateToProps, mapDispatchToProps())(ItemInfo);
