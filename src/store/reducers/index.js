import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import currencyReducer from './currencyReducer';

const allReducers = combineReducers({
  selectedCategory: categoryReducer,
  selectedCurrency: currencyReducer,
});

export default allReducers;
