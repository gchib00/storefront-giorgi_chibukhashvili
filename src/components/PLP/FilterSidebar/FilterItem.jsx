import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Select from './Select';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export default class FilterItem extends PureComponent {
  render() {
    console.log('item=', this.props.item);
    return (
      <MainContainer>
        <Checkbox item={this.props.item} />
        <Select item={this.props.item} />
      </MainContainer>
    );
  }
}
FilterItem.propTypes = {
  item: PropTypes.object.isRequired,
};
