export const changeCategory = (category) => {
  return {
    type: 'CHANGE_CATEGORY',
    payload: category,
  };
};
export const setActiveCurrency = (currency) => {
  return {
    type: 'CHANGE_CURRENCY',
    payload: currency,
  };
};
export const addItemToCart = (item) => {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};
export const setScreenDimmer = (status) => {
  return {
    type: 'SWITCH_DIMMER',
    payload: status,
  };
};
export const setMiniCart = (status) => {
  return {
    type: 'SWITCH_MINICART',
    payload: status,
  };
};
export const initializeCart = (savedCartItems) => {
  return {
    type: 'USE_SAVED_CART',
    payload: savedCartItems,
  };
};
export const updateCartItem = (uniqueItemID, newQuantity) => {
  return {
    type: 'UPDATE_ITEM',
    payload: {
      uniqueItemID,
      newQuantity,
    },
  };
};
