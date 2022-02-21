const currencyReducer = (state = 'GBP', action) => {
  switch (action.type) {
    case ('CHANGE_CURRENCY'): {
      return action.payload;
    }
    default: return state;
  }
};

export default currencyReducer;
