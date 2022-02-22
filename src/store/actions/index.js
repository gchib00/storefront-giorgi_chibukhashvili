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
