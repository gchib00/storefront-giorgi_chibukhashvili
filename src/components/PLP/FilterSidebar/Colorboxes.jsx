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
  constructor(props) {
    super(props);
    this.state = {
      activeBox: '',
    };
  }

  componentDidUpdate() {
    const { searchQueries, item } = this.props;
    if (searchQueries && searchQueries.some((attr) => attr.includes(item.name))) {
      let selectedColorVal = searchQueries.find((attr) => attr.includes(item.name));
      // eslint-disable-next-line prefer-destructuring
      selectedColorVal = selectedColorVal.split('?')[1];
      // eslint-disable-next-line react/no-did-update-set-state
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
    const { item, updateSearchQueries } = this.props;
    const { activeBox } = this.state;
    return (
      <MainContainer>
        {item.items.map((option) => (
          <Colorbox
            attrName={item.name}
            option={option}
            updateSearchQueries={updateSearchQueries}
            setActiveBox={this.setActiveBox}
            activeBox={activeBox}
            key={option.value}
          />
        ))}
      </MainContainer>
    );
  }
}
Colorboxes.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/require-default-props
  searchQueries: PropTypes.arrayOf(PropTypes.string),
  updateSearchQueries: PropTypes.func.isRequired,
};
