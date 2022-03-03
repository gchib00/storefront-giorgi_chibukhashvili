/* eslint-disable no-param-reassign */

const itemExistsInCart = (newItem, state) => {
  // find if such an item exists (via uniqueItemID):
  if (state.find((cartItem) => (cartItem.uniqueItemID === newItem.uniqueItemID))) {
    return true;
  }
  return false;
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
        // increase quantity by 1:
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
      // newState.productPrice = newState.productPrice.toFixed(2);
      return newState;
    }
    case ('USE_SAVED_CART'): {
      return action.payload;
    }
    case ('UPDATE_ITEM_QUANTITY'): {
      const { uniqueItemID, newQuantity } = action.payload;
      let newState = [...state];
      newState = newState.map((cartItem) => {
        if (cartItem.uniqueItemID === uniqueItemID) {
          cartItem.quantity = newQuantity;
        }
        if (cartItem.quantity < 1) {
          return null;
        }
        return cartItem;
      });
      newState = newState.filter((cartItem) => cartItem !== null);
      return newState;
    }
    case ('UPDATE_ITEM_PRICE'): {
      const { uniqueItemID, newPrice } = action.payload;
      let newState = [...state];
      newState = newState.map((cartItem) => {
        if (cartItem.uniqueItemID === uniqueItemID) {
          cartItem.productPrice = newPrice;
        }
        return cartItem;
      });
      return newState;
    }
    case ('UPDATE_ITEM_OPTION'): {
      const { uniqueItemID, attribute } = action.payload;
      let newState = [...state];
      // find cartItem that needs to be updated:
      const updatedItem = newState.find((cartItem) => cartItem.uniqueItemID === uniqueItemID);
      // update cartItem's attributes:
      updatedItem.selectedAttributes = updatedItem.selectedAttributes.map((attr) => {
        if (attr.name === attribute.name) {
          attr = attribute;
        }
        return attr;
      });
      // pass it back to the array - replace the old cartItem with the new one:
      newState = newState.map((cartItem) => {
        if (cartItem.uniqueItemID === updatedItem.uniqueItemID) {
          return updatedItem;
        }
        return cartItem;
      });
      return newState;
    }
    default: return state;
  }
};

export default cartReducer;
