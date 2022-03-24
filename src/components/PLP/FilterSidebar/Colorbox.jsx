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
    opacity: 0.8;
  }
`;
const Selector = styled.input`
  display: none;
  &:checked + label {
    border: 2px white solid;
    border-radius: 2px;
    box-shadow: 
      inset -1px 1px 6px 3px #959595c1,
      0px 0px 0px 2px black;
    opacity: 0.6;
  }
`;
const wrapStyle = (color) => ({
  backgroundColor: color,
});
export default class Colorbox extends PureComponent {
  handleChange = (e) => {
    const {
      activeBox, attrName, setActiveBox, updateSearchQueries,
    } = this.props;
    const active = e.target.value === activeBox;
    const attrString = `${attrName}?${e.target.value}`;
    if (!active) {
      updateSearchQueries(attrString, 'addExclusive');
      setActiveBox(e.target.value);
    } else {
      updateSearchQueries(attrString, 'remove');
      setActiveBox('');
    }
  };

  render() {
    const { option, activeBox } = this.props;
    return (
      <div key={option.value}>
        <Selector
          type="radio"
          value={option.value}
          readOnly
          checked={option.value === activeBox}
          onClick={(e) => this.handleChange(e)}
          id={option.value}
        />
        <ColorSelectorBox
          htmlFor={option.value}
          style={wrapStyle(option.value)}
        />
      </div>
    );
  }
}
Colorbox.propTypes = {
  attrName: PropTypes.string.isRequired,
  option: PropTypes.objectOf(PropTypes.any).isRequired,
  activeBox: PropTypes.string.isRequired,
  updateSearchQueries: PropTypes.func.isRequired,
  setActiveBox: PropTypes.func.isRequired,
};
