import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCategory } from '../../store/actions';

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
  &:hover{
    border-bottom: 2px solid #5ECE7B;
    color: #5ECE7B;
  }
  background: transparent;
`;
export class CategoryButton extends PureComponent {
  render() {
    const { selectedCategory, optionType } = this.props;
    return (
      <>
        <Radio
          type="radio"
          checked={selectedCategory === optionType}
          onClick={() => this.props.changeCategory(optionType)}
          id={optionType}
          readOnly
        />
        <CategoryLabel htmlFor={optionType}>
          {optionType}
        </CategoryLabel>
      </>
    );
  }
}
CategoryButton.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  optionType: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCategory: state.selectedCategory,
});
const mapDispatchToProps = () => ({
  changeCategory,
});

export default connect(mapStateToProps, mapDispatchToProps())(CategoryButton);
