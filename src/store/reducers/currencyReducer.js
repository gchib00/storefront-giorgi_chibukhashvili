/* eslint-disable default-param-last */
const initialState = {
  symbol: '$',
  label: 'USD',
};
const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ('CHANGE_CURRENCY'): {
      return action.payload;
    }
    default: return state;
  }
};

export default currencyReducer;
