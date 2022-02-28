import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronLeft from '../../../static/chevronLeft.svg';
import ChevronRight from '../../../static/chevronRight.svg';

const MainContainer = styled.div`
    width: 141px;
    height: 185px;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    z-index: 1;
`;
const Left = styled.img`
    position: relative;
    z-index: 9;
    bottom: 56%;
    cursor: pointer;
`;
const Right = styled.img`
    position: relative;
    z-index: 9;
    bottom: 56%;
    left: 95px;
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
    // if (this.state.index === 0 &&)
    return null;
  };

  render() {
    const { images } = this.props;
    return (
      <MainContainer>
        <Image src={images[this.state.index]} />
        <Left
          onClick={() => this.changeImage(-1)}
          src={ChevronLeft}
          alt="chevron-left"
          style={this.hideArrow()}
        />
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
