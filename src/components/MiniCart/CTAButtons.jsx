import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div`
  height: 43px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
`;
const ViewbagButton = styled(Link)`
    font-family: 'Raleway', sans-serif;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px; 
    min-width: 150px;
    padding-top:12px;
    background-color: white;
    border: 1px solid black;
    color: black;
    text-align: center;
    &:hover{
        opacity: 0.5;
    }
`;
const CheckoutButton = styled(Link)`
    font-family: 'Raleway', sans-serif;
    text-decoration: none;
    border: none;
    font-weight: 600;
    font-size: 14px;
    min-width: 150px;
    padding-top:13px;
    background-color: #5ECE7B;
    color: white;
    text-align: center;
    &:hover{
        opacity: 0.7;
    }
`;
export default class CTAButtons extends PureComponent {
  render() {
    return (
      <MainContainer>
        <ViewbagButton to="/cart">VIEW BAG</ViewbagButton>
        <CheckoutButton to="/cart">CHECK OUT</CheckoutButton>
      </MainContainer>
    );
  }
}
