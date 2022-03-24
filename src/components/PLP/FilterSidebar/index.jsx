import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ScreenDimmer from '../../Misc/ScreenDimmer';
import FilterItem from './FilterItem';
import withRouter from '../../HigherOrderComponents';
import SidebarButtons from './SidebarButtons';

const MainContainer = styled.div`
  position: absolute;
  top: 80px;
  width: 20vw;
  padding-top: 40px;
  background-color: #ffffff;
  font-family: 'Raleway', sans-serif;
  z-index: 4;
`;
class FilterSidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenDimmer: false,
      searchQueries: [],
      keyExtraVal: '',
      // keyExtraVal is needed for resetting the state of child-components when
      // the reset button is clicked. Changing the key will force-reset
      // the states of child-components
    };
  }

  componentDidMount() {
    const { searchParams } = this.props;
    document.addEventListener('click', this.handleClickOutside, true);
    this.setScreenDimmer(true);
    this.setState((prevState) => ({
      ...prevState,
      searchQueries: searchParams.getAll('attr'),
    }));
  }

  componentDidUpdate(_prevProps, prevState) {
    const { setFilterSlidebar, setSearchParams } = this.props;
    const { screenDimmer, searchQueries } = this.state;
    if (!screenDimmer) {
      setFilterSlidebar(false);
    }
    if (prevState.searchQueries !== searchQueries) {
      setSearchParams({
        attr: searchQueries,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  updateSearchQueries = (newAttr, method) => {
    const { searchQueries } = this.state;
    let arr = [...searchQueries];
    if (method === 'add') {
      arr.push(newAttr);
    } else if (method === 'remove') {
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
    } else { // reset
      arr = [];
      this.setState((prevState) => ({
        ...prevState,
        keyExtraVal: Date.now(),
      }));
    }
    this.setState((prevState) => ({
      ...prevState,
      searchQueries: [...arr],
    }));
  };

  handleClickOutside = (e) => {
    const { setFilterSlidebar } = this.props;
    // eslint-disable-next-line react/no-find-dom-node
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      return setFilterSlidebar(false);
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
    const { showFilterSidebar, setFilterSlidebar } = this.props;
    const { keyExtraVal, searchQueries, screenDimmer } = this.state;
    if (!showFilterSidebar) {
      return null;
    }
    const items = this.filterAttributes();
    return (
      <>
        <MainContainer>
          {items.map((item) => (
            <FilterItem
              item={item}
              key={item.name + keyExtraVal}
              searchQueries={searchQueries}
              updateSearchQueries={this.updateSearchQueries}
            />
          ))}
          <SidebarButtons
            setFilterSlidebar={setFilterSlidebar}
            updateSearchQueries={this.updateSearchQueries}
          />
        </MainContainer>
        <ScreenDimmer
          screenDimmer={screenDimmer}
          setScreenDimmer={this.setScreenDimmer}
        />
      </>
    );
  }
}
FilterSidebar.propTypes = {
  allAttributes: PropTypes.arrayOf(PropTypes.any).isRequired,
  showFilterSidebar: PropTypes.bool.isRequired,
  setFilterSlidebar: PropTypes.func.isRequired,
  searchParams: PropTypes.objectOf(PropTypes.string).isRequired,
  setSearchParams: PropTypes.func.isRequired,
};
export default withRouter(FilterSidebar);
