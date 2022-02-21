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
