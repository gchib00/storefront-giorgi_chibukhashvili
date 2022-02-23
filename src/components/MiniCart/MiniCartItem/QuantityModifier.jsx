import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  width: 25px;
  height: 25px;
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
  font-size: 1.6rem;
  position: relative;
  bottom: 1.28rem;
  user-select: none;
`;
const Quantity = styled.h2`
    font-family: 'Raleway';
    font-weight: 200;
    font-size: 1rem;
`;
export default class QuantityModifier extends PureComponent {
  render() {
    const { quantity } = this.props;
    return (
      <MainContainer>
        <ModifierBox>
          <Modifier onClick={this.addOne}>+</Modifier>
        </ModifierBox>
        <Quantity>{quantity}</Quantity>
        <ModifierBox>
          <Modifier onClick={this.subtractOne}>-</Modifier>
        </ModifierBox>
      </MainContainer>
    );
  }
}
QuantityModifier.propTypes = {
  quantity: PropTypes.number.isRequired,
};
