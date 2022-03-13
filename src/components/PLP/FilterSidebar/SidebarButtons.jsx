import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 80%;
  margin: auto;
`;
const Button = styled.button`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 13px; 
  height: 40px;
  width: 90px;
  background-color: white;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
`;
export default class SidebarButtons extends PureComponent {
  handleClose = () => {
    this.props.setFilterSlidebar(false);
  };

  handleReset = () => {
    this.props.updateSearchQueries(null, 'reset');
  };

  render() {
    return (
      <MainContainer>
        <Button onClick={() => this.handleReset()}>RESET</Button>
        <Button onClick={() => this.handleClose()}>CLOSE</Button>
      </MainContainer>
    );
  }
}
SidebarButtons.propTypes = {
  setFilterSlidebar: PropTypes.func.isRequired,
  updateSearchQueries: PropTypes.func.isRequired,
};
