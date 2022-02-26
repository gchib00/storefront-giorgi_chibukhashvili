const cartTotalReducer = (state = 0, action) => {
  switch (action.type) {
    case ('CHANGE_TOTAL'): {
      const { amount, quantity } = action.payload;
      const oldTotal = state;
      console.log('oldTotal =', oldTotal);
      const newTotal = oldTotal + (amount * quantity);
      return newTotal;
    }
    default: return state;
  }
};
export default cartTotalReducer;
