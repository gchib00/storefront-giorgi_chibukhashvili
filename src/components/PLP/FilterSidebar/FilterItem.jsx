import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Select from './Select';
import Colorboxes from './Colorboxes';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem 0rem 0.5rem 0rem;
`;
export default class FilterItem extends PureComponent {
  determineComp = () => {
    const { item } = this.props;
    if (item.type === 'swatch') {
      return 'colorboxes';
    }
    if (item.type === 'text' && item.items.length === 2 && item.items.some((opt) => opt.value === 'Yes')) {
      return 'checkbox';
    }
    return 'select';
  };

  render() {
    switch (this.determineComp()) {
      case ('checkbox'): {
        return (
          <MainContainer>
            <Checkbox
              item={this.props.item}
              updateSearchQueries={this.props.updateSearchQueries}
            />
          </MainContainer>
        );
      }
      case ('colorboxes'): {
        return (
          <MainContainer>
            <Colorboxes
              item={this.props.item}
              updateSearchQueries={this.props.updateSearchQueries}
            />
          </MainContainer>
        );
      }
      default: {
        return (
          <MainContainer>
            <Select
              item={this.props.item}
              updateSearchQueries={this.props.updateSearchQueries}
            />
          </MainContainer>
        );
      }
    }
  }
}
FilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateSearchQueries: PropTypes.func.isRequired,
};
