import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    opacity: 0.6;
  }
`;
export default class Colorbox extends PureComponent {
  state = {
    active: false,
  };

  wrapStyle = (backgroundColor) => {
    return {
      backgroundColor,
    };
  };

  handleChange = (e) => {
    const { active } = this.state;
    const { attrName } = this.props;
    const attrString = `${attrName}?${e.target.value}`;
    if (!active) {
      this.props.updateSearchQueries(attrString, 'add');
      this.setState((prevState) => ({
        ...prevState,
        active: true,
      }));
    } else {
      this.props.updateSearchQueries(attrString, 'remove');
      this.setState((prevState) => ({
        ...prevState,
        active: false,
      }));
    }
  };

  render() {
    const { option } = this.props;
    return (
      <div key={option.value}>
        <Selector
          type="radio"
          value={option.value}
          readOnly
          checked={this.state.active}
          onClick={(e) => this.handleChange(e)}
          id={option.value}
        />
        <ColorSelectorBox
          htmlFor={option.value}
          style={this.wrapStyle(option.value)}
        />
      </div>
    );
  }
}
Colorbox.propTypes = {
  attrName: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  updateSearchQueries: PropTypes.func.isRequired,
};
