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
      const valueObj = JSON.stringify({
        symbol: currency.symbol,
        label: currency.label,
      });
      return (currencies.push(
        <option value={valueObj} key={currency.label}>
          {currency.symbol}
        </option>,
      ));
    });
  }
  return currencies;
};
class CurrencySelector extends PureComponent {
  handleCurrencyChange = (e) => {
    const currency = JSON.parse(e.target.value);
    this.props.setActiveCurrency(currency);
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
              {getCurrencies(data.currencies)}
            </SelectCurrency>
          );
        }}
      </Query>
    );
  }
}
CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.object.isRequired,
  setActiveCurrency: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
const mapDispatchToProps = () => ({
  setActiveCurrency,
});
export default connect(mapStateToProps, mapDispatchToProps())(CurrencySelector);
