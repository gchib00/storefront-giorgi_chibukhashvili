import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateCartItemQuantity } from '../../../store/actions';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 137px;;
  justify-content: space-between;
  margin-right: 1rem;
`;
const ModifierBox = styled.div`
  display: block;
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  border: 1px solid #1D1F22;
  text-align: center; 
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
    transition: 300ms;
  }
`;
const Modifier = styled.h1`
  font-family: 'Raleway';
  font-weight: 200;
  position: relative;
  bottom: 1.16rem;
  user-select: none;
`;
const Quantity = styled.h2`
  font-family: 'Raleway';
  font-weight: 200;
  font-size: 1rem;
`;
class QuantityModifier extends PureComponent {
  changeQuantity = (uniqueItemID, quantity, change) => {
    const newQuantity = quantity + change;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.updateCartItemQuantity(uniqueItemID, newQuantity);
  };

  render() {
    const { quantity, uniqueItemID } = this.props;
    return (
      <MainContainer>
        <ModifierBox>
          <Modifier onClick={() => this.changeQuantity(uniqueItemID, quantity, +1)}>+</Modifier>
        </ModifierBox>
        <Quantity>{quantity}</Quantity>
        <ModifierBox>
          <Modifier onClick={() => this.changeQuantity(uniqueItemID, quantity, -1)}>-</Modifier>
        </ModifierBox>
      </MainContainer>
    );
  }
}
QuantityModifier.propTypes = {
  quantity: PropTypes.number.isRequired,
  uniqueItemID: PropTypes.string.isRequired,
  updateCartItemQuantity: PropTypes.func.isRequired,
};
const mapDispatchToProps = () => ({
  updateCartItemQuantity,
});
export default connect(null, mapDispatchToProps())(QuantityModifier);
