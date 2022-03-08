import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import currencyReducer from './currencyReducer';
import cartReducer from './cartReducer';
import miniCartReducer from './miniCartReducer';

const allReducers = combineReducers({
  selectedCategory: categoryReducer,
  selectedCurrency: currencyReducer,
  cartItems: cartReducer,
  miniCart: miniCartReducer,
});

export default allReducers;
