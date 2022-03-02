import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CurrencySelector from './CurrencySelector';
import CartOverlay from './CartOverlay';

const ActionsMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 24px;
  width: 220px;
  padding: 40px;
  margin-right: 3rem;
`;

export default class ActionsMenu extends PureComponent {
  render() {
    return (
      <ActionsMenuContainer>
        <CurrencySelector />
        <CartOverlay />
      </ActionsMenuContainer>
    );
  }
}
