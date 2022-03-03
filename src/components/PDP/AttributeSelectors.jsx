import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectorBox = styled.label`
  display: flex;
  box-sizing: border-box;
  width: 63px;
  height: 45px;
  border: 1px solid #1D1F22;
  align-items: center;
  justify-content: center; 
  background-color: white;
  cursor: pointer;
  padding-top: 14px;
  padding-bottom: 14px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: black;
    color: white;
    transition: 300ms;
  }
`;
const Selector = styled.input`
  display: none;
  &:checked + label {
    background-color: black;
    color: white;
  }
`;
export default class AttributeSelectors extends PureComponent {
  determineBoxSize = () => {
    // AttributeSelectors is reused in multiple locations and it's necessary
    // to have a way to determine via props whether the option boxes should be small or standard
    const { optionBoxSize } = this.props;
    if (optionBoxSize && optionBoxSize === 'small') {
      return {
        height: '33px',
        width: '33px',
        fontSize: '0.78rem',
        padding: 0,
      };
    }
    return null;
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
        <div key={attribute.name + option.id}>
          <Selector
            type="radio"
            value={option.value}
            checked={this.populateOption(attribute.name, option.value)}
            readOnly
            onClick={() => this.saveChoice(option)}
            id={attribute.name + option.id}
          />
          <SelectorBox htmlFor={attribute.name + option.id} style={this.determineBoxSize()}>
            {option.value}
          </SelectorBox>
        </div>
      ))
    );
  }
}
AttributeSelectors.propTypes = {
  attribute: PropTypes.object.isRequired,
  optionBoxSize: PropTypes.string,
  selectedAttributes: PropTypes.array.isRequired,
  setSelectedAttributes: PropTypes.func.isRequired,
};
