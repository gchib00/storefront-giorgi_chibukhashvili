export const setActiveCurrency = (currency) => ({
  type: 'CHANGE_CURRENCY',
  payload: currency,
});
export const addItemToCart = (item) => ({
  type: 'ADD_ITEM',
  payload: item,
});
export const initializeCart = (savedCartItems) => ({
  type: 'USE_SAVED_CART',
  payload: savedCartItems,
});
export const updateCartItemQuantity = (uniqueItemID, newQuantity) => ({
  type: 'UPDATE_ITEM_QUANTITY',
  payload: {
    uniqueItemID,
    newQuantity,
  },
});
export const updateCartItemPrice = (uniqueItemID, newPrice) => ({
  type: 'UPDATE_ITEM_PRICE',
  payload: {
    uniqueItemID,
    newPrice,
  },
});
export const updateCartItemOption = (uniqueItemID, attribute) => ({
  type: 'UPDATE_ITEM_OPTION',
  payload: {
    uniqueItemID,
    attribute,
  },
});
export const setMiniCart = (status) => ({
  type: 'SWITCH_MINICART',
  payload: status,
});
