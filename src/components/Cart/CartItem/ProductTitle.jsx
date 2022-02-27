import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 27px;
    align-items: center;
    color: #1D1F22;
`;
export default class ProductTitle extends PureComponent {
  render() {
    const { productName } = this.props;
    return (
      <Title>{productName}</Title>
    );
  }
}
ProductTitle.propTypes = {
  productName: PropTypes.string.isRequired,
};
