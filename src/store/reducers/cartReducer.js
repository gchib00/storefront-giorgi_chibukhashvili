/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */

// algorithm that checks if the item already exists in cart:
const itemExistsInCart = (newItem, state) => {
  // find if such an item exists (by product ID):
  const matchedItem = state.find((cartItem) => {
    if (cartItem.productID === newItem.productID) {
      return cartItem;
    }
    return null;
  });
  if (matchedItem) {
    // check if attributes of both items are the same:
    const arr1 = Object.entries(newItem.selectedAttributes);
    const arr2 = Object.entries(matchedItem.selectedAttributes);
    let matches = 0;
    for (let i = 0; i < arr1.length; i++) {
      for (let ii = 0; ii < arr2.length; ii++) {
        if (arr1[i] === arr2[ii]) {
          matches++;
        }
      }
    }
    if (matches !== arr1.length) {
      // if matches and arr length aren't equal,
      // it means that an item with same exact attributes doesn't already exist in the cart
      return false;
    }
    return true; // such an item already exists in cart
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
        const oldItem = newState.find((cartItem) => cartItem.productID === newItem.productID);
        oldItem.quantity += 1;
        newState = [...state, oldItem];
      } else {
        newState = [...state, newItem];
      }
      return newState;
    }
    default: return state;
  }
};

export default cartReducer;
