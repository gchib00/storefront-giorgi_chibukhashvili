import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.h3`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  margin-left: 1rem;
`;
const ItemsAmount = styled.span`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  margin-left: 0.5rem;
`;
class MiniCartTitle extends PureComponent {
  getItemsCount = () => {
    const { cartItems } = this.props;
    let counter = 0;
    if (cartItems.length > 0) {
      // eslint-disable-next-line array-callback-return
      cartItems.map((item) => {
        counter += item.quantity;
      });
      return counter;
    }
    return 0;
  };

  render() {
    return (
      <MainContainer>
        <Text>My bag.</Text>
        <ItemsAmount>{this.getItemsCount()}</ItemsAmount>
      </MainContainer>
    );
  }
}
MiniCartTitle.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
export default connect(mapStateToProps)(MiniCartTitle);
