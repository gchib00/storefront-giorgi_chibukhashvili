import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import currencyReducer from './currencyReducer';
import cartReducer from './cartReducer';
import dimmerReducer from './dimmerReducer';

const allReducers = combineReducers({
  selectedCategory: categoryReducer,
  selectedCurrency: currencyReducer,
  cartItems: cartReducer,
  screenDimmer: dimmerReducer,
});

export default allReducers;
