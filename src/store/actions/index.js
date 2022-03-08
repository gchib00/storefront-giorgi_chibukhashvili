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
export const initializeCart = (savedCartItems) => {
  return {
    type: 'USE_SAVED_CART',
    payload: savedCartItems,
  };
};
export const updateCartItemQuantity = (uniqueItemID, newQuantity) => {
  return {
    type: 'UPDATE_ITEM_QUANTITY',
    payload: {
      uniqueItemID,
      newQuantity,
    },
  };
};
export const updateCartItemPrice = (uniqueItemID, newPrice) => {
  return {
    type: 'UPDATE_ITEM_PRICE',
    payload: {
      uniqueItemID,
      newPrice,
    },
  };
};
export const updateCartItemOption = (uniqueItemID, attribute) => {
  return {
    type: 'UPDATE_ITEM_OPTION',
    payload: {
      uniqueItemID,
      attribute,
    },
  };
};
export const setMiniCart = (status) => {
  return {
    type: 'SWITCH_MINICART',
    payload: status,
  };
};
