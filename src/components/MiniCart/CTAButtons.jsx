import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withNavigate from '../HigherOrderComponents';
import { setMiniCart } from '../../store/actions';

const MainContainer = styled.div`
  height: 43px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;
const ViewbagButton = styled.button`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 14px; 
  min-width: 150px;
  background-color: white;
  border: 1px solid black;
  color: black;
  text-align: center;
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
`;
const CheckoutButton = styled.button`
  font-family: 'Raleway', sans-serif;
  border: none;
  font-weight: 600;
  font-size: 14px;
  min-width: 150px;
  background-color: #5ECE7B;
  color: white;
  text-align: center;
  cursor: pointer;
  &:hover{
    opacity: 0.7;
  }
`;
class CTAButtons extends PureComponent {
  render() {
    const { cartItems, navigate } = this.props;
    if (cartItems.length < 1) {
      return (
        <MainContainer>
          <h4>Your cart is empty</h4>
        </MainContainer>
      );
    }
    return (
      <MainContainer>
        <ViewbagButton
          onClick={() => {
            navigate('/cart');
            this.props.setMiniCart(false);
          }}
        >VIEW BAG
        </ViewbagButton>
        <CheckoutButton
          onClick={() => {
            navigate('/cart');
            this.props.setMiniCart(false);
          }}
        >CHECK OUT
        </CheckoutButton>
      </MainContainer>
    );
  }
}
CTAButtons.propTypes = {
  cartItems: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  setMiniCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  setMiniCart,
});
export default withNavigate(connect(mapStateToProps, mapDispatchToProps())(CTAButtons));
