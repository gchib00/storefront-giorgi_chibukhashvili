import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: grid;
  grid-template-rows: 100px 100px 100px 100px 100px;
  grid-template-columns: 120px;
  grid-gap: 20px;
`;
const SideImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  cursor: pointer;
`;
const SideImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
export default class SideImages extends PureComponent {
  handleChange = (img, images) => {
    const { changeMainImage } = this.props;
    const newIndex = images.indexOf(img); // determine index of the clicked image
    changeMainImage(newIndex);
  };

  renderSideImages = (images) => {
    const array = [];
    if (images) {
      images.map((img) => array.push(
        <SideImageContainer key={img}>
          <SideImage
            src={img}
            alt="side image"
            onClick={() => this.handleChange(img, images)}
          />
        </SideImageContainer>,
      ));
    } else {
      return null;
    }
    return array;
  };

  render() {
    const { images } = this.props;
    return (
      <MainContainer>{this.renderSideImages(images)}</MainContainer>
    );
  }
}
SideImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeMainImage: PropTypes.func.isRequired,
};
