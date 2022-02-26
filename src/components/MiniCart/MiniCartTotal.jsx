import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
const TotalTitle = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
`;
const TotalPrice = styled.p`
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
class MiniCartTotal extends Component {
  state = {
    total: 0,
  };

  componentDidMount() {
    let newTotal = 0;
    // eslint-disable-next-line array-callback-return
    this.props.cartItems.map((item) => {
      console.log('cartItems=');
      console.log(item);
      const itemCost = item.productPrice * item.quantity;
      newTotal = itemCost;
    });
    this.setState((prevState) => ({
      ...prevState,
      total: newTotal,
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
      let newTotal = 0;
      // eslint-disable-next-line array-callback-return
      this.props.cartItems.map((item) => {
        const itemCost = item.productPrice * item.quantity;
        newTotal += itemCost;
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((prevState) => ({
        ...prevState,
        total: newTotal,
      }));
    }
    if (this.props.cartItems !== prevProps.cartItems) {
      this.props.cartItems.map((item) => {
        const itemCost = item.productPrice * item.quantity;
        return this.setState((prevState) => ({
          ...prevState,
          total: itemCost,
        }));
      });
    }
  }

  render() {
    const { selectedCurrency, cartItems } = this.props;
    if (cartItems.length < 1) {
      return null;
    }
    return (
      <MainContainer>
        <TotalTitle>Total</TotalTitle>
        <TotalPrice>{selectedCurrency.symbol} {this.state.total}</TotalPrice>
      </MainContainer>
    );
  }
}
MiniCartTotal.propTypes = {
  selectedCurrency: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  // cartTotal: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
  cartItems: state.cartItems,
  cartTotal: state.cartTotal,
});
export default connect(mapStateToProps)(MiniCartTotal);
