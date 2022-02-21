import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setActiveCurrency } from '../../store/actions';

const SelectCurrency = styled.select`
  color: #43464E;
  border: none;
  font-size: 1.34rem;
  background: transparent;
  outline: 0px;
  margin-right: 18px;
  width: 44px;
  cursor: pointer;
`;
const GET_CURRENCIES = gql`
query {
  currencies{
    label,
    symbol
  }
}
`;
const getCurrencies = (data) => {
  const currencies = [];
  if (data) {
    data.map((currency) => {
      return (currencies.push(
        <option value={currency.label} key={currency.label}>
          {currency.symbol}
        </option>,
      ));
    });
  }
  return currencies;
};
class CurrencySelector extends PureComponent {
  handleCurrencyChange = (e) => {
    this.props.setActiveCurrency(e.target.value);
  };

  render() {
    const { selectedCurrency } = this.props;
    return (
      <Query query={GET_CURRENCIES}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <SelectCurrency
              defaultValue={selectedCurrency}
              onChange={(e) => this.handleCurrencyChange(e)}
            >
              {getCurrencies(data.currencies, selectedCurrency)}
            </SelectCurrency>
          );
        }}
      </Query>
    );
  }
}
CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string.isRequired,
  setActiveCurrency: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
const mapDispatchToProps = () => ({
  setActiveCurrency,
});
export default connect(mapStateToProps, mapDispatchToProps())(CurrencySelector);
