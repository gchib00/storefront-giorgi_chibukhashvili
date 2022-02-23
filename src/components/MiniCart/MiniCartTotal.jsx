import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
export default class MiniCartTotal extends PureComponent {
  render() {
    return (
      <Total>MiniCartTotal</Total>
    );
  }
}
