import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Radio = styled.input`
  display: none;
  &:checked + label {
    color: #5ECE7B;
    border-bottom: 2px solid #5ECE7B;
  }
`;
const CategoryLabel = styled.label`
  display: block;
  box-sizing: border-box;
  height: 46px;
  min-width: 97px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: black;
  border: none;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid #5ECE7B;
    color: #5ECE7B;
  }
  background: transparent;
`;
export default class CategoryButton extends PureComponent {
  render() {
    const { category, selectedCategory, handleCategoryChange } = this.props;
    const categoryName = category.toUpperCase();
    return (
      <>
        <Radio
          type="radio"
          checked={selectedCategory === category}
          onClick={() => handleCategoryChange(category)}
          id={category}
          readOnly
        />
        <CategoryLabel htmlFor={category}>
          {categoryName}
        </CategoryLabel>
      </>
    );
  }
}
CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};
