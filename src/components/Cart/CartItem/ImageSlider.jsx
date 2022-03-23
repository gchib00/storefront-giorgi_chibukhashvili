import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronLeft from '../../../static/chevronLeft.svg';
import ChevronRight from '../../../static/chevronRight.svg';

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 141px;
  height: 185px;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
`;
const Left = styled.img`
  position: relative;
  left: 24px;
  margin-left: -24px;
  z-index: 9;
  cursor: pointer;
`;
const Right = styled.img`
  position: relative;
  right: 24px;
  margin-right: -24px;
  z-index: 9;
  cursor: pointer;
`;

export default class ImageSlider extends PureComponent {
  state = {
    index: 0,
  };

  changeImage = (direction) => {
    const { images } = this.props;
    const { index } = this.state;
    if (index + direction < 0 || index + direction === images.length) {
      return null;
    }
    return this.setState((prevState) => ({
      ...prevState,
      index: prevState.index + direction,
    }));
  };

  hideArrow = () => {
    const { images } = this.props;
    if (images.length === 1) {
      return { display: 'none' };
    }
    return null;
  };

  render() {
    const { images } = this.props;
    return (
      <MainContainer>
        <Left
          onClick={() => this.changeImage(-1)}
          src={ChevronLeft}
          alt="chevron-left"
          style={this.hideArrow()}
        />
        <Image src={images[this.state.index]} />
        <Right
          onClick={() => this.changeImage(+1)}
          src={ChevronRight}
          alt="chevron-right"
          style={this.hideArrow()}
        />
      </MainContainer>
    );
  }
}
ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
};
