import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
`;
const BrandName = styled.p`
  font-weight: 300;
  font-size: 16px;
  color: #1D1F22;
  margin: 0;
  margin-bottom: 8px;
`;
const ItemName = styled.p`
  font-weight: 300;
  font-size: 16px;
  color: #1D1F22;
  margin: 0;
`;
export default class ItemTitle extends PureComponent {
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
ItemTitle.propTypes = {
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
