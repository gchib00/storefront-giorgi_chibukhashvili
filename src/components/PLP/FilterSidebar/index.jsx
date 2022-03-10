import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ScreenDimmer from '../../Misc/ScreenDimmer';
import FilterItem from './FilterItem';

const MainContainer = styled.div`
  position: absolute;
  top: 80px;
  height: 100vh;
  width: 20vw;
  padding-top: 40px;
  background-color: #ffffff;
  font-family: 'Raleway', sans-serif;
  z-index: 4;
`;
export default class FilterSidebar extends PureComponent {
  state = {
    screenDimmer: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    this.setScreenDimmer(true);
  }

  componentDidUpdate() {
    const { setFilterSlidebar } = this.props;
    if (!this.state.screenDimmer) {
      setFilterSlidebar(false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      return this.props.setFilterSlidebar(false);
    }
    return null;
  };

  setScreenDimmer = (bool) => {
    this.setState((prevState) => ({
      ...prevState,
      screenDimmer: bool,
    }));
  };

  filterAttributes = () => {
    const { allAttributes } = this.props;
    const flattenedArr = allAttributes.flat();
    const filteredAttributes = [];
    flattenedArr.forEach((attr) => {
      if (filteredAttributes.some((attr2) => attr2.name === attr.name)) {
        const index = filteredAttributes.findIndex((attr2) => attr2.name === attr.name);
        attr.items.forEach((option) => {
          const arr = [...filteredAttributes[index].items];
          if (!filteredAttributes[index].items.some((option2) => option2.value === option.value)) {
            arr.push(option);
            filteredAttributes[index] = {
              name: attr.name,
              type: attr.type,
              items: [...arr],
            };
          }
        });
      } else {
        filteredAttributes.push(attr);
      }
    });
    return filteredAttributes.reverse();
  };

  render() {
    if (!this.props.showFilterSidebar) {
      return null;
    }
    const items = this.filterAttributes();
    return (
      <>
        <MainContainer>
          {items.map((item) => (
            <FilterItem item={item} key={item.name} />
          ))}
        </MainContainer>
        <ScreenDimmer
          screenDimmer={this.state.screenDimmer}
          setScreenDimmer={this.setScreenDimmer}
        />
      </>
    );
  }
}
FilterSidebar.propTypes = {
  allAttributes: PropTypes.array.isRequired,
  showFilterSidebar: PropTypes.bool.isRequired,
  setFilterSlidebar: PropTypes.func.isRequired,
};
