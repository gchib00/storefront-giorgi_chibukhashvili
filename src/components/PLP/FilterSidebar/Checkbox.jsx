import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckmarkSVG from '../../../static/checkmark.svg';

const MainContainer = styled.div`
  height: 40px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
const Input = styled.input`
  display: none;
`;
const CheckboxEl = styled.label`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;
  transition: 100ms;
`;
const CheckmarkEl = styled.img`
  width: 100%;
  height: 100%;
`;
export default class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  componentDidUpdate() {
    const { searchQueries, item } = this.props;
    if (searchQueries && searchQueries.includes(item.name)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((prevState) => ({
        ...prevState,
        checked: true,
      }));
    }
  }

  handleChange = () => {
    const { item, updateSearchQueries } = this.props;
    const { name } = item;
    const { checked } = this.state;
    if (!checked) {
      updateSearchQueries(name, 'add');
    } else {
      updateSearchQueries(name, 'remove');
    }
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
  };

  render() {
    const { item } = this.props;
    const { checked } = this.state;
    return (
      <MainContainer>
        {item.name}
        <CheckboxEl
          htmlFor={item.name}
          style={checked ? { background: '#5ECE7B' } : { background: '#FFFFFF' }}
        >
          <Input type="checkbox" id={item.name} onChange={() => this.handleChange()} />
          <CheckmarkEl src={CheckmarkSVG} />
        </CheckboxEl>
      </MainContainer>
    );
  }
}
Checkbox.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/require-default-props
  searchQueries: PropTypes.arrayOf(PropTypes.string),
  updateSearchQueries: PropTypes.func.isRequired,
};
