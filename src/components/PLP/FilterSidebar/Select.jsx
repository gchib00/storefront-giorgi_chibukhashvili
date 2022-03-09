import React, { PureComponent } from 'react';
import styled from 'styled-components';

const SelectEl = styled.select`
  width: 80%;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  background: #ffffff;
`;
export default class Select extends PureComponent {
  render() {
    return (
      <SelectEl name="items">
        <option value="test">Test</option>
      </SelectEl>
    );
  }
}
