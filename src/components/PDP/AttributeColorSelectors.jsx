/* eslint-disable no-sequences */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColorSelectorBox = styled.label`
  display: block;
  box-sizing: border-box;
  width: 63px;
  height: 45px;
  border: 1px solid #1D1F22;
  align-items: center;
  text-align: center; 
  cursor: pointer;
  padding-top: 14px;
  padding-bottom: 14px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  background-color: black;
  opacity: 1;
  &:hover {
    border: 2px black solid;
  }
`;
const Selector = styled.input`
  display: none;
  &:checked + label {
    background-color: black;
    color: white;
  }
  &:checked + #colorbox {
    opacity: 0.7;
    border: 3px black solid;
  }
`;
export default class AttributeColorSelectors extends PureComponent {
  // AttributeSelectors is reused in multiple locations and it's necessary
  // to have a way to determine via props whether the option boxes should be small or standard
  determineBoxSize = () => {
    const { optionBoxSize } = this.props;
    if (optionBoxSize && optionBoxSize === 'small') {
      return {
        height: '33px',
        width: '33px',
      };
    }
    return {
      height: '45px',
      width: '63px',
    };
  };

  wrapStyle = (backgroundColor) => {
    const wrapObj = this.determineBoxSize();
    wrapObj.backgroundColor = backgroundColor;
    return wrapObj;
  };

  render() {
    const { attribute } = this.props;
    return (
      attribute.items.map((option) => (
        <div key={option.id}>
          <Selector
            type="radio"
            value={option.value}
            // defaultChecked={this.populateOptions(attribute.name, item.value)}
            onClick={() => alert(`clicked option ${option.value}`)}
            id={option.id}
          />
          <ColorSelectorBox
            htmlFor={option.id}
            style={this.wrapStyle(option.value)}
          />
        </div>
      ))
    );
  }
}
AttributeColorSelectors.propTypes = {
  attribute: PropTypes.object.isRequired,
  optionBoxSize: PropTypes.string,
};
