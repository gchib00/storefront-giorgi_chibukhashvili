import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 137px;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
export default class ItemImage extends PureComponent {
  render() {
    const { image } = this.props;
    return (
      <Container>
        <Image src={image} />
      </Container>
    );
  }
}
ItemImage.propTypes = {
  image: PropTypes.string.isRequired,
};
