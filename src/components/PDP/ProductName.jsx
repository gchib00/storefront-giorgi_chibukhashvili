import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Name = styled.h1`
    display: flex;
    justify-content: flex-start;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 3rem;
`;
export default class ProductName extends PureComponent {
  render() {
    const { name } = this.props;
    return (
      <Name>{name}</Name>
    );
  }
}
ProductName.propTypes = {
  name: PropTypes.string.isRequired,
};
