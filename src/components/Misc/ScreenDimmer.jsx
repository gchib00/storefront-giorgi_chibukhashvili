import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    const { setScreenDimmer } = this.props;
    setScreenDimmer(false);
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
};

export default ScreenDimmer;
