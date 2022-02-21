import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';

const allReducers = combineReducers({
  selectedCategory: categoryReducer,
});

export default allReducers;
