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
    border: 2px black solid;
    opacity: 0.7;
  }
`;
export default class AttributeColorSelectors extends PureComponent {
  // AttributeSelectors is reused in multiple locations and it's necessary
  // to have a way to determine via props whether the option boxes should be small or standard
  determineBoxSize = () => {
    const { optionBoxSize } = this.props;
    if (optionBoxSize && optionBoxSize === 'small') {
      return { height: '33px', width: '33px' };
    }
    return { height: '45px', width: '63px' };
  };

  wrapStyle = (backgroundColor) => {
    const wrapObj = this.determineBoxSize();
    wrapObj.backgroundColor = backgroundColor;
    return wrapObj;
  };

  saveChoice = (option) => {
    const { attribute, setSelectedAttributes } = this.props;
    const { name } = attribute;
    const attributeChoice = { name, option };
    setSelectedAttributes(attributeChoice);
  };

  populateOption = (attributeName, optionValue) => {
    const { selectedAttributes } = this.props;
    const match = selectedAttributes.find((selectedAttr) => (
      selectedAttr.name === attributeName && selectedAttr.option.value === optionValue
    ));
    if (match) {
      return true;
    }
    return false;
  };

  render() {
    const { attribute } = this.props;
    return (
      attribute.items.map((option) => (
        <div key={option.id}>
          <Selector
            type="radio"
            value={option.value}
            checked={this.populateOption(attribute.name, option.value)}
            readOnly
            onClick={() => this.saveChoice(option)}
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
  selectedAttributes: PropTypes.array.isRequired,
  setSelectedAttributes: PropTypes.func.isRequired,
};
