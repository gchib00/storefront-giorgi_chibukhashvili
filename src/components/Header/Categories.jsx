import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CategoryButton from './CategoryButton';

const MainContainer = styled.div`
  height: 100%;
  margin-left: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-end;
`;
export default class Categories extends PureComponent {
  render() {
    const options = [
      { type: 'ALL' },
      { type: 'TECH' },
      { type: 'CLOTHES' },
    ];
    return (
      <MainContainer>
        {
          options.map((option) => (
            <CategoryButton key={option.type} optionType={option.type} />
          ))
        }
      </MainContainer>
    );
  }
}
