/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCartItemPrice, updateCartItemOption } from '../../../store/actions';
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

  setSelectedAttributes = (attribute) => {
    // console.log('attribute=', attribute);
    const { uniqueItemID, cartItems } = this.props;
    console.log(cartItems);
    this.props.updateCartItemOption(uniqueItemID, attribute);
    // let currentState = [...cartItems];
    // // find cartItem that needs to be updated:
    // const updatedItem = currentState.find((cartItem) => cartItem.uniqueItemID === uniqueItemID);
    // // update cartItem's attributes:
    // updatedItem.selectedAttributes = updatedItem.selectedAttributes.map((attr) => {
    //   if (attr.name === attribute.name) {
    //     return attr.option = attribute.option;
    //   }
    //   return attr;
    // });
    // // pass it back to the array - replace the old cartItem with the new one:
    // currentState = currentState.map((cartItem) => {
    //   if (cartItem.uniqueItemID === updatedItem.uniqueItemID) {
    //     return updatedItem;
    //   }
    //   return cartItem;
    // });
    // return this.setState((prevState) => ({
    //   ...prevState,
    //   selectedAttributes: currentState,
    // }));
  };

  render() {
    const { product, selectedAttributes } = this.props;
    const price = this.determineAmount();
    return (
      <MainContainer>
        <ItemTitle>{product.name}</ItemTitle>
        <ItemPrice>{price.symbol} {price.amount}</ItemPrice>
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
  product: PropTypes.object.isRequired,
  uniqueItemID: PropTypes.string.isRequired,
  selectedAttributes: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
  updateCartItemPrice: PropTypes.func.isRequired,
  updateCartItemOption: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  updateCartItemPrice,
  updateCartItemOption,
});
export default connect(mapStateToProps, mapDispatchToProps())(ItemInfo);
