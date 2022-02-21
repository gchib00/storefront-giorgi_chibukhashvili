const categoryReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case ('CHANGE_CATEGORY'): {
      return action.payload;
    }
    default: return state;
  }
};

export default categoryReducer;
