import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ScreenDimmer from '../../Misc/ScreenDimmer';
import FilterItem from './FilterItem';
import withRouter from '../../HigherOrderComponents';

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
class FilterSidebar extends PureComponent {
  state = {
    screenDimmer: false,
    searchQueries: [],
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    this.setScreenDimmer(true);
    this.setState((prevState) => ({
      ...prevState,
      searchQueries: this.props.searchParams.getAll('attr'),
    }));
  }

  componentDidUpdate(_prevProps, prevState) {
    const { setFilterSlidebar } = this.props;
    if (!this.state.screenDimmer) {
      setFilterSlidebar(false);
    }
    if (prevState.searchQueries !== this.state.searchQueries) {
      this.props.setSearchParams({
        attr: this.state.searchQueries,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  updateSearchQueries = (newAttr, method) => {
    let arr = [...this.state.searchQueries];
    if (method === 'add') {
      arr.push(newAttr);
    } else if (method === 'remove') {
      // arr = arr.filter((attr) => attr !== newAttr);
      arr = arr.filter((attr) => {
        const str1 = attr.split('?')[0];
        const str2 = newAttr.split('?')[0];
        return str1 !== str2;
      });
    } else if (method === 'addExclusive') {
      arr = arr.filter((attr) => {
        const str1 = attr.split('?')[0];
        const str2 = newAttr.split('?')[0];
        return str1 !== str2;
      });
      arr.push(newAttr);
    }
    this.setState((prevState) => ({
      ...prevState,
      searchQueries: [...arr],
    }));
  };

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
            <FilterItem
              item={item}
              key={item.name}
              searchQueries={this.state.searchQueries}
              updateSearchQueries={this.updateSearchQueries}
            />
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
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};
export default withRouter(FilterSidebar);
