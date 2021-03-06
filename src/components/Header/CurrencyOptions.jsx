/* eslint-disable react/no-find-dom-node */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setActiveCurrency } from '../../store/actions';

const Options = styled.div`
  position: fixed;
  width: 86px;
  margin-top: 2.2rem;
  text-align: center;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.34);
  background: white;
  z-index: 5;
`;
const Option = styled.div`
  cursor: pointer;
  padding: 5px;
  &:hover {
    color: white;
    background: #5ECE7B;
  }
`;
const GET_CURRENCIES = gql`
query {
  currencies{
    label,
    symbol
  }
}
`;
class CurrencyOptions extends PureComponent {
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  // Clicks outside the div should automatically close CurrencyOptions:
  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this);
    const targetPathArr = e.composedPath();
    const { switchDropdown } = this.props;
    // currencySelector div(along with its children) should be an exception:
    if (e.target.id === 'currencySelector' || targetPathArr[1].id === 'currencySelector') {
      return null;
    }
    if (!domNode || !domNode.contains(e.target)) {
      return switchDropdown(false);
    }
    return null;
  };

  handleCurrencyChange = (currencyObj) => {
    const { switchDropdown } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setActiveCurrency(currencyObj);
    switchDropdown(false);
  };

  render() {
    return (
      <Query query={GET_CURRENCIES}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <Options>
              {data.currencies.map((currency) => (
                <Option
                  key={currency.label}
                  onClick={() => this.handleCurrencyChange(currency)}
                >
                  {`${currency.symbol} ${currency.label}`}
                </Option>
              ))}
            </Options>
          );
        }}
      </Query>
    );
  }
}
CurrencyOptions.propTypes = {
  setActiveCurrency: PropTypes.func.isRequired,
  switchDropdown: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  setActiveCurrency,
});
export default connect(null, mapDispatchToProps())(CurrencyOptions);
