import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScreenDimmer from '../../Misc/ScreenDimmer';

const MainContainer = styled.div`
  position: absolute;
  top: 80px;
  height: 100vh;
  width: 20vw;
  background-color: #ffffff;
  border: 2px solid black;
  z-index: 4;
`;
class FilterSidebar extends PureComponent {
  state = {
    screenDimmer: false,
  };

  componentDidMount() {
    this.setScreenDimmer(true);
  }

  componentDidUpdate(prevState) {
    if (prevState.screenDimmer !== this.state.screenDimmer) {
      this.props.setFilterSlidebar(false);
    }
  }

  componentWillUnmount() {
    this.setScreenDimmer(true);
  }

  setScreenDimmer = (bool) => {
    this.setState((prevState) => ({
      ...prevState,
      screenDimmer: bool,
    }));
  };

  render() {
    if (!this.props.showFilterSidebar) {
      return null;
    }
    return (
      <>
        <MainContainer>FilterSidebar</MainContainer>
        <ScreenDimmer
          screenDimmer={this.state.screenDimmer}
          setScreenDimmer={this.setScreenDimmer}
        />
      </>
    );
  }
}
FilterSidebar.propTypes = {
  showFilterSidebar: PropTypes.bool.isRequired,
  setFilterSlidebar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCategory: state.selectedCategory,
});
export default connect(mapStateToProps, null)(FilterSidebar);
