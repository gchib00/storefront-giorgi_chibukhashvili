import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3rem;
`;
const BrandName = styled.p`
  font-weight: 600;
  font-size: 30px;
  color: #1D1F22;
  margin: 0;
  margin-bottom: 16px;
`;
const ItemName = styled.p`
  font-weight: 400;
  font-size: 30px;
  color: #1D1F22;
  margin: 0;
`;
export default class ProductName extends PureComponent {
  render() {
    const { brand, name } = this.props;
    return (
      <MainContainer>
        <BrandName>{brand}</BrandName>
        <ItemName>{name}</ItemName>
      </MainContainer>
    );
  }
}
ProductName.propTypes = {
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
