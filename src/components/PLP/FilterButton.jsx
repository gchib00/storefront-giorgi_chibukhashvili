import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FilterSVG from '../../static/filter.svg';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 0;
  top: -70px;
  height: 44px;
  width: 50px;
  background-color: #5ECE7B;
  border-radius: 0px 8px 8px 0px;
  cursor: pointer;
`;
const Filter = styled.img`
  margin-right: 5px;
  height: 30px;
  width: 26px;
`;
export default class FilterButton extends PureComponent {
  setFilterSidebar = (e) => {
    alert(`${e.target} was clicked`);
  };

  render() {
    return (
      <MainContainer onClick={(e) => this.setFilterSidebar(e)}>
        <Filter src={FilterSVG} alt="filter-icon" />
      </MainContainer>
    );
  }
}
