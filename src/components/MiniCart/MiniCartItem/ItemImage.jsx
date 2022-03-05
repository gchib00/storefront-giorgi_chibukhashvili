import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Image = styled.img`
  width: 100px;
  height: 137px;
`;
export default class ItemImage extends PureComponent {
  render() {
    const { image } = this.props;
    return (
      <Image src={image} />
    );
  }
}
ItemImage.propTypes = {
  image: PropTypes.string.isRequired,
};
