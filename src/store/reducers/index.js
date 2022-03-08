import { combineReducers } from 'redux';
import currencyReducer from './currencyReducer';
import cartReducer from './cartReducer';
import miniCartReducer from './miniCartReducer';

const allReducers = combineReducers({
  selectedCurrency: currencyReducer,
  cartItems: cartReducer,
  miniCart: miniCartReducer,
});

export default allReducers;
