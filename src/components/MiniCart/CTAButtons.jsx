import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.div`
  height: 43px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
`;
const ViewbagButton = styled(Link)`
  font-family: 'Raleway', sans-serif;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px; 
  min-width: 150px;
  padding-top:12px;
  background-color: white;
  border: 1px solid black;
  color: black;
  text-align: center;
  &:hover{
    opacity: 0.5;
  }
`;
const CheckoutButton = styled(Link)`
  font-family: 'Raleway', sans-serif;
  text-decoration: none;
  border: none;
  font-weight: 600;
  font-size: 14px;
  min-width: 150px;
  padding-top:13px;
  background-color: #5ECE7B;
  color: white;
  text-align: center;
  &:hover{
    opacity: 0.7;
  }
`;
class CTAButtons extends PureComponent {
  render() {
    if (this.props.cartItems.length < 1) {
      return (
        <MainContainer>
          <h4>Your cart is empty</h4>
        </MainContainer>
      );
    }
    return (
      <MainContainer>
        <ViewbagButton to="/cart">VIEW BAG</ViewbagButton>
        <CheckoutButton to="/cart">CHECK OUT</CheckoutButton>
      </MainContainer>
    );
  }
}
CTAButtons.propTypes = {
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps)(CTAButtons);
