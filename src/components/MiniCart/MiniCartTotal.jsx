import React, { PureComponent } from 'react';
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
  margin: 1.5rem 0px 1.5rem 0px;
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
class MiniCartTotal extends PureComponent {
  state = {
    total: 0,
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedCurrency !== prevProps.selectedCurrency
      || this.props.cartItems !== prevProps.cartItems) {
      this.updateTotal();
    }
  }

  updateTotal = () => {
    let newTotal = 0;
    this.props.cartItems.forEach((item) => {
      const itemCost = item.productPrice * item.quantity;
      newTotal += itemCost;
    });
    this.setState((prevState) => ({
      ...prevState,
      total: newTotal.toFixed(2),
    }));
  };

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
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
  cartItems: state.cartItems,
});
export default connect(mapStateToProps)(MiniCartTotal);
