import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyOptions from './CurrencyOptions';
import ChevronDown from '../../static/chevronDown.svg';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
const CurrencySelectorDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;
const SelectedCurrency = styled.div`
  color: #43464E;
  border: none;
  font-size: 1.34rem;
  background: transparent;
  outline: none;
  margin-right: 18px;
  width: 4px;
  z-index: 5;
`;
const Chevron = styled.img`
  transform: scaleY(1);
`;
class CurrencySelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      chevronDirection: 1,
    };
  }

  flipChevron = () => {
    this.setState((prevState) => ({
      ...prevState,
      chevronDirection: prevState.chevronDirection * (-1),
    }));
  };

  switchDropdown = (value) => {
    this.flipChevron();
    if (value === false) {
      return this.setState((prevState) => ({
        ...prevState,
        dropdown: false,
      }));
    }
    return this.setState((prevState) => ({
      ...prevState,
      dropdown: !prevState.dropdown,
    }));
  };

  render() {
    const { selectedCurrency } = this.props;
    const { chevronDirection, dropdown } = this.state;
    return (
      <MainContainer>
        <CurrencySelectorDiv
          id="currencySelector"
          onClick={(e) => this.switchDropdown(e)}
        >
          <SelectedCurrency>
            {selectedCurrency.symbol}
          </SelectedCurrency>
          <Chevron
            src={ChevronDown}
            alt="chevron"
            style={{ transform: `scaleY(${chevronDirection})` }}
          />
        </CurrencySelectorDiv>
        {!dropdown ? null : <CurrencyOptions switchDropdown={this.switchDropdown} />}
      </MainContainer>
    );
  }
}
CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.objectOf(PropTypes.string).isRequired,
};
const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(CurrencySelector);
