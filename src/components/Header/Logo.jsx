import React, { PureComponent } from 'react';
import styled from 'styled-components';
import LogoSVG from '../../static/logo.svg';

const LogoContainer = styled.div`
  width: 68vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default class Logo extends PureComponent {
  render() {
    return (
      <LogoContainer>
        <img src={LogoSVG} alt="logo" />
      </LogoContainer>
    );
  }
}
