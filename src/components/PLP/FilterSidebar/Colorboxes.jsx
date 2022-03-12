/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colorbox from './Colorbox';

const MainContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export default class Colorboxes extends PureComponent {
  state = {
    activeBox: '',
  };

  componentDidUpdate() {
    const { searchQueries, item } = this.props;
    if (searchQueries && searchQueries.some((attr) => attr.includes(item.name))) {
      let selectedColorVal = searchQueries.find((attr) => attr.includes(item.name));
      // eslint-disable-next-line prefer-destructuring
      selectedColorVal = selectedColorVal.split('?')[1];
      this.setState((prevState) => ({
        ...prevState,
        activeBox: selectedColorVal,
      }));
    }
  }

  setActiveBox = (value) => {
    this.setState((prevState) => ({
      ...prevState,
      activeBox: value,
    }));
  };

  render() {
    const { item } = this.props;
    return (
      <MainContainer>
        {item.items.map((option) => (
          <Colorbox
            attrName={item.name}
            option={option}
            updateSearchQueries={this.props.updateSearchQueries}
            setActiveBox={this.setActiveBox}
            activeBox={this.state.activeBox}
            key={option.value}
          />
        ))}
      </MainContainer>
    );
  }
}
Colorboxes.propTypes = {
  item: PropTypes.object.isRequired,
  searchQueries: PropTypes.array,
  updateSearchQueries: PropTypes.func.isRequired,
};
