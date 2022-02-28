const dimmerReducer = (state = false, action) => {
  switch (action.type) {
    case ('SWITCH_DIMMER'): {
      return action.payload;
    }
    default: return state;
  }
};

export default dimmerReducer;
