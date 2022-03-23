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
const OutOfStockText = styled.p`
  position: relative;
  bottom: 50%;
  text-align: center;
  text-decoration: none;
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 34px;
  color: grey;
`;
export default class MainImage extends PureComponent {
  outofstockStyle = (inStock) => {
    if (!inStock) {
      return { opacity: 0.3 };
    }
    return null;
  };

  outofstockText = (inStock) => {
    if (!inStock) {
      return 'OUT OF STOCK';
    }
    return null;
  };

  render() {
    const { available } = this.props;
    return (
      <MainImageContainer>
        <div>
          <Image
            alt="main image"
            src={this.props.image}
            style={this.outofstockStyle(available)}
          />
          <OutOfStockText>{this.outofstockText(available)}</OutOfStockText>
        </div>
      </MainImageContainer>
    );
  }
}
MainImage.propTypes = {
  image: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
};
