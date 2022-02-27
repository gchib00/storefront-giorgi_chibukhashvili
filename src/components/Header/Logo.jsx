import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
        <Link to="/">
          <img src={LogoSVG} alt="logo" />
        </Link>
      </LogoContainer>
    );
  }
}
