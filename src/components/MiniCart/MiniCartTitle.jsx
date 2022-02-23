import React, { PureComponent } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.h3`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
    margin-left: 1rem;
`;
const ItemsAmount = styled.span`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 200;
    font-size: 16px;
    margin-left: 0.5rem;
`;
export default class MiniCartTitle extends PureComponent {
  render() {
    return (
      <MainContainer>
        <Text>My bag.</Text>
        <ItemsAmount>14 items</ItemsAmount>
      </MainContainer>
    );
  }
}
