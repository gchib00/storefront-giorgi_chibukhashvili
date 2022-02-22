import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: 100px 100px 100px 100px 100px;
    grid-template-columns: 120px;
    grid-gap: 20px;
`;
const SideImage = styled.img`
    height: 100px;
    width: 100px;
`;
export default class SideImages extends PureComponent {
  renderSideImages = (images) => {
    const array = [];
    if (images) {
      images.map((img) => array.push(
        <SideImage
          src={img}
          alt="side image"
          key={img}
          onClick={() => this.updateImgIndex(img)}
        />,
      ));
    } else {
      return null;
    }
    return array;
  };

  render() {
    return (
      <MainContainer>{this.renderSideImages(this.props.images)}</MainContainer>
    );
  }
}
SideImages.propTypes = {
  images: PropTypes.array.isRequired,
};
