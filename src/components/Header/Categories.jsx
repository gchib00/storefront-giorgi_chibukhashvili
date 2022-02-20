import React, { PureComponent } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  height: 100%;
  margin-left: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-end;
`;
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

export default class Categories extends PureComponent {
  render() {
    return (
      <MainContainer>
        <Radio
          type="radio"
          checked={false}
          // checked={this.props.category === ''}
          // onClick={this.showTech}
          id="allRadioBtn"
          readOnly
        />
        <CategoryLabel htmlFor="allRadioBtn">ALL</CategoryLabel>
        <Radio
          type="radio"
          checked={false}
          // checked={this.props.category === 'tech'}
          // onClick={this.showTech}
          id="techRadioBtn"
          readOnly
        />
        <CategoryLabel htmlFor="techRadioBtn">TECH</CategoryLabel>
        <Radio
          type="radio"
          checked={false}
          // checked={this.props.category === 'clothes'}
          // onClick={this.showClothes}
          id="clothesRadioBtn"
          readOnly
        />
        <CategoryLabel htmlFor="clothesRadioBtn">CLOTHES</CategoryLabel>
      </MainContainer>
    );
  }
}
