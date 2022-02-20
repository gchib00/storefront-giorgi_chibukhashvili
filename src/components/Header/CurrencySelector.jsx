import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';

const SelectCurrency = styled.select`
    color: #43464E;
    border: none;
    font-size: 1.4rem;
    background: transparent;
    outline: 0px;
     margin-right: 18px;
    max-width: 40px;
`;
const GET_CURRENCIES = gql`
query {
  currencies{
    label
  }
}
`;
const getCurrencies = (data) => {
  const currencies = [];
  if (data) {
    data.map((currency) => {
      let currencySymbol = '';
      switch (currency.label) { // Add symbols to currencies before they are passed as options:
        case ('USD'): { currencySymbol = '$'; break; }
        case ('GBP'): { currencySymbol = '£'; break; }
        case ('JPY'): { currencySymbol = '¥'; break; }
        case ('RUB'): { currencySymbol = '₽'; break; }
        // in case of any other currencies, retain the original
        // value instead of assigning it a symbol:
        default: { currencySymbol = currency.label; }
      }
      return (currencies.push(
        <option value={currency} key={currency.label}>{currencySymbol}</option>,
      ));
    });
  }
  return currencies;
};
export default class CurrencySelector extends PureComponent {
  render() {
    return (
      <Query query={GET_CURRENCIES}>
        {({ loading, data }) => {
          if (loading) { return null; }
          return <SelectCurrency>{getCurrencies(data.currencies)}</SelectCurrency>;
        }}
      </Query>
    );
  }
}
