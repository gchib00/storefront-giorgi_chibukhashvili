import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import currencyReducer from './currencyReducer';
import cartReducer from './cartReducer';
import dimmerReducer from './dimmerReducer';
import miniCartReducer from './miniCartReducer';
import cartTotalReducer from './cartTotalReducer';

const allReducers = combineReducers({
  selectedCategory: categoryReducer,
  selectedCurrency: currencyReducer,
  cartItems: cartReducer,
  cartTotal: cartTotalReducer,
  screenDimmer: dimmerReducer,
  miniCart: miniCartReducer,
});

export default allReducers;
