import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Categories from './Categories';
import Logo from './Logo';
import ActionsMenu from './ActionsMenu';

const MainContainer = styled.div`
  position: relative;
  height: 80px;
  width: 100%;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Raleway', sans-serif;
`;

export default class Header extends PureComponent {
  render() {
    return (
      <MainContainer>
        <Categories />
        <Logo />
        <ActionsMenu />
      </MainContainer>
    );
  }
}
