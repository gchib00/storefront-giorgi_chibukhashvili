/* eslint-disable no-param-reassign */

const itemExistsInCart = (newItem, state) => {
  // find if such an item exists (via uniqueItemID):
  if (state.find((cartItem) => (cartItem.uniqueItemID === newItem.uniqueItemID))) {
    return true;
  }
  return false; // item doesn't exist in cart
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ('CLEAR_CART'): {
      return [];
    }
    case ('ADD_ITEM'): {
      const newItem = action.payload;
      let newState = [...state];
      if (itemExistsInCart(newItem, state)) {
        // increase quanitity by 1:
        newState = newState.map((cartItem) => {
          if (cartItem.productID === newItem.productID) {
            cartItem.quantity += 1;
          }
          return cartItem;
        });
      } else {
        newItem.quantity = 1;
        newState = [...state, newItem];
      }
      return newState;
    }
    case ('USE_SAVED_CART'): {
      return action.payload;
    }
    default: return state;
  }
};

export default cartReducer;
