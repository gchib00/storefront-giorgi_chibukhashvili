/* eslint-disable react/no-did-update-set-state */
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
  border: 1px solid black;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  background: #ffffff;
`;
const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;
export default class Select extends PureComponent {
  state = {
    selectedOption: '',
  };

  componentDidUpdate(_prevProps, prevState) {
    const { selectedOption } = this.state;
    const { searchQueries, item } = this.props;
    if (prevState.selectedOption !== selectedOption) {
      const attrName = item.name;
      const attrString = `${attrName}?${selectedOption}`;
      if (selectedOption !== '-') {
        return this.props.updateSearchQueries(attrString, 'addExclusive');
      }
      return this.props.updateSearchQueries(attrString, 'remove');
    }
    if (searchQueries && searchQueries.some((attr) => attr.includes(item.name))) {
      let selectedColorVal = searchQueries.find((attr) => attr.includes(item.name));
      // eslint-disable-next-line prefer-destructuring
      selectedColorVal = selectedColorVal.split('?')[1];
      return this.setState(() => ({
        ...prevState,
        selectedOption: selectedColorVal,
      }));
    }
    return null;
  }

  handleChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedOption: e.target.value,
    }));
  };

  render() {
    const { item } = this.props;
    const options = [...item.items];
    return (
      <MainContainer>
        <Label htmlFor={item.name}>
          {item.name}:
        </Label>
        <SelectEl
          id={item.name}
          value={this.state.selectedOption}
          onChange={(e) => this.handleChange(e)}
        >
          <option>-</option>
          {options.map((option) => {
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
  searchQueries: PropTypes.array,
  updateSearchQueries: PropTypes.func.isRequired,
};
