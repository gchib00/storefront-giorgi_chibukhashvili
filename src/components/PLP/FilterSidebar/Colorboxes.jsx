import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const ColorSelectorBox = styled.label`
  display: block;
  box-sizing: border-box;
  width: 33px;
  height: 33px;
  border: 1px solid #1D1F22;
  align-items: center;
  text-align: center; 
  cursor: pointer;
  padding-top: 14px;
  padding-bottom: 14px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  background-color: black;
  opacity: 1;
  &:hover {
    border: 2px black solid;
  }
`;
const Selector = styled.input`
  display: none;
  &:checked + label {
    border: 2px black solid;
    opacity: 0.7;
  }
`;
// const Title = styled.p`
//   margin-bottom: 5px;
// `;
export default class Colorboxes extends PureComponent {
  timestampID = (str1) => {
    // timestamping id or key values is necessary because user might select
    // items that are of the same exact name and option(s)
    return str1 + Date.now();
  };

  wrapStyle = (backgroundColor) => {
    return {
      backgroundColor,
    };
  };

  render() {
    const { item } = this.props;
    return (
      <MainContainer>
        {item.items.map((option) => (
          <div key={this.timestampID(option.id)}>
            <Selector
              type="radio"
              value={option.value}
              readOnly
              onClick={() => alert('clicked color-box')}
              id={this.timestampID(option.id)}
            />
            <ColorSelectorBox
              htmlFor={this.timestampID(option.id)}
              style={this.wrapStyle(option.value)}
            />
          </div>
        ))}
      </MainContainer>
    );
  }
}
Colorboxes.propTypes = {
  item: PropTypes.object.isRequired,
};
