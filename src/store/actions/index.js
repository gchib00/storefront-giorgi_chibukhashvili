/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line arrow-body-style
export const changeCategory = (category) => {
  return {
    type: 'CHANGE_CATEGORY',
    payload: category,
  };
};
