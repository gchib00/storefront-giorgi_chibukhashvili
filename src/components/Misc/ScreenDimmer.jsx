import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { setScreenDimmer, setMiniCart } from '../../store/actions';

const Dimmer = styled.div`
  position: fixed; 
  overflow: auto; 
  width: 100vw; 
  height: 100vh; 
  top: 0px;
  background: rgba(57, 55, 72, 0.22);
  z-index: 2;
`;
class ScreenDimmer extends PureComponent {
  closeModal = () => {
    this.props.setScreenDimmer(false);
    if (this.props.miniCart) {
      this.props.setMiniCart(false);
    }
  };

  render() {
    const { screenDimmer } = this.props;
    if (!screenDimmer) {
      return null;
    }
    return (
      <Dimmer onClick={() => this.closeModal()} />
    );
  }
}
ScreenDimmer.propTypes = {
  screenDimmer: PropTypes.bool.isRequired,
  setScreenDimmer: PropTypes.func.isRequired,
  miniCart: PropTypes.bool.isRequired,
  setMiniCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  screenDimmer: state.screenDimmer,
  miniCart: state.miniCart,
});
const mapDispatchToProps = () => ({
  setScreenDimmer,
  setMiniCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(ScreenDimmer);
