const miniCartReducer = (state = false, action) => {
  switch (action.type) {
    case ('SWITCH_MINICART'): {
      return action.payload;
    }
    default: return state;
  }
};

export default miniCartReducer;
