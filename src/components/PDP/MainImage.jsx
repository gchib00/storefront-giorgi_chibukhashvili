import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 610px;
  margin: 0 25px 0 25px;
  margin: 0;
`;
const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
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
