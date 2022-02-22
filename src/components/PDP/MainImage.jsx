import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 704px;
    width: 610px;
    margin: 25px;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
`;
export default class MainImage extends PureComponent {
  render() {
    return (
      <MainImageContainer>
        <Image alt="main image" src={this.props.image} />
      </MainImageContainer>
    );
  }
}
MainImage.propTypes = {
  image: PropTypes.string.isRequired,
};
