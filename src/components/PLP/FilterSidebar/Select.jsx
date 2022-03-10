import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.div`
  height: 80px;
  width: 80%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
const SelectEl = styled.select`
  width: 100%;
  min-height: 30px;
  border-radius: 6px;
  cursor: pointer;
  background: #ffffff;
`;
const Label = styled.label`
  margin-bottom: 5px;
`;
export default class Select extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <MainContainer>
        <Label htmlFor={item.name}>
          {item.name}:
        </Label>
        <SelectEl id={item.name}>
          {item.items.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.value}
              </option>
            );
          })}
        </SelectEl>
      </MainContainer>
    );
  }
}
Select.propTypes = {
  item: PropTypes.object.isRequired,
};
