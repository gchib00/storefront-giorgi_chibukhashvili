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
  render() {
    const { item } = this.props;
    return (
      <MainContainer>
        {item.items.map((option) => (
          <Colorbox
            attrName={item.name}
            option={option}
            updateSearchQueries={this.props.updateSearchQueries}
            key={option.value}
          />
        ))}
      </MainContainer>
    );
  }
}
Colorboxes.propTypes = {
  item: PropTypes.object.isRequired,
  updateSearchQueries: PropTypes.func.isRequired,
};
